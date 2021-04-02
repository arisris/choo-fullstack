const createError = require("http-errors");

const error404 = (req, res, next) =>
  next(
    createError.NotFound(
      `Uppss Can't ${req.method} ${req.originalUrl} Endpoint Not Found`
    )
  );
const error50x = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(err.statusCode || 500).json({
      type: err.statusCode || 500,
      message: err.message
    }).end();
    return;
  }
  return next();
};

module.exports = [error404, error50x];
