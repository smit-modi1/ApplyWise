import { Resume } from '@prisma/client';
import prisma from '../../config/database';
import { ResumeParserService } from './resume-parser.service';
import { ResumeFile } from './resumes.types';
import path from 'path';
import fs from 'fs/promises';
import { config } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';

export class ResumesService {
    private parserService: ResumeParserService;

    constructor() {
        this.parserService = new ResumeParserService();
    }

    async uploadResume(userId: string, file: ResumeFile, isPrimary: boolean = false): Promise<Resume> {
        // 1. Save file to disk
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        const filePath = path.join(config.storage.uploadDir, fileName);

        // Ensure upload dir exists (should be done on startup but safe check)
        await fs.mkdir(config.storage.uploadDir, { recursive: true });
        await fs.writeFile(filePath, file.buffer);

        // 2. Parse resume with AI
        const parsedData = await this.parserService.parseResume(file);

        // 3. Handle primary resume logic
        if (isPrimary) {
            // Unset other primary resumes
            await prisma.resume.updateMany({
                where: { userId, isPrimary: true },
                data: { isPrimary: false },
            });
        } else {
            // If this is the first resume, make it primary automatically
            const count = await prisma.resume.count({ where: { userId } });
            if (count === 0) {
                isPrimary = true;
            }
        }

        // 4. Update User profile with extracted info if missing
        if (parsedData.personalInfo) {
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (user) {
                const updates: any = {};
                if (!user.firstName && parsedData.personalInfo.name) {
                    const names = parsedData.personalInfo.name.split(' ');
                    updates.firstName = names[0];
                    updates.lastName = names.slice(1).join(' ');
                }
                if (!user.phone && parsedData.personalInfo.phone) {
                    updates.phone = parsedData.personalInfo.phone;
                }
                if (!user.linkedinUrl && parsedData.personalInfo.linkedinUrl) {
                    updates.linkedinUrl = parsedData.personalInfo.linkedinUrl;
                }

                if (Object.keys(updates).length > 0) {
                    await prisma.user.update({
                        where: { id: userId },
                        data: updates,
                    });
                }
            }
        }

        // 5. Save to database
        const resume = await prisma.resume.create({
            data: {
                userId,
                fileName: file.originalname,
                filePath: fileName, // Store relative path/filename
                fileType: file.mimetype.includes('pdf') ? 'pdf' : 'docx',
                fileSize: file.size,
                isPrimary,
                parsedData: parsedData as any, // Prisma Json handling
            },
        });

        return resume;
    }

    async getUserResumes(userId: string): Promise<Resume[]> {
        return prisma.resume.findMany({
            where: { userId },
            orderBy: { uploadedAt: 'desc' },
        });
    }

    async getResume(userId: string, resumeId: string): Promise<Resume> {
        const resume = await prisma.resume.findUnique({
            where: { id: resumeId },
        });

        if (!resume || resume.userId !== userId) {
            throw new AppError(404, 'Resume not found');
        }

        return resume;
    }

    async deleteResume(userId: string, resumeId: string): Promise<void> {
        const resume = await this.getResume(userId, resumeId);

        // Initial unlink from DB
        await prisma.resume.delete({
            where: { id: resumeId },
        });

        // Delete file from disk
        try {
            const fullPath = path.join(config.storage.uploadDir, resume.filePath);
            await fs.unlink(fullPath);
        } catch (error) {
            console.error('Error deleting resume file:', error);
            // Don't throw here, DB record is already gone
        }
    }
}
