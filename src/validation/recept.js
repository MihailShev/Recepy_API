import Joi from 'joi';

export const validationCreateRecipe = Joi.object({
  name: Joi.string().max(64).required(),
  decr: Joi.string().max(200).required(),
  cookiesTime: Joi.number().min(1).max(360).required(),
  cals: Joi.number().min(1).max(10000),
  category: Joi.string().required(),
  ingredient: Joi.string().required(),
  ingredientAmount: Joi.number().min(2).max(16).required(),
  instruction: Joi.string().max(1200).required(),
  recipeImg: Joi.any().meta({ swaggerType: 'file' }).optional(),
});
