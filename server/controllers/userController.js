const { Webhook } = require("svix");
const User = require("../models/userModel");
const Transaction = require("../models/tansactionModel");
const Razorpay = require("razorpay");
// API controller function to manage Clerk user with database
const clerkWebhooks = async (req, res) => {
  try {
    // Create a svix instance with Clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body; // Correct way to get body (already parsed in Express)
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify the webhook
    whook.verify(JSON.stringify(payload), headers);

    const { data, type } = payload;

    console.log("Webhook received:", { type, userId: data?.id });

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await User.create(userData);
        console.log("User created:", userData);
        return res.json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        console.log("User updated:", userData);
        return res.json({ success: true });
      }

      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log("User deleted:", data.id);
        return res.json({ success: true });
      }

      default:
        console.log("Unhandled webhook type:", type);
        return res.json({ success: true });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api controller function to get user available credits
const userCredits = async (req, res) => {
  try {
    const { clerkId } = req;
    // console.log("my controller clerkid", clerkId);
    const userData = await User.findOne({ clerkId });
    res.json({
      success: true,
      credits: userData.creditBalance,
      currentPlan: userData.currentPlan,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.json({ success: false, message: error.message });
  }
};

//gateway initialize
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// api to make payments for credits
const paymentRazorpay = async (req, res) => {
  try {
    // console.log("my req is ",req);
    // console.log("my req body is ",req.body);
    const clerkId = req.clerkId;
    const { planId } = req.body;

    const userData = await User.findOne({ clerkId });

    if (!userData || !planId) {
      return res.json({ success: false, message: "invalid credentials" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Starter":
        plan = "Starter";
        credits = 10;
        amount = 10;
        break;

      case "Professional":
        plan = "Professional";
        credits = 15;
        amount = 20;
        break;

      case "Enterprise":
        plan = "Enterprise";
        credits = 45;
        amount = 25;
        break;

      default:
        break;
    }
    date = Date.now();

    //creating transaction
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await Transaction.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        return res.json({ success: false, message: error.message });
      }
      return res.json({ success: true, order });
    });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const transactionData = await Transaction.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment failed" });
      }

      // adding credts in user data
      const userData = await User.findOne({ clerkId: transactionData.clerkId });
      const creditBalance = userData.creditBalance + transactionData.credits;
      await User.findByIdAndUpdate(userData._id, {
        creditBalance,
        currentPlan: transactionData.plan,
      });

      // making the payment true
      await Transaction.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      res.json({ success: true, message: "credits added" });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = {
  clerkWebhooks,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
