const { Webhook } = require("svix");
const User = require("../models/userModel");

//api controller function to manage clerk user with database
// https://bgremoversaasappserver.vercel.app/api/user/webhooks
const clerkWebhooks = async (req, res) => {
  try {
    // CReat a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Parse the body if it's a buffer
    const payload = Buffer.isBuffer(body) ? JSON.parse(body.toString()) : body;

    // getting data from request body
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
        console.log("User created:", userData); // Add logging
        res.json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await User.findByIdAndUpdate({ clerkId: data.id }, userData);
        console.log("User updated:", userData); // Add logging
        res.json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete({ clerkId: data.id });
        res.json({ success: true });
        break;
      }
      default:
        console.log("Unhandled webhook type:", type);
        res.json({ success: true });
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { clerkWebhooks };
