import Joi from 'joi';

export const validationRegisterUsers = Joi.object({
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(8).max(128).required(),
});

export const validationLoginUsers = Joi.object({
  email: Joi.string().email().max(128).required(),
  password: Joi.string().min(8).max(128).required(),
});
