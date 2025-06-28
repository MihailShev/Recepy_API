import { Router, json } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidID } from '../middlewares/isValidID.js';
import { upload } from '../middlewares/upload.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getIngredientsController } from '../controllers/ingredients.js';

const router = Router();
const jsonParser = json();

router.get('/', ctrlWrapper(getIngredientsController));

export default router;
