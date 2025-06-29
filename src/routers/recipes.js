import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { upload } from '../middlewares/upload.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  createReceptController,
  getAllRecipesController,
  getFavoriteReceptController,
  getFavoriteRecipesController,
  getOwnRecipesController,
  getRecipestByIdController,
  removeFavoriteReceptController,
} from '../controllers/recipes.js';
import { validationCreateRecipe } from '../validation/recept.js';

const router = Router();

router.get('/', ctrlWrapper(getAllRecipesController));

router.get('/:contactId', isValidID, ctrlWrapper(getRecipestByIdController));

router.post(
  '/',
  upload.single('thumb'),
  validateBody(validationCreateRecipe),
  ctrlWrapper(createReceptController),
);

router.get('/own', isValidID, ctrlWrapper(getOwnRecipesController));

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

router.get(
  '/favorites',
  authenticate,
  ctrlWrapper(getFavoriteRecipesController),
);

export default router;
