const createHttpError = require('http-errors');

const User = require('../db/models/user');

const ensurePayloadObject = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw createHttpError(400, 'Body must be an object');
  }
};

const createUserForAuthValidation = (payload = {}) =>
  new User({
    name: payload.name ?? 'Temporary User',
    email: payload.email ?? 'temp@example.com',
    password: payload.password,
  });

const ensureToken = (token) => {
  if (typeof token !== 'string' || token.trim() === '') {
    throw createHttpError(400, 'token is required');
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

    const user = createUserForAuthValidation(payload);

    await user.validate(['email', 'password']);
  },
};

const sendResetEmailSchema = {
  async validate(payload) {
    ensurePayloadObject(payload);

    const user = createUserForAuthValidation({
      email: payload.email,
      password: 'temporary-password',
    });

    await user.validate(['email']);
  },
};

const resetPasswordSchema = {
  async validate(payload) {
    ensurePayloadObject(payload);
    ensureToken(payload.token);

    const user = createUserForAuthValidation({
      password: payload.password,
    });

    await user.validate(['password']);
  },
};

module.exports = {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
};
