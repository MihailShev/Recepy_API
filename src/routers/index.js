import { Router } from 'express';
import authRouter from './auth.js';

const router = new Router();

router.use('/api/auth', authRouter);

// router.use('/api/users');

// router.use('/api/categories');

// router.use('/api/ingredients');

// router.use('/api/recipes');

export default router;
