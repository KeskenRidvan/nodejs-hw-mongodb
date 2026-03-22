const {
  registerUser,
  loginUser,
  refreshUsersSession,
  logoutUser,
  sendResetEmail,
  resetPassword,
} = require('../services/auth');

const isProduction = process.env.NODE_ENV === 'production';

const getCookieOptions = (expires) => ({
  httpOnly: true,
  path: '/',
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  expires,
});

const getClearCookieOptions = () => ({
  httpOnly: true,
  path: '/',
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
});

const setSessionCookies = (res, session) => {
  const cookieOptions = getCookieOptions(session.refreshTokenValidUntil);

  res.cookie('sessionId', session._id.toString(), cookieOptions);
  res.cookie('refreshToken', session.refreshToken, cookieOptions);
};

const clearSessionCookies = (res) => {
  const cookieOptions = getClearCookieOptions();

  res.clearCookie('sessionId', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};

const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const refreshSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setSessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  clearSessionCookies(res);

  res.status(204).send();
};

const sendResetEmailController = async (req, res) => {
  await sendResetEmail(req.body);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

module.exports = {
  registerUserController,
  loginUserController,
  refreshSessionController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController,
};
