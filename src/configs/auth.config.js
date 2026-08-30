import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  return String(value).toLowerCase() === 'true';
};

const parseNumber = (value, defaultValue) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : defaultValue;
};

const parseList = (value, fallback = []) => {
  if (!value) return fallback;
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const now = () => new Date();

const authConfig = {
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'dev-access-secret-change-me',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'dev-refresh-secret-change-me',
  tokenActionSecret:
    process.env.JWT_ACTION_SECRET || process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || 'dev-action-secret-change-me',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  emailVerifyTokenExpiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN || '24h',
  resetTokenExpiresIn: process.env.RESET_TOKEN_EXPIRES_IN || '15m',
  bcryptSaltRounds: parseNumber(process.env.BCRYPT_SALT_ROUNDS, 12),
  frontendOrigin: parseList(process.env.FRONTEND_ORIGIN, ['http://localhost:3000']),
  cookieSecure: parseBoolean(process.env.COOKIE_SECURE, process.env.NODE_ENV === 'production'),
  cookieSameSite: process.env.COOKIE_SAMESITE || 'strict',
  requireEmailVerification: parseBoolean(process.env.REQUIRE_EMAIL_VERIFICATION, false),
  authLockThreshold: parseNumber(process.env.AUTH_LOCK_THRESHOLD, 5),
  authLockMinutes: parseNumber(process.env.AUTH_LOCK_MINUTES, 15),
  authProgressiveDelayMs: parseNumber(process.env.AUTH_PROGRESSIVE_DELAY_MS, 250),
  loginRateLimitWindowMs: parseNumber(process.env.LOGIN_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  loginRateLimitMax: parseNumber(process.env.LOGIN_RATE_LIMIT_MAX, 10),
  resetRateLimitWindowMs: parseNumber(process.env.RESET_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  resetRateLimitMax: parseNumber(process.env.RESET_RATE_LIMIT_MAX, 5),
  refreshTokenCookieName: process.env.REFRESH_TOKEN_COOKIE_NAME || 'refreshToken',
  csrfCookieName: process.env.CSRF_COOKIE_NAME || 'csrfToken',
  refreshTokenHashSecret:
    process.env.REFRESH_TOKEN_HASH_SECRET || process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'dev-refresh-hash-secret',
  now,
};

export default authConfig;
