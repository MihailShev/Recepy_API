import { Recipes } from '../db/models/recipes.js';
import '../db/models/ingredients.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { User } from '../db/models/users.js';
import createHttpError from 'http-errors';

// створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)

export const getAllRecipes = async ({
  page = 1,
  perPage = 12,
  filter = {},
}) => {
  const { category, ingredient, title } = filter;
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let recipesQuery = Recipes.find();

  if (category) {
    recipesQuery.where('category').equals(category);
  }

  if (ingredient) {
    recipesQuery.where('ingredients.id').equals(ingredient);
  }

  if (title) {
    recipesQuery.where('title').regex(new RegExp(title, 'i'));
  }

  const [recipesCount, recipes] = await Promise.all([
    Recipes.find().merge(recipesQuery).clone().countDocuments(),
    recipesQuery
      .skip(skip)
      .limit(limit)
      .populate('ingredients.ingredient', 'name')
      .exec(),
  ]);

  const paginationData = calculatePaginationData(recipesCount, perPage, page);

  return { data: recipes, ...paginationData };
};

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id

export const getRecipestById = async (receptId) => {
  const recipe = await Recipes.findOne({ _id: receptId });
  return recipe;
};

// створити приватний ендпоінт для створення власного рецепту

export const createRecept = async (payload) => {
  const recipe = await Recipes.create(payload);

  await User.findByIdAndUpdate(recipe.owner, {
    $push: { ownRecipes: recipe._id },
  });

  return recipe;
};

// створити приватний ендпоінт для отримання власних рецептів

export const getOwnRecipes = async (owner) => {
  const myRecept = await Recipes.find(owner);
  return myRecept;
};

// створити приватний ендпоінт для додавання рецепту до списку улюблених

export const getFavoriteRecept = async (userId, recipeId) => {
  const favoritRecept = await Recipes.findById(recipeId);

  const user = await User.findById(userId);

  const alreadyAdded = user.favorites.includes(recipeId);
  if (alreadyAdded) {
    throw createHttpError.Conflict('Recipe already in favorites');
  }

  user.favorites.push(recipeId);
  await user.save();

  return favoritRecept;
};

// створити приватний ендпоінт для видалення рецепту зі списку улюблених

export const removeFavoriteRecept = async (userId, recipeId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError.NotFound('User not found');
  }

  const index = user.favorites.indexOf(recipeId);
  if (index === -1) {
    throw createHttpError.Conflict('Recipe is not in favorites');
  }

  user.favorites.splice(index, 1);
  await user.save();

  return recipeId;
};

// створити приватний ендпоінт для отримання улюблених рецептів

export const getAllFavoriteRecipes = async (userId) => {
  const user = await User.findById(userId).populate({
    path: 'favorites',
  });

  return user.favorites;
};
