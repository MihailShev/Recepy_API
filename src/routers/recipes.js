import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { upload } from '../middlewares/upload.js';
import { authenticate } from '../middlewares/authenticate.js';
import { parseIngredients } from '../middlewares/parseIngredient.js';
import {
  createReceptController,
  getAllFavoriteRecipesController,
  getAllRecipesController,
  getFavoriteReceptController,
  getOwnRecipesController,
  getRecipestByIdController,
  removeFavoriteReceptController,
} from '../controllers/recipes.js';
import { validationCreateRecipe } from '../validation/recept.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/own', authenticate, ctrlWrapper(getOwnRecipesController));

router.get(
  '/favorites',
  authenticate,
  ctrlWrapper(getAllFavoriteRecipesController),
);

router.post(
  '/',
  authenticate,
  parseIngredients,
  upload.single('thumb'),
  validateBody(validationCreateRecipe),
  ctrlWrapper(createReceptController),
);

router.post(
  '/favorites/:recipeId',
  authenticate,
  ctrlWrapper(getFavoriteReceptController),
);

router.delete(
  '/favorites/:recipeId',
  authenticate,
  ctrlWrapper(removeFavoriteReceptController),
);

router.get('/:contactId', isValidID, ctrlWrapper(getRecipestByIdController));

export default router;
