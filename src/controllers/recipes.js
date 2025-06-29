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

export const getAllRecipesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParems(req.query);
  const filter = parseFilterParams(req.query);

  const recipes = await getAllRecipes({ page, perPage, filter });

  res.status(200).json({
    status: 200,
    message: 'Successfully found all recipes!',
    data: recipes,
  });
};

export const getRecipestByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;

  const recipes = await getRecipestById(contactId, userId);

  if (!recipes) {
    throw createHttpError.NotFound('Resept not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found your resept with ${contactId}!`,
    data: recipes,
  });
};

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
  const photo = await handleUploadImage(req.file);
  const recipe = await createRecept({
    ...req.body,
    ...(photo && { photoUrl: photo }),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a recipet!',
    data: recipe,
  });
};

export const getOwnRecipesController = async (req, res) => {
  const ownerId = req.user._id;

  const myRecept = getOwnRecipes({ owner: ownerId });

  res.status(200).json({
    status: 200,
    message: 'Successfully found your recipes!',
    data: myRecept,
  });
};

export const getFavoriteReceptController = async (req, res) => {
  const userId = req.user._id;
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

export const removeFavoriteReceptController = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  await removeFavoriteRecept(userId, recipeId);

  res.status(200).json({
    status: 200,
    message: 'Recipe removed from favorites',
    data: { recipeId },
  });
};

export const getAllFavoriteRecipesController = async (req, res) => {
  const userId = req.user._id;

  const favoriteRecipes = await getAllFavoriteRecipes(userId);

  if (userId === null) {
    throw createHttpError.NotFound('User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully fetched favorite recipes',
    data: favoriteRecipes,
  });
};
