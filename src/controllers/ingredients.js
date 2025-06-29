import { getAllIngredients } from '../services/ingredients.js';

export const getIngredientsController = async (req, res) => {
  const ingredients = await getAllIngredients();
  res.status(200).json({ status: 200, data: ingredients });
};
