import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from './errorHandler';
import { TokenPayload } from '../modules/auth/auth.types';

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(401, 'No token provided, please log in');
        }

        const token = authHeader.split(' ')[1];

        try {
            const payload = jwt.verify(token, config.jwt.secret) as TokenPayload;
            req.user = payload;
            next();
        } catch (error) {
            throw new AppError(401, 'Invalid or expired token');
        }
    } catch (error) {
        next(error);
    }
};
