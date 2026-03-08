import { logger } from '../utils/logger';

// ────────────── ElastiCache Redis Integration ──────────────
// Cluster: samarthbharat-redis (cache.t3.micro, Redis 7.0)
// Purpose: Caching, session management, rate limiting

// In-memory fallback when ElastiCache is not reachable (local dev)
const memoryStore = new Map<string, { value: string; expiresAt?: number }>();

let redisConnected = false;
let ioRedisClient: any = null;

// Try to connect to ElastiCache Redis
async function connectToElastiCache(): Promise<void> {
  const redisHost = process.env.ELASTICACHE_HOST || process.env.REDIS_HOST;
  const redisPort = parseInt(process.env.ELASTICACHE_PORT || process.env.REDIS_PORT || '6379');

  if (!redisHost) {
    logger.info('📦 ElastiCache: No host configured, using in-memory fallback');
    return;
  }

  try {
    const Redis = (await import('ioredis')).default;
    ioRedisClient = new Redis({
      host: redisHost,
      port: redisPort,
      retryStrategy: (times: number) => {
        if (times > 3) return null; // Stop retrying after 3 attempts
        return Math.min(times * 200, 2000);
      },
      connectTimeout: 5000,
      lazyConnect: true,
    });

    await ioRedisClient.connect();
    const pong = await ioRedisClient.ping();
    if (pong === 'PONG') {
      redisConnected = true;
      logger.info(`✅ Connected to ElastiCache Redis at ${redisHost}:${redisPort}`);
    }
  } catch (error: any) {
    logger.warn(`ElastiCache connection failed (using in-memory fallback): ${error.message}`);
    ioRedisClient = null;
  }
}

// Initialize connection attempt
connectToElastiCache().catch(() => {});

// Clean expired keys from memory store periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryStore) {
    if (entry.expiresAt && entry.expiresAt < now) {
      memoryStore.delete(key);
    }
  }
}, 60_000);

// ────────────── ElastiCache Service ──────────────
export class ElastiCacheService {
  /**
   * Get a value from ElastiCache (or in-memory fallback)
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      if (redisConnected && ioRedisClient) {
        const value = await ioRedisClient.get(key);
        return value ? JSON.parse(value) : null;
      }

      // In-memory fallback
      const entry = memoryStore.get(key);
      if (!entry) return null;
      if (entry.expiresAt && entry.expiresAt < Date.now()) {
        memoryStore.delete(key);
        return null;
      }
      return JSON.parse(entry.value) as T;
    } catch (error: any) {
      logger.error('ElastiCache get error:', error.message);
      return null;
    }
  }

  /**
   * Set a value in ElastiCache with optional TTL (or in-memory fallback)
   */
  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);

      if (redisConnected && ioRedisClient) {
        if (ttlSeconds) {
          await ioRedisClient.setex(key, ttlSeconds, serialized);
        } else {
          await ioRedisClient.set(key, serialized);
        }
        return;
      }

      // In-memory fallback
      memoryStore.set(key, {
        value: serialized,
        expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined,
      });
    } catch (error: any) {
      logger.error('ElastiCache set error:', error.message);
    }
  }

  /**
   * Delete a key from ElastiCache
   */
  async delete(key: string): Promise<void> {
    try {
      if (redisConnected && ioRedisClient) {
        await ioRedisClient.del(key);
        return;
      }
      memoryStore.delete(key);
    } catch (error: any) {
      logger.error('ElastiCache delete error:', error.message);
    }
  }

  /**
   * Increment a counter (for rate limiting)
   */
  async increment(key: string, ttlSeconds: number = 60): Promise<number> {
    try {
      if (redisConnected && ioRedisClient) {
        const count = await ioRedisClient.incr(key);
        if (count === 1) {
          await ioRedisClient.expire(key, ttlSeconds);
        }
        return count;
      }

      // In-memory fallback
      const entry = memoryStore.get(key);
      const currentCount = entry ? parseInt(entry.value) || 0 : 0;
      const newCount = currentCount + 1;
      memoryStore.set(key, {
        value: String(newCount),
        expiresAt: Date.now() + ttlSeconds * 1000,
      });
      return newCount;
    } catch (error: any) {
      logger.error('ElastiCache increment error:', error.message);
      return 0;
    }
  }

  // ────────────── Domain-Specific Cache Methods ──────────────

  /** Cache weather data (1-hour TTL) */
  async cacheWeather(pincode: string, data: any): Promise<void> {
    await this.set(`weather:${pincode}`, data, 3600);
  }

  /** Get cached weather data */
  async getCachedWeather(pincode: string): Promise<any> {
    return this.get(`weather:${pincode}`);
  }

  /** Cache mandi prices (1-hour TTL) */
  async cacheMandiPrices(crop: string, data: any): Promise<void> {
    await this.set(`mandi:${crop}`, data, 3600);
  }

  /** Get cached mandi prices */
  async getCachedMandiPrices(crop: string): Promise<any> {
    return this.get(`mandi:${crop}`);
  }

  /** Cache user session (30-minute TTL) */
  async cacheSession(userId: string, sessionData: any): Promise<void> {
    await this.set(`session:${userId}`, sessionData, 1800);
  }

  /** Get cached session */
  async getCachedSession(userId: string): Promise<any> {
    return this.get(`session:${userId}`);
  }

  /** Rate limit check */
  async checkRateLimit(userId: string, maxRequests: number = 100, windowSeconds: number = 60): Promise<boolean> {
    const count = await this.increment(`ratelimit:${userId}`, windowSeconds);
    return count <= maxRequests;
  }

  // ────────────── Health Check ──────────────
  async healthCheck(): Promise<{ status: string; backend: string; latency: number }> {
    const start = Date.now();
    try {
      if (redisConnected && ioRedisClient) {
        await ioRedisClient.ping();
        return { status: 'healthy', backend: 'elasticache', latency: Date.now() - start };
      }
      return { status: 'healthy', backend: 'in-memory', latency: Date.now() - start };
    } catch (error: any) {
      return { status: 'degraded', backend: 'in-memory', latency: Date.now() - start };
    }
  }

  /** Get cache statistics */
  getStats(): { backend: string; connected: boolean; memoryKeys: number } {
    return {
      backend: redisConnected ? 'elasticache' : 'in-memory',
      connected: redisConnected,
      memoryKeys: memoryStore.size,
    };
  }
}

// Singleton instance
export const elastiCacheService = new ElastiCacheService();
export default elastiCacheService;
