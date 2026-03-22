const createHttpError = require('http-errors');
const { isValidObjectId } = require('mongoose');

const isValidId = (req, _res, next) => {
  if (!isValidObjectId(req.params.contactId)) {
    return next(createHttpError(400, 'Invalid contact id'));
  }

  next();
};

module.exports = {
  isValidId,
};
