const { validationResult } = require("express-validator");
const ApiError = require("../utils/apiError");

exports.validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return next(
      new ApiError(
        errors
          .array()
          .map((err) => err.msg)
          .join(", "),
        400
      )
    );
  next();
};
