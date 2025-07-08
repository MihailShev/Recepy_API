import createHttpError from 'http-errors';

export function parseIngredients(req, res, next) {
  try {
    if (typeof req.body.ingredients === 'string') {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }

    if (typeof req.body.time === 'string') {
      req.body.time = Number(req.body.time);
    }
    if (typeof req.body.cals === 'string') {
      req.body.cals = Number(req.body.cals);
    }

    next();
  } catch {
    throw new createHttpError.BadRequest('Bad request');
  }
}
