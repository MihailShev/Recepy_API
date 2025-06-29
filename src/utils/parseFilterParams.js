import mongoose from 'mongoose';

const parseCategoryType = (type) => {
  const isString = typeof type === 'string';

  if (!isString) return;

  const isReciptType = (type) =>
    [
      'Dessert',
      'Beef',
      'Lamb',
      'Chicken',
      'Seafood',
      'Miscellaneous',
      'Dessert',
      'Breakfast',
      'Pork',
    ].includes(type);

  if (isReciptType(type)) return type;
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const parseFilterParams = (query) => {
  const { category, ingredient, title } = query;

  const parseCategory = parseCategoryType(category);
  const parseIngredientId = isValidObjectId(ingredient);
  const parsedTitle =
    typeof title === 'string' && title.trim() !== '' ? title.trim() : null;

  return {
    category: parseCategory,
    ingredient: parseIngredientId,
    title: parsedTitle,
  };
};
