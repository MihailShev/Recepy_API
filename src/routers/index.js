import { Router } from 'express';
import authRouter from './auth.js';
import categoriesRouter from './categories.js';

const router = new Router();

router.use('/api/auth', authRouter);

// router.use('/api/users');

router.use('/api/categories', categoriesRouter);

// router.use('/api/ingredients');

// router.use('/api/recipes');

export default router;
