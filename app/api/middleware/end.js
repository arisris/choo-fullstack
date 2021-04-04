const createError = require("http-errors");
const ev = require("express-validator");

const error404 = (req, res, next) =>
  next(
    createError.NotFound(
      `Uppss Can't ${req.method} ${req.originalUrl} Endpoint Not Found`
    )
  );
const error50x = (err, req, res, next) => {
  if (err instanceof Error) {
    const isValidationError = err.mapped && err.array;
    const output = {statusCode: err.statusCode || 500, message: err.message || "Internal Server Error"};
    if (isValidationError) {
      output.message = "ValidationError";
      output.statusCode = 412;
      output.errors = err.mapped();
    }
    return res.status(output.statusCode).json(output);
  }
  return next();
};

module.exports = [error404, error50x];
