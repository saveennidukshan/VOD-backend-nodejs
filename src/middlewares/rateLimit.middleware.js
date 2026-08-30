import { AppError } from '../utils/errors.js';
import authConfig from '../configs/auth.config.js';

const buckets = new Map();

const getKey = (req) => `${req.ip}:${req.path}`;

const createRateLimiter = ({ windowMs, max }) => {
  return (req, res, next) => {
    const key = getKey(req);
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      return next();
    }

    if (bucket.count >= max) {
      return next(new AppError('Too many requests. Please try again later.', 429));
    }

    bucket.count += 1;
    return next();
  };
};

export const loginRateLimiter = createRateLimiter({
  windowMs: authConfig.loginRateLimitWindowMs,
  max: authConfig.loginRateLimitMax,
});

export const resetRateLimiter = createRateLimiter({
  windowMs: authConfig.resetRateLimitWindowMs,
  max: authConfig.resetRateLimitMax,
});

export const clearRateLimitBucketsForTests = () => {
  buckets.clear();
};
