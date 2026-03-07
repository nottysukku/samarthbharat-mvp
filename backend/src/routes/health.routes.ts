import { Router, Request, Response } from 'express';
import { redisClient } from '../config/redis';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Check Redis connection
    const redisStatus = redisClient.status === 'ready' ? 'healthy' : 'unhealthy';
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      services: {
        redis: redisStatus
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

export default router;
