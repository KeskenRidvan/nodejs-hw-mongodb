const errorHandler = (error, _req, res, _next) => {
  if (error.name === 'CastError' && error.path === '_id') {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found',
      data: error.message,
    });
  }

  const status = error.status || 500;
  const message = error.status ? error.message : 'Something went wrong';

  return res.status(status).json({
    status,
    message,
    data: error.message,
  });
};

module.exports = {
  errorHandler,
};
