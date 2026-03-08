import { logger } from '../utils/logger';

// In-memory cache store (used when Redis is not available)
const memoryStore = new Map<string, { value: string; expiresAt?: number }>();

// Fake redisClient stub so existing imports don't break
export const redisClient = {
  status: 'ready' as string,
  async ping() { return 'PONG'; },
};

logger.info('📦 Using in-memory cache (Redis disabled — not needed for demo)');

// Clean expired keys periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryStore) {
    if (entry.expiresAt && entry.expiresAt < now) {
      memoryStore.delete(key);
    }
  }
}, 60_000);

export class CacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const entry = memoryStore.get(key);
      if (!entry) return null;
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        memoryStore.delete(key);
        return null;
      }
      return JSON.parse(entry.value) as T;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      memoryStore.set(key, {
        value: serialized,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    memoryStore.delete(key);
  }

  async cacheWeather(pincode: string, data: any): Promise<void> {
    await this.set(`weather:${pincode}`, data, 6 * 60 * 60);
  }

  async cacheMandiPrices(state: string, crop: string, data: any): Promise<void> {
    await this.set(`mandi:${state}:${crop}`, data, 24 * 60 * 60);
  }

  async cacheSchemes(userType: string, data: any): Promise<void> {
    await this.set(`schemes:${userType}`, data, 60 * 60);
  }

  async cacheConversationContext(conversationId: string, data: any): Promise<void> {
    await this.set(`context:${conversationId}`, data, 30 * 60);
  }
}

export const cacheService = new CacheService();
