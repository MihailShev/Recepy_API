import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from '../controllers/users.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get(
  '/', authenticate,
  ctrlWrapper(getUserController)
);
export default router;
