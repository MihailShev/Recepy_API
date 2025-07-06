import createHttpError from 'http-errors';
import mongoose from 'mongoose';

const parseCategoryType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isReciptType = (type) =>
    [
      'Seafood',
      'Lamb',
      'Starter',
      'Chicken',
      'Beef',
      'Dessert',
      'Vegan',
      'Pork',
      'Vegetarian',
      'Miscellaneous',
      'Pasta',
      'Breakfast',
      'Side',
      'Goat',
      'Soup',
    ].includes(type);

  if (isReciptType(type)) {
    return type;
  } else {
    throw new createHttpError.BadRequest(`Unknown category type: ${type}`);
  }
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const parseFilterParams = (query) => {
  const { category, ingredient, title } = query;

  const parseCategory = parseCategoryType(category);
  const parseIngredientId = isValidObjectId(ingredient) ? ingredient : null;
  const parsedTitle =
    typeof title === 'string' && title.trim() !== '' ? title.trim() : null;

  return {
    category: parseCategory,
    ingredient: parseIngredientId,
    title: parsedTitle,
  };
};
