const asyncHandler = require("express-async-handler");
const Order = require("../models/order.model");

exports.getOrders = asyncHandler(async (req, res, next) => {
  const filter = req.user.role === "customer" ? { user: req.user._id } : {};
  const orders = await Order.find(filter);
  res.status(200).json({ data: orders });
});
