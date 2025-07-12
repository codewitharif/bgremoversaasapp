const jwt = require("jsonwebtoken");

// middleware function to decode jwt  token to get clerkId

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    // console.log("my token in backend is", token);
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const token_decode = jwt.decode(token);
    // console.log("token decoding ", token_decode);
    // req.body.clerkId = token_decode.clerkId;
    req.clerkId = token_decode.clerkId; // ✅ FIXED
    // console.log("req.clerk id is in auth.js ", req.clerkId)
    next();
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

module.exports = authUser;
