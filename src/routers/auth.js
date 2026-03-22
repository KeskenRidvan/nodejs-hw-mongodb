const express = require('express');

const {
  registerUserController,
  loginUserController,
  refreshSessionController,
  logoutUserController,
  sendResetEmailController,
  resetPasswordController,
} = require('../controllers/auth');
const { validateBody } = require('../middlewares/validateBody');
const { ctrlWrapper } = require('../utils/ctrlWrapper');
const {
  registerUserSchema,
  loginUserSchema,
  sendResetEmailSchema,
  resetPasswordSchema,
} = require('../validation/auth');

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController)
);
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController)
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);

module.exports = router;
