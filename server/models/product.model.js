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
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [20, "Too short description"],
      maxlength: [1000, "Too long description"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    sold: {
      type: Number,
      default: 0,
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
      type: [String], // #00C12B, #F50606, #F5DD06, #F57906, #06CAF5, #063AF5, #7D06F5, #F506A4, #FFFFFF, #000000
    },
    sizes: {
      type: [String], // Small, X-Small, XX-Small, Medium, Large, X-Large, XX-Large, 3X-Large, 4X-Large
    },
    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: {
      type: [String],
    },
    ratingsAverage: {
      type: Number,
      min: [0.5, "Rating must be above or equal 0.5"],
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
      type: String, // T-shirts, Shirts, Jeans, Jackets, Shoes, Dresses, Shorts, Hoodie
      required: [true, "Product must be belong to a category"],
    },
    // subcategory: {
    //   type: String, // T-shirt, jeans, jacket, shoe, ...
    // },
  },
  { timestamps: true },
);

productSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  if (this._update.title)
    this._update.slug = slugify(this._update.title, {
      lower: true,
      strict: true,
    });
  next();
});

module.exports = mongoose.model("Product", productSchema);
