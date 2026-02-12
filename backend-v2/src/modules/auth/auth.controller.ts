import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { registerSchema, loginSchema, refreshTokenSchema } from './auth.types';
import { AppError } from '../../middleware/errorHandler';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const input = registerSchema.parse(req.body);
            const { user, tokens } = await authService.register(input);

            // Remove sensitive data
            const safeUser = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            res.status(201).json({
                status: 'success',
                data: {
                    user: safeUser,
                    tokens,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const input = loginSchema.parse(req.body);
            const { user, tokens } = await authService.login(input);

            const safeUser = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            };

            res.status(200).json({
                status: 'success',
                data: {
                    user: safeUser,
                    tokens,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const input = refreshTokenSchema.parse(req.body);
            const tokens = await authService.refreshToken(input.refreshToken);

            res.status(200).json({
                status: 'success',
                data: {
                    tokens,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            // req.user is set by auth middleware
            const userId = (req as any).user?.userId;

            if (!userId) {
                throw new AppError(401, 'Unauthorized');
            }

            const user = await authService.getCurrentUser(userId);

            const safeUser = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                linkedinUrl: user.linkedinUrl,
            };

            res.status(200).json({
                status: 'success',
                data: {
                    user: safeUser,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
