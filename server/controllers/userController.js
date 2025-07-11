const { Webhook } = require("svix");
const User = require("../models/userModel");

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

module.exports = { clerkWebhooks };
