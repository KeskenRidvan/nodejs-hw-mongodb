const createHttpError = require('http-errors');

const notFoundHandler = (_req, _res, next) => {
  next(createHttpError(404, 'Route not found'));
};

module.exports = {
  notFoundHandler,
};
