const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: statusCode >= 500 ? 'Internal Server Error' : err.message || 'Request failed',
  };

  if (process.env.NODE_ENV !== 'production' && err.details) {
    response.details = err.details;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
