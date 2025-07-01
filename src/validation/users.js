import Joi from "joi";

export const updateUsersInfoSchema = Joi.object({
  name: Joi.string().min(3).max(16),
  email: Joi.string().min(3).max(128),
});