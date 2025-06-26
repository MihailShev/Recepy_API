import createError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Route not found'));
};
