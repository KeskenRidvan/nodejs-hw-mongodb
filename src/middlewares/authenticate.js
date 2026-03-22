const createHttpError = require('http-errors');

const { findSessionByAccessToken, findUserById } = require('../services/auth');

const authenticate = async (req, _res, next) => {
  try {
    const authorizationHeader = req.get('Authorization');

    if (!authorizationHeader) {
      throw createHttpError(401, 'Please provide a valid access token');
    }

    const [bearer, accessToken] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
      throw createHttpError(401, 'Please provide a valid access token');
    }

    const session = await findSessionByAccessToken(accessToken);

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await findUserById(session.userId);

    if (!user) {
      throw createHttpError(401, 'Session not found');
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authenticate,
};
