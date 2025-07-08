import Joi from 'joi';

export const validationCreateRecipe = Joi.object({
  title: Joi.string().max(64).required(),
  category: Joi.string().required(),
  area: Joi.string().max(20),
  instructions: Joi.string().max(1200).required(),
  description: Joi.string().max(200).required(),
  time: Joi.number().min(1).max(360).required(),
  cals: Joi.number().min(1).max(10000),
  ingredients: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().hex().length(24).required(),
        measure: Joi.string().required(),
      }),
    )
    .min(2)
    .max(16)
    .required(),
});
