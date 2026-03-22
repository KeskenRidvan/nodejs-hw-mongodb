const jwt = require('jsonwebtoken');

const createResetPasswordToken = (email) =>
  jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '5m',
  });

const verifyResetPasswordToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  createResetPasswordToken,
  verifyResetPasswordToken,
};
