import { Categories } from '../db/models/categories.js';

export const getAllCategories = async () => {
  const categories = await Categories.find();

  return categories;
};
