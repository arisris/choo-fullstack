const createError = require("http-errors");

const error404 = (req, res, next) => next(createError.NotFound(`Canot ${req.method} ${req.originalUrl} Page Not Found`));
const error50x = (err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    if (err.expose) {
      return res.status(err.statusCode).json({
        type: "error" + err.statusCode,
        message: err.message
      });
    } else {
      return next(err);
    }
  }
  return next();
};

module.exports = [error404, error50x];
