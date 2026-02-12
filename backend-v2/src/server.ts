import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';
import prisma from './config/database';

const PORT = config.server.port;

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT} in ${config.server.env} mode`);
    logger.info(`📝 API available at http://localhost:${PORT}/api`);
    logger.info(`💚 Health check at http://localhost:${PORT}/health`);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
    logger.info(`${signal} received. Starting graceful shutdown...`);

    server.close(async () => {
        logger.info('HTTP server closed');

        try {
            await prisma.$disconnect();
            logger.info('Database connection closed');
            process.exit(0);
        } catch (error) {
            logger.error('Error during shutdown:', error);
            process.exit(1);
        }
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
    logger.error('Unhandled Rejection:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});
