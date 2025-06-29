import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategoriesController } from '../controllers/categories.js';

const router = Router();

router.get('/all', ctrlWrapper(getCategoriesController));

export default router;
