import { getAllCategories } from '../services/categories.js';

export const getCategoriesController = async (req, res) => {
  const data = await getAllCategories();

  res.status(200).json({
    status: 200,
    message: 'Successful request for all categories',
    data: data,
  });
};
