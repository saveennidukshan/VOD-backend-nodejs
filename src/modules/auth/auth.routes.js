import { Router } from 'express';
import validator from '../../middlewares/validator.js';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  resendVerificationEmailSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from './auth.validation.js';
import { createAuthController } from './auth.controller.js';
import authConfig from '../../configs/auth.config.js';
import { parseDurationMs } from '../../utils/jwt.js';
import { authorize, protect, requireCsrfForCookieRefresh } from '../../middlewares/auth.middleware.js';
import { loginRateLimiter, resetRateLimiter } from '../../middlewares/rateLimit.middleware.js';

const route = Router();

const cookieOptions = {
  secure: authConfig.cookieSecure,
  sameSite: authConfig.cookieSameSite,
  refreshMaxAge: parseDurationMs(authConfig.refreshTokenExpiresIn),
  refreshTokenCookieName: authConfig.refreshTokenCookieName,
  csrfCookieName: authConfig.csrfCookieName,
};

const controller = createAuthController({ cookieOptions });

route.post('/register', validator(registerSchema), controller.register);
route.post('/signup', validator(registerSchema), controller.register);
route.post('/login', loginRateLimiter, validator(loginSchema), controller.login);
route.post(
  '/refresh-token',
  requireCsrfForCookieRefresh({
    csrfCookieName: authConfig.csrfCookieName,
    refreshTokenCookieName: authConfig.refreshTokenCookieName,
  }),
  validator(refreshTokenSchema),
  controller.refreshToken
);
route.post('/logout', controller.logout);
route.get('/me', protect, controller.me);
route.post('/forgot-password', resetRateLimiter, validator(forgotPasswordSchema), controller.forgotPassword);
route.post('/reset-password', resetRateLimiter, validator(resetPasswordSchema), controller.resetPassword);
route.post('/change-password', protect, validator(changePasswordSchema), controller.changePassword);
route.post('/verify-email', validator(verifyEmailSchema), controller.verifyEmail);
route.post('/resend-verification-email', validator(resendVerificationEmailSchema), controller.resendVerificationEmail);

route.get('/protected-sample', protect, authorize('admin', 'user'), controller.protectedAdminSample);

export default route;
