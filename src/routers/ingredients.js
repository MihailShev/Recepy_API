import { Router, json } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getIngredientsController } from '../controllers/ingredients.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getIngredientsController));

export default router;
