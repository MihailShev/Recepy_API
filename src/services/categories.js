import { Categories } from '../db/models/categories.js';

export const getAllCategories = async () => {
  const categories = await Categories.find().sort({ name: 1 });

  return categories;
};
