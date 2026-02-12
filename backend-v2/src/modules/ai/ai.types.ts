import { z } from 'zod';

export const suggestRolesSchema = z.object({
    resumeId: z.string().uuid(),
});

export const tailorResumeSchema = z.object({
    resumeId: z.string().uuid(),
    jobDescription: z.string().min(50),
});

export const coverLetterSchema = z.object({
    resumeId: z.string().uuid(),
    jobDescription: z.string().min(50),
    companyName: z.string().optional(),
});

export interface RoleSuggestion {
    role: string;
    confidenceScore: number;
    reasoning: string;
    category: 'Similar' | 'Progressive' | 'Pivot';
}

export interface TailoredContent {
    professionalSummary: string;
    skills: {
        technical: string[];
        soft: string[];
    };
    highlightedExperience: {
        company: string;
        points: string[];
    }[];
    atsScorePrediction: number;
}
