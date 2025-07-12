const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data"); // Fixed: Don't destructure FormData
const User = require("../models/userModel");

// Controller function to remove background from image
const removeBgImage = async (req, res) => {
  // Added req, res parameters
  try {
    const { clerkId } = req; // Assuming clerkId is in req.user
    // console.log("my request is ", req);
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.creditBalance <= 0) {
      // Changed to <= 0 for safety
      return res.status(402).json({
        // 402 Payment Required status code
        success: false,
        message: "Insufficient credit balance",
        creditBalance: user.creditBalance,
      });
    }

    if (!req.file) {
      // Check if file exists
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const formData = new FormData();
    formData.append("image_file", imageFile);

    // Proper axios configuration
    const response = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Important for FormData
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer", // Moved inside config object
      }
    );

    const base64image = Buffer.from(response.data, "binary").toString("base64");
    const resultImage = `data:${req.file.mimetype};base64,${base64image}`;

    // Update user credit balance
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $inc: { creditBalance: -1 } }, // Atomic operation
      { new: true } // Return updated document
    );

    // Delete the temporary file
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.json({
      success: true,
      resultImage,
      creditBalance: updatedUser.creditBalance,
      message: "Background removed successfully",
    });
  } catch (error) {
    console.error("Background removal error:", error);

    // Clean up file if error occurred
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error cleaning up file:", err);
      });
    }

    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

module.exports = { removeBgImage };
