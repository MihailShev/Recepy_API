export function compareDate(date) {
  return new Date(date).getTime() < Date.now();
}

export const TIME_ACCESS_TOKEN = () => new Date(Date.now() + 15 * 60 * 1000);
export const TIME_REFRESH_TOKEN = () =>
  new Date(Date.now() + 30 * 60 * 60 * 1000);

export function setCoociesSession(res, session) {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
}
