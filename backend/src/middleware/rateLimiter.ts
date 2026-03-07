import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redisClient } from '../config/redis';
import { logger } from '../utils/logger';

// Check if Redis is available
let redisAvailable = false;
redisClient.ping()
  .then(() => {
    redisAvailable = true;
    logger.info('✅ Redis available for rate limiting');
  })
  .catch(() => {
    logger.warn('⚠️  Redis not available, using in-memory rate limiting');
  });

export const apiLimiter = rateLimit({
  store: redisAvailable ? new RedisStore({
    // @ts-expect-error - rate-limit-redis types don't match ioredis
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:'
  }) : undefined, // Falls back to in-memory store
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests per minute
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      retryAfter: 60
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise IP
    return (req as any).user?.id || req.ip || 'unknown';
  }
});

export const authLimiter = rateLimit({
  store: redisAvailable ? new RedisStore({
    // @ts-expect-error - rate-limit-redis types don't match ioredis
    sendCommand: (...args: string[]) => redisClient.call(...args),
    prefix: 'rl:auth:'
  }) : undefined, // Falls back to in-memory store
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per 15 minutes
  message: {
    error: {
      code: 'AUTH_RATE_LIMIT_EXCEEDED',
      message: 'Too many authentication attempts. Please try again later.',
      retryAfter: 900
    }
  }
});
