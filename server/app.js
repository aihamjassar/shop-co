const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");
const morgan = require("morgan");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const couponRoute = require("./routes/coupon.route");
const paymentRoute = require("./routes/payment.route");
const reviewRoute = require("./routes/review.route");
const orderRoute = require("./routes/order.route");
const { webHookCheckout } = require("./controllers/payment.controller");

const app = express();

app.post(
  "/api/v1/payments/webhook",
  express.raw({ type: "application/json" }),
  webHookCheckout
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/coupons", couponRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/orders", orderRoute);

app.all("/{*splat}", (req, res, next) => {
  const ApiError = require("./utils/apiError");
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
