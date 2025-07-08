import {
  loginUser,
  logoutUser,
  refreshUsersSession,
  registerUser,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  setupSession(res, user);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered and logged a user!',
    data: { name: user.name, email: user.email, accessToken: user.accessToken },
  });
};

export const loginUserController = async (req, res) => {
  const user = await loginUser(req.body.email, req.body.password);
  setupSession(res, user);
  console.log('🍪 Cookies:', req.cookies);
  const userInfo = user._doc;
  delete userInfo.password;
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { ...userInfo, accessToken: user.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
