const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      lowerCase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short description"],
      maxlength: [300, "Too long description"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount must be greater than or equal to 0"],
      max: [100, "Discount must be less than or equal to 100"],
    },
    colors: {
      type: [String],
    },
    sizes: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: [true, "Image cover is required"],
    },
    images: {
      type: [String],
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    style: {
      type: String,
      enum: ["Casual", "Formal", "Gym", "Party"],
    },
    category: {
      type: String, // Men, Women, Kids
    },
    subcategory: {
      type: String, // T-shirt, pants, Jackets, shoes, ...
    },
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (!this.isModified("slug")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("Product", productSchema);
