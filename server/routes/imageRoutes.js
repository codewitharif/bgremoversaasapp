const express = require("express");
const { removeBgImage } = require("../controllers/imageController");
const upload = require("../config/multer");
const authUser = require("../middlewares/auth");

const imageRouter = express.Router();

imageRouter.post("/remove-bg", upload.single("image"), authUser, removeBgImage);

module.exports = imageRouter;
