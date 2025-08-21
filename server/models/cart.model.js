const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
            min: 1,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
          color: {
            type: String,
            required: true,
          },
          size: {
            type: String,
            required: true,
          },
        },
      ],
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function () {
  this.totalAmount = this.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
});

module.exports = mongoose.model("Cart", cartSchema);
