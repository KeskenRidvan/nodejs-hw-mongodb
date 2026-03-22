const createHttpError = require('http-errors');

const User = require('../db/models/user');

const ensurePayloadObject = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw createHttpError(400, 'Body must be an object');
  }
};

const registerUserSchema = {
  async validate(payload) {
    ensurePayloadObject(payload);

    const user = new User(payload);
    await user.validate();
  },
};

const loginUserSchema = {
  async validate(payload) {
    ensurePayloadObject(payload);

    const user = new User({
      name: 'Temporary User',
      email: payload.email,
      password: payload.password,
    });

    await user.validate(['email', 'password']);
  },
};

module.exports = {
  registerUserSchema,
  loginUserSchema,
};
