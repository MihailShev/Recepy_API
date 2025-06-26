import Joi from 'joi';

export const validationRegisterUsers = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});
