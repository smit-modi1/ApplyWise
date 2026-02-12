import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url(),

    // JWT
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('7d'),
    REFRESH_TOKEN_SECRET: z.string().min(32),
    REFRESH_TOKEN_EXPIRES_IN: z.string().default('30d'),

    // Google OAuth
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CALLBACK_URL: z.string().url().optional(),

    // Google Gemini AI
    GEMINI_API_KEY: z.string(),
    GEMINI_MODEL: z.string().default('gemini-1.5-pro'),

    // Email
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number(),
    SMTP_USER: z.string().email(),
    SMTP_PASSWORD: z.string(),
    EMAIL_FROM: z.string(),

    // File Storage
    UPLOAD_DIR: z.string().default('./uploads'),
    GENERATED_DIR: z.string().default('./generated'),
    MAX_FILE_SIZE: z.coerce.number().default(10485760),

    // Frontend URL
    FRONTEND_URL: z.string().url(),

    // API
    PORT: z.coerce.number().default(3001),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Rate Limiting
    RATE_LIMIT_WINDOW_MS: z.coerce.number().default(900000),
    RATE_LIMIT_MAX_REQUESTS: z.coerce.number().default(100),

    // Scraping
    SCRAPE_RATE_LIMIT_MS: z.coerce.number().default(2000),
    SCRAPE_TIMEOUT_MS: z.coerce.number().default(30000),
});

const parseEnv = () => {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Invalid environment variables:');
            error.errors.forEach((err) => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
            process.exit(1);
        }
        throw error;
    }
};

export const env = parseEnv();

export const config = {
    database: {
        url: env.DATABASE_URL,
    },
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: env.JWT_EXPIRES_IN,
        refreshSecret: env.REFRESH_TOKEN_SECRET,
        refreshExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    },
    google: {
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackUrl: env.GOOGLE_CALLBACK_URL,
    },
    gemini: {
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL,
    },
    email: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        user: env.SMTP_USER,
        password: env.SMTP_PASSWORD,
        from: env.EMAIL_FROM,
    },
    storage: {
        uploadDir: env.UPLOAD_DIR,
        generatedDir: env.GENERATED_DIR,
        maxFileSize: env.MAX_FILE_SIZE,
    },
    frontend: {
        url: env.FRONTEND_URL,
    },
    server: {
        port: env.PORT,
        env: env.NODE_ENV,
        isDevelopment: env.NODE_ENV === 'development',
        isProduction: env.NODE_ENV === 'production',
        isTest: env.NODE_ENV === 'test',
    },
    rateLimit: {
        windowMs: env.RATE_LIMIT_WINDOW_MS,
        maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
    },
    scraping: {
        rateLimitMs: env.SCRAPE_RATE_LIMIT_MS,
        timeoutMs: env.SCRAPE_TIMEOUT_MS,
    },
} as const;
