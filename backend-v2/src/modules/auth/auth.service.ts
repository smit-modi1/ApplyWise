import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import prisma from '../../config/database';
import { config } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';
import {
    RegisterInput,
    LoginInput,
    AuthTokens,
    TokenPayload,
    GoogleUser
} from './auth.types';

export class AuthService {
    private async generateTokens(user: User): Promise<AuthTokens> {
        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
        };

        const accessToken = jwt.sign(payload, config.jwt.secret, {
            expiresIn: config.jwt.expiresIn,
        } as jwt.SignOptions);

        const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
            expiresIn: config.jwt.refreshExpiresIn,
        } as jwt.SignOptions);

        return { accessToken, refreshToken };
    }

    async register(input: RegisterInput): Promise<{ user: User; tokens: AuthTokens }> {
        const existingUser = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (existingUser) {
            throw new AppError(409, 'Email already exists');
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await prisma.user.create({
            data: {
                email: input.email,
                passwordHash: hashedPassword,
                firstName: input.firstName,
                lastName: input.lastName,
                phone: input.phone,
                // Create default preferences
                preferences: {
                    create: {
                        targetRoles: [],
                        targetIndustries: [],
                        preferredLocations: [],
                        jobTypes: [],
                    },
                },
            },
        });

        const tokens = await this.generateTokens(user);

        return { user, tokens };
    }

    async login(input: LoginInput): Promise<{ user: User; tokens: AuthTokens }> {
        const user = await prisma.user.findUnique({
            where: { email: input.email },
        });

        if (!user || !user.passwordHash) {
            throw new AppError(401, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);

        if (!isPasswordValid) {
            throw new AppError(401, 'Invalid email or password');
        }

        if (!user.isActive) {
            throw new AppError(403, 'Account is disabled');
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        const tokens = await this.generateTokens(user);

        return { user, tokens };
    }

    async refreshToken(token: string): Promise<AuthTokens> {
        try {
            const payload = jwt.verify(token, config.jwt.refreshSecret) as TokenPayload;

            const user = await prisma.user.findUnique({
                where: { id: payload.userId },
            });

            if (!user || user.email !== payload.email) {
                throw new AppError(401, 'Invalid refresh token');
            }

            if (!user.isActive) {
                throw new AppError(403, 'Account is disabled');
            }

            return this.generateTokens(user);
        } catch (error) {
            throw new AppError(401, 'Invalid or expired refresh token');
        }
    }

    async handleGoogleLogin(googleUser: GoogleUser): Promise<{ user: User; tokens: AuthTokens }> {
        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
        });

        if (user) {
            // If user exists but doesn't have googleId linked, link it
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: googleUser.googleId,
                        firstName: user.firstName || googleUser.firstName,
                        lastName: user.lastName || googleUser.lastName,
                    },
                });
            }
        } else {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    googleId: googleUser.googleId,
                    firstName: googleUser.firstName,
                    lastName: googleUser.lastName,
                    emailVerified: true, // Google emails are verified
                    preferences: {
                        create: {
                            targetRoles: [],
                            targetIndustries: [],
                            preferredLocations: [],
                            jobTypes: [],
                        },
                    },
                },
            });
        }

        if (!user.isActive) {
            throw new AppError(403, 'Account is disabled');
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });

        const tokens = await this.generateTokens(user);

        return { user, tokens };
    }

    async getCurrentUser(userId: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError(404, 'User not found');
        }

        return user;
    }
}
