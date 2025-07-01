import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController, patchUserController } from '../controllers/users.js';

import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUsersInfoSchema } from '../validation/users.js';

const router = Router();

router.get(
  '/', authenticate,
  ctrlWrapper(getUserController)
);

router.patch(
  '/', authenticate, validateBody(updateUsersInfoSchema),
  ctrlWrapper(patchUserController)
);
export default router;
