const express = require("express");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./middlewares/globalErrorHandler.middleware");
const morgan = require("morgan");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

app.all("/{*splat}", (req, res, next) => {
  const ApiError = require("./utils/apiError");
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
