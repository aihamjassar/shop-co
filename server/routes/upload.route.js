const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ApiError = require("../utils/apiError");

router.get("/", (req, res, next) => {
  try {
    const { folder = "", width, height, crop, gravity } = req.query;

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = crypto
      .createHash("sha1")
      .update(
        `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`
      )
      .digest("hex");

    res.status(200).json({
      timestamp,
      signature,
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    return next(new ApiError("Failed to create signature", 500));
  }
});

module.exports = router;
