import Redis from 'ioredis';
import { logger } from '../utils/logger';

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || undefined,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
});

redisClient.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redisClient.on('error', (err) => {
  logger.error('❌ Redis connection error:', err);
});

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await redisClient.setex(key, ttlSeconds, serialized);
      } else {
        await redisClient.set(key, serialized);
      }
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error('Cache delete error:', error);
    }
  }

  async cacheWeather(pincode: string, data: any): Promise<void> {
    await this.set(`weather:${pincode}`, data, 6 * 60 * 60); // 6 hours
  }

  async cacheMandiPrices(state: string, crop: string, data: any): Promise<void> {
    await this.set(`mandi:${state}:${crop}`, data, 24 * 60 * 60); // 24 hours
  }

  async cacheSchemes(userType: string, data: any): Promise<void> {
    await this.set(`schemes:${userType}`, data, 60 * 60); // 1 hour
  }

  async cacheConversationContext(conversationId: string, data: any): Promise<void> {
    await this.set(`context:${conversationId}`, data, 30 * 60); // 30 minutes
  }
}

export const cacheService = new CacheService();
