import { Router } from 'express';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';

const router = new Router();

router.use('/api/auth', authRouter);

// router.use('/api/users');

// router.use('/api/categories');

router.use('/api/ingredients', ingredientsRouter);

// router.use('/api/recipes');

export default router;
