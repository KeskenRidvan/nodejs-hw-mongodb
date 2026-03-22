const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { randomBytes } = require('node:crypto');
const { isValidObjectId } = require('mongoose');
const { sendEmail } = require('../utils/sendEmail');
const {
  createResetPasswordToken,
  verifyResetPasswordToken,
} = require('../utils/resetPasswordToken');

const Session = require('../db/models/session');
const User = require('../db/models/user');

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const SALT_ROUNDS = 10;

const generateToken = () => randomBytes(30).toString('base64url');

const sanitizeUser = (user) => {
  const userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

const createSession = async (userId) => {
  await Session.deleteMany({ userId });

  const session = await Session.create({
    userId,
    accessToken: generateToken(),
    refreshToken: generateToken(),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });

  return session;
};

const registerUser = async (payload) => {
  const email = payload.email.toLowerCase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

  try {
    const user = await User.create({
      ...payload,
      email,
      password: hashedPassword,
    });

    return sanitizeUser(user);
  } catch (error) {
    if (error.code === 11000) {
      throw createHttpError(409, 'Email in use');
    }

    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createHttpError(401, 'Email or password is wrong');
  }

  return createSession(user._id);
};

const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  if (!sessionId || !refreshToken || !isValidObjectId(sessionId)) {
    throw createHttpError(401, 'Session not found');
  }

  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    await Session.deleteOne({ _id: session._id });
    throw createHttpError(401, 'Refresh token expired');
  }

  await Session.deleteOne({ _id: session._id });

  return createSession(session.userId);
};

const logoutUser = async ({ sessionId, refreshToken }) => {
  if (!sessionId || !refreshToken || !isValidObjectId(sessionId)) {
    return;
  }

  await Session.findOneAndDelete({
    _id: sessionId,
    refreshToken,
  });
};

const sendResetEmail = async ({ email }) => {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const resetToken = createResetPasswordToken(normalizedEmail);
  const resetPasswordUrl = new URL(
    'reset-password',
    process.env.APP_DOMAIN.endsWith('/')
      ? process.env.APP_DOMAIN
      : `${process.env.APP_DOMAIN}/`
  );

  resetPasswordUrl.searchParams.set('token', resetToken);

  try {
    await sendEmail({
      to: normalizedEmail,
      subject: 'Reset your password',
      text: `Use this link to reset your password: ${resetPasswordUrl.toString()}`,
      html: `<p>Use this <a href="${resetPasswordUrl.toString()}">link</a> to reset your password.</p>`,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.'
    );
  }
};

const resetPassword = async ({ token, password }) => {
  let payload;

  try {
    payload = verifyResetPasswordToken(token);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  user.password = await bcrypt.hash(password, SALT_ROUNDS);
  await user.save();
  await Session.deleteMany({ userId: user._id });
};

const findSessionByAccessToken = (accessToken) =>
  Session.findOne({ accessToken });

const findUserById = (userId) => User.findById(userId);

module.exports = {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
  sendResetEmail,
  resetPassword,
  findSessionByAccessToken,
  findUserById,
};
