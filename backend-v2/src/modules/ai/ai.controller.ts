import { Request, Response, NextFunction } from 'express';
import { RoleMatcherService } from './role-matcher.service';
import { ResumeTailorService } from './resume-tailor.service';
import { CoverLetterService } from './cover-letter.service';
import { suggestRolesSchema, tailorResumeSchema, coverLetterSchema } from './ai.types';
import { AppError } from '../../middleware/errorHandler';

const roleMatcherService = new RoleMatcherService();
const resumeTailorService = new ResumeTailorService();
const coverLetterService = new CoverLetterService();

export class AIController {
    async suggestRoles(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const input = suggestRolesSchema.parse(req.body);

            const suggestions = await roleMatcherService.suggestRoles(userId, input.resumeId);

            res.status(200).json({
                status: 'success',
                data: {
                    suggestions,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async tailorResume(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const input = tailorResumeSchema.parse(req.body);

            const tailoredContent = await resumeTailorService.tailorResume(
                userId,
                input.resumeId,
                input.jobDescription
            );

            res.status(200).json({
                status: 'success',
                data: {
                    tailoredContent,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async generateCoverLetter(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const input = coverLetterSchema.parse(req.body);

            const coverLetter = await coverLetterService.generateCoverLetter(
                userId,
                input.resumeId,
                input.jobDescription,
                input.companyName
            );

            res.status(200).json({
                status: 'success',
                data: {
                    coverLetter,
                },
            });
        } catch (error) {
            next(error);
        }
    }
}
