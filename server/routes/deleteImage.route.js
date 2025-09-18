const express = require("express");
const router = express.Router();
const { v2: cloudinary } = require("cloudinary");
const ApiError = require("../utils/apiError");

router.delete("/", async (req, res, next) => {
  const { public_id, folder = "" } = req.body;
  if (public_id)
    return res.status(400).json({ message: "No public_id provided" });

  try {
    await cloudinary.uploader.destroy(`${folder}/${public_id}`);
    res.status(204).json({ message: "Image deleted successfully" });
  } catch (error) {
    return next(new ApiError("Failed to delete image", 500));
  }
});

module.exports = router;
