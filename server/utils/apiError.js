class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.name = this.constructor.name;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
