// Load environment variables FIRST (before any other imports read process.env)
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { apiLimiter, translateLimiter } from './middleware/rateLimiter';

// Routes
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import userRoutes from './routes/user.routes';
import schemeRoutes from './routes/scheme.routes';
import weatherRoutes from './routes/weather.routes';
import mandiRoutes from './routes/mandi.routes';
import voiceRoutes from './routes/voice.routes';
import webhookRoutes from './routes/webhook.routes';
import healthRoutes from './routes/health.routes';
import translateRoutes from './routes/translate';
import cropRoutes from './routes/crop.routes';
import aiRoutes from './routes/ai.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use(requestLogger);

// Health check (no rate limit)
app.use('/api/health', healthRoutes);

// Rate limiting for /api routes (generous to allow translations)
app.use('/api', apiLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/mandi', mandiRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/crop', cropRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', translateRoutes);
app.use('/webhooks', webhookRoutes);

// Error handling
app.use(errorHandler);

// Create HTTP server
const server = createServer(app);

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 SamarthBharat API Server running on port ${PORT}`);
  logger.info(`📝 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🌐 API URL: ${process.env.API_BASE_URL}`);
});

// Prevent crashes from unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Promise Rejection:', reason?.message || reason);
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', error.message);
  // Don't exit — keep serving
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export default app;
