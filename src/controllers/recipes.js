import fs from 'node:fs/promises';
import path from 'node:path';
import createHttpError from 'http-errors';
import {
  createRecept,
  getAllFavoriteRecipes,
  getAllRecipes,
  getFavoriteRecept,
  getOwnRecipes,
  getRecipestById,
  removeFavoriteRecept,
} from '../services/recipes.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParems } from '../utils/parsePaginationParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

// створити публічний ендпоінт для пошуку рецептів за категорією, інгредієнтом, входженням пошукового значення в назву рецепту (з урахуванням логіки пагінації)

export const getAllRecipesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParems(req.query);
  const filter = parseFilterParams(req.query);

  if (!filter) {
    throw createHttpError.BadRequest('Unknown category type');
  }

  const recipes = await getAllRecipes({ page, perPage, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found all recipes!',
    data: recipes,
  });
};

// створити публічний ендпоінт для отримання детальної інформації про рецепт за його id

export const getRecipestByIdController = async (req, res, next) => {
  const { recipeId } = req.params;

  const recipes = await getRecipestById(recipeId);

  if (!recipes) {
    throw createHttpError.NotFound('Resept not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found your resept with ${recipeId}!`,
    data: recipes,
  });
};

// створити приватний ендпоінт для створення власного рецепту

const handleUploadImage = async (foto) => {
  if (!foto) return null;

  let thumb = null;

  if (getEnvVar('UPLOAD_TO_CLOUDYNARY') === 'true') {
    const result = await uploadToCloudinary(foto.path);

    await fs.unlink(foto.path);
    thumb = result.secure_url;
  } else {
    await fs.rename(
      foto.path,
      path.resolve(path.resolve('src', 'uploads', 'photo', foto.filename)),
    );
    thumb = `http://localhost:8080/photo/${foto.filename}`;
  }

  return thumb;
};

export const createReceptController = async (req, res, next) => {
  const thumb = await handleUploadImage(req.file);
  const recipe = await createRecept({
    ...req.body,
    thumb,
    owner: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a recipet!',
    data: recipe,
  });
};

// створити приватний ендпоінт для отримання власних рецептів

export const getOwnRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParems(req.query);

  const ownerId = req.user.id;

  const myRecept = await getOwnRecipes({ page, perPage, owner: ownerId });

  res.status(200).json({
    status: 200,
    message: 'Successfully found your recipes!',
    data: myRecept,
  });
};

// створити приватний ендпоінт для додавання рецепту до списку улюблених

export const getFavoriteReceptController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  const recept = await getFavoriteRecept(userId, recipeId);

  if (!recept) {
    throw createHttpError.NotFound('Recipe not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Recipe added to favorites',
    data: recept,
  });
};

//  створити приватний ендпоінт для видалення рецепту зі списку улюблених

export const removeFavoriteReceptController = async (req, res) => {
  const userId = req.user.id;
  const { recipeId } = req.params;

  await removeFavoriteRecept(userId, recipeId);

  res.status(200).json({
    status: 200,
    message: 'Recipe removed from favorites',
    data: { recipeId },
  });
};

// створити приватний ендпоінт для отримання улюблених рецептів

export const getAllFavoriteRecipesController = async (req, res) => {
  const { page, perPage } = parsePaginationParems(req.query);
  const userId = req.user.id;

  if (userId === null) {
    throw createHttpError.NotFound('User not found');
  }

  const favoriteRecipes = await getAllFavoriteRecipes({
    page,
    perPage,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched favorite recipes',
    data: favoriteRecipes,
  });
};
