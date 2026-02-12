import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticate } from '../../middleware/auth';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../../config/env';
import { AuthService } from './auth.service';

const router = Router();
const authController = new AuthController();
const authService = new AuthService();

// Configure Google Strategy
// Only if client ID is present (to avoid crashing if not configured)
if (config.google.clientId && config.google.clientSecret) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: config.google.clientId,
                clientSecret: config.google.clientSecret,
                callbackURL: config.google.callbackUrl || '/api/auth/google/callback',
            },
            async (_accessToken, _refreshToken, profile, done) => {
                try {
                    const email = profile.emails?.[0].value;
                    if (!email) {
                        return done(new Error('No email found in Google profile'));
                    }

                    const { user, tokens } = await authService.handleGoogleLogin({
                        googleId: profile.id,
                        email: email,
                        firstName: profile.name?.givenName || '',
                        lastName: profile.name?.familyName || '',
                        picture: profile.photos?.[0].value,
                    });

                    return done(null, { user, tokens });
                } catch (error) {
                    return done(error as Error);
                }
            }
        )
    );
}

// Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.get('/me', authenticate, authController.getCurrentUser);

// Google OAuth Routes
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {
        // Redirect to frontend with tokens
        const data = req.user as any;
        if (data && data.tokens) {
            const { accessToken, refreshToken } = data.tokens;
            // In production, we should set these as secure cookies or safe URL params
            // For MVP, redirecting with params or setting cookies
            // We'll redirect to a frontend processing page
            res.redirect(
                `${config.frontend.url}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`
            );
        } else {
            res.redirect(`${config.frontend.url}/login?error=auth_failed`);
        }
    }
);

export default router;
