const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const ApiError = require("../utils/apiError");

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const {
    search,
    sortBy,
    pageNumber = 1,
    pageSize = 8,
    categories,
    colors,
    sizes,
    dressStyles,
    minPrice,
    maxPrice,
  } = req.query;

  const filter = {};

  // Search
  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Categories
  if (categories) {
    filter.category = {
      $in: categories.split(","),
    };
  }

  // Colors
  if (colors) {
    filter.colors = {
      $in: colors.split(","),
    };
  }

  // Sizes
  if (sizes) {
    filter.sizes = {
      $in: sizes.split(","),
    };
  }

  // Dress styles
  if (dressStyles) {
    filter.style = {
      $in: dressStyles.split(","),
    };
  }

  // Pagination
  const page = Math.max(1, Number(pageNumber));
  const limit = Math.max(1, Number(pageSize));
  const skip = (page - 1) * limit;

  // Sorting
  let sort = {};

  switch (sortBy) {
    case "price-desc":
      sort = { discountedPrice: -1 };
      break;

    case "price-asc":
      sort = { discountedPrice: 1 };
      break;

    case "rating-desc":
      sort = { ratingsAverage: -1 };
      break;

    case "rating-asc":
      sort = { ratingsAverage: 1 };
      break;

    case "newest":
      sort = { createdAt: -1 };
      break;

    case "selling-desc":
      sort = { sold: -1 };
      break;

    default:
      sort = { createdAt: -1 };
  }

  // Aggregation pipeline
  const pipeline = [
    // Calculate price after discount
    {
      $set: {
        discountedPrice: {
          $multiply: [
            "$price",
            {
              $subtract: [
                1,
                {
                  $divide: [{ $ifNull: ["$discount", 0] }, 100],
                },
              ],
            },
          ],
        },
      },
    },

    // Apply filters
    {
      $match: {
        ...filter,

        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              discountedPrice: {
                ...(minPrice !== undefined ? { $gte: Number(minPrice) } : {}),
                ...(maxPrice !== undefined ? { $lte: Number(maxPrice) } : {}),
              },
            }
          : {}),
      },
    },

    // Sort
    {
      $sort: sort,
    },

    // Pagination
    {
      $skip: skip,
    },

    {
      $limit: limit,
    },
  ];

  // Get current page
  const products = await Product.aggregate(pipeline);

  // Count BEFORE pagination
  const countPipeline = [
    {
      $set: {
        discountedPrice: {
          $multiply: [
            "$price",
            {
              $subtract: [
                1,
                {
                  $divide: [{ $ifNull: ["$discount", 0] }, 100],
                },
              ],
            },
          ],
        },
      },
    },

    {
      $match: {
        ...filter,

        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              discountedPrice: {
                ...(minPrice !== undefined ? { $gte: Number(minPrice) } : {}),
                ...(maxPrice !== undefined ? { $lte: Number(maxPrice) } : {}),
              },
            }
          : {}),
      },
    },

    {
      $count: "total",
    },
  ];

  const countResult = await Product.aggregate(countPipeline);

  const totalProducts = countResult[0]?.total || 0;

  res.status(200).json({
    data: products,
    totalProducts,
  });
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
    { runValidators: true, new: true },
  );
  if (!updatedProduct) return next(new ApiError("Product not found", 404));
  res.status(202).json({ data: updatedProduct });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  if (!deletedProduct) return next(new ApiError("Product not found", 404));
  res.status(204).json({});
});
