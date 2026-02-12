import { Request, Response, NextFunction } from 'express';
import { ResumesService } from './resumes.service';
import { uploadResumeSchema } from './resumes.types';
import { AppError } from '../../middleware/errorHandler';

const resumesService = new ResumesService();

export class ResumesController {
    async upload(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                throw new AppError(400, 'No file uploaded');
            }

            const input = uploadResumeSchema.parse(req.body);

            // req.user added by auth middleware
            const userId = (req as any).user?.userId;

            if (!userId) {
                throw new AppError(401, 'Unauthorized');
            }

            const resume = await resumesService.uploadResume(userId, req.file, input.isPrimary);

            res.status(201).json({
                status: 'success',
                data: {
                    resume,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getMyResumes(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const resumes = await resumesService.getUserResumes(userId);

            res.status(200).json({
                status: 'success',
                data: {
                    resumes,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async getResume(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const id = req.params.id as string;
            const resume = await resumesService.getResume(userId, id);

            res.status(200).json({
                status: 'success',
                data: {
                    resume,
                },
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteResume(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user?.userId;
            const id = req.params.id as string;
            await resumesService.deleteResume(userId, id);

            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
