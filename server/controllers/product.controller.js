const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const ApiError = require("../utils/apiError");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json({ data: products });
});

exports.getProduct = asyncHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) return next(new ApiError("Product not found", 404));
  res.status(200).json({ data: product });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { runValidators: true, new: true }
  );
  if (!updatedProduct) return next(new ApiError("Product not found", 404));
  res.status(202).json({ data: updatedProduct });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) return next(new ApiError("Product not found", 404));
  res.status(204).json({});
});
