import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });

      next();
    } catch (err) {
      const errors = err.details.map((detail) => detail.message);

      next(createHttpError.BadRequest(errors));
    }
  };
}
