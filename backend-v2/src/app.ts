import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/env';
import { logger } from './utils/logger';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';

const app: Express = express();

// Middleware
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            config.frontend.url,
            'http://localhost:3000',
            'http://localhost:3002',
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('user-agent'),
    });
    next();
});

// Rate limiting
app.use('/api/', apiLimiter);

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// API routes
app.get('/api', (_req: Request, res: Response) => {
    res.json({
        message: 'ApplyWise API',
        version: '1.0.0',
        documentation: '/api/docs',
    });
});

// Routes
import authRouter from './modules/auth/auth.routes';

app.use('/api/auth', authRouter);

import resumesRouter from './modules/resumes/resumes.routes';
app.use('/api/resumes', resumesRouter);

import aiRouter from './modules/ai/ai.routes';
app.use('/api/ai', aiRouter);

// TODO: Import and use other routers
// app.use('/api/users', usersRouter);
// app.use('/api/companies', companiesRouter);
// app.use('/api/jobs', jobsRouter);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
