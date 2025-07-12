const express = require("express");
const {
  clerkWebhooks,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
} = require("../controllers/userController");
const authUser = require("../middlewares/auth");
const router = express.Router();

router.post("/webhooks", clerkWebhooks);
router.get("/credits", authUser, userCredits);
router.post("/pay-razor", authUser, paymentRazorpay);
router.post("/verify-razor", authUser, verifyRazorpay);

module.exports = router;
