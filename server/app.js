const path = require('path')
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");
const morgan = require("morgan");
const { v2: cloudinary } = require("cloudinary");


require("dotenv").config();

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const couponRoute = require("./routes/coupon.route");
const paymentRoute = require("./routes/payment.route");
const reviewRoute = require("./routes/review.route");
const orderRoute = require("./routes/order.route");
const uploadRoute = require("./routes/upload.route");
const deleteImageRoute = require("./routes/deleteImage.route");

const { webHookCheckout } = require("./controllers/payment.controller");
const { seedProducts } = require("./seed/seed");

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  webHookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/test", (req, res) => res.json({ message: "Test-api" }));

app.get("/api/v1/seed", async (req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({
      message: "The seed route is available only in development mode",
    });
  }

  try {
    const result = await seedProducts();
    res.status(200).json({
      message: "Products seeded successfully",
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/upload-signature", uploadRoute);
app.use("/api/v1/delete-image", deleteImageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

app.all("/{*splat}", (req, res, next) => {
  const ApiError = require("./utils/apiError");
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
