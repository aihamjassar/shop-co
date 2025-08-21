const asyncHandler = require("express-async-handler");
const Coupon = require("../models/coupon.model");
const ApiError = require("../utils/apiError");

exports.getCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({ user: req.user._id, isActive: true });
  res.status(200).json({ data: coupon || null });
});

exports.validateCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    user: req.user._id,
    code: req.body.code,
    isActive: true,
  });

  if (!coupon) return next(new ApiError("Coupon not found", 404));

  if (coupon.expirationDate.getTime() < Date.now()) {
    coupon.isActive = false;
    await coupon.save();
    return next(new ApiError("Coupon expired", 404));
  }

  res.status(200).json({ data: coupon });
});
