import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export function isValidID(req, res, next) {
  if (isValidObjectId(req.params.recipeID) !== true) {
    return next(createHttpError.BadRequest('ID shoult be an ObjectId'));
  }

  next();
}
