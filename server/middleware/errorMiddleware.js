// @desc  Handle 404 — route not found
const notFound = (req, res, next) => {
  const error = new Error(`Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// @desc  Centralized error handler — catches all errors passed via next(error)
const errorHandler = (err, req, res, next) => {
  // Sometimes a 200 slips through with an error, default to 500
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
