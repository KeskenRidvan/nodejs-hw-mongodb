const createHttpError = require('http-errors');

const validateBody = (schema) => async (req, _res, next) => {
  try {
    await schema.validate(req.body, req);
    next();
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

module.exports = {
  validateBody,
};
