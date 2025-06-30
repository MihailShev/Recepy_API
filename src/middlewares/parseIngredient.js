import createHttpError from 'http-errors';

export function parseIngredients(req, res, next) {
  try {
    if (typeof req.body.ingredients === 'string') {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }
    next();
  } catch {
    throw new createHttpError.BadRequest('Bad requst');
  }
}
