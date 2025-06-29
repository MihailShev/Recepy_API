import { Router } from 'express';
import authRouter from './auth.js';
import ingredientsRouter from './ingredients.js';
import categoriesRouter from './categories.js';
import usersRouter from './users.js';

const router = new Router();

router.use('/api/auth', authRouter);

router.use('/api/users', usersRouter);

router.use('/api/categories', categoriesRouter);

router.use('/api/ingredients', ingredientsRouter);

// router.use('/api/recipes');

export default router;
