const asyncHandler = require("express-async-handler");
const Cart = require("../models/cart.model");
const ApiError = require("../utils/apiError");

exports.getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate(
    "cartItems.product",
    "title imageCover"
  );

  if (!cart) return next(new ApiError("Cart not found", 404));

  res.status(200).json({ data: cart });
});

exports.addToCart = asyncHandler(async (req, res, next) => {
  const { productId, color, size, quantity, price } = req.body;
  const user = req.user;

  let cart = await Cart.findOne({ user: user._id });

  if (!cart)
    cart = await Cart.create({
      user: user._id,
      cartItems: [{ product: productId, quantity, price, color, size }],
    });
  else {
    const productIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (productIndex > -1)
      cart.cartItems[productIndex].quantity += quantity;
    else
      cart.cartItems.push({ product: productId, quantity, price, color, size });
  }

  await cart.save();
  res.status(200).json({ data: cart });
});

exports.updateQuantity = asyncHandler(async (req, res, next) => {
  const { itemId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return next(new ApiError("Cart not found", 404));

  if (quantity === 0)
    cart.cartItems = cart.cartItems.filter(
      (item) => item._id.toString() !== itemId
    );
  else {
    const item = cart.cartItems.find((item) => item._id.toString() === itemId);
    if (!item) return next(new ApiError("Item not found", 404));
    item.quantity = quantity;
  }

  await cart.save();
  res.status(200).json({ data: cart });
});

exports.deleteItemFromCart = asyncHandler(async (req, res, next) => {
  const { itemId } = req.params;
  let cart = await Cart.findOne({ user: req.user._id });

  cart.cartItems = cart.cartItems.filter(
    (item) => item._id.toString() !== itemId
  );

  await cart.save();
  res.status(200).json({ data: cart });
});

exports.clearCart = asyncHandler(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(204).json({});
});
