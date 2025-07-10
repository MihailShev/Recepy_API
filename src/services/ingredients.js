import { Ingredients } from '../db/models/ingredients.js';

export async function getAllIngredients() {
  return Ingredients.find().sort({ name: 1 });
}
