import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../db/models/users.js';
import { randomBytes } from 'node:crypto';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';
import { Session } from '../db/models/session.js';

const createSession = () => {
  return {
    accessToken: randomBytes(30).toString('base64'),
    refreshToken: randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const registerUser = async (payload) => {
  const existUser = await User.findOne({ email: payload.email });
  if (existUser) throw createHttpError(409, 'Email in use');

  payload.password = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create(payload);
  let newSession;

  if (newUser) {
    newSession = createSession();
  }

  const session = await Session.create({
    userId: newUser._id,
    ...newSession,
  });

  return {
    name: newUser.name,
    email: newUser.email,
    accessToken: session.accessToken,
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user)
    throw createHttpError.Unauthorized('Email or passwort is incorrect');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw createHttpError.Unauthorized('Email or passwort is incorrect');

  await Session.deleteOne({ userId: user._id });
  const session = createSession();
  return Session.create({
    userId: user._id,
    ...session,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshToken !== refreshToken) {
    throw createHttpError.Unauthorized('Refreschtoken is invalid');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};
