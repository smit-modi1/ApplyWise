import { z } from 'zod';

export const uploadResumeSchema = z.object({
    isPrimary: z.string().transform((val) => val === 'true').optional(),
});

export interface ParsedResumeData {
    personalInfo: {
        name: string;
        email: string;
        phone: string;
        location: string;
        linkedinUrl?: string;
    };
    professionalSummary: string;
    workExperience: {
        company: string;
        title: string;
        location: string;
        startDate: string;
        endDate: string;
        isCurrent: boolean;
        durationMonths: number;
        description: string[];
    }[];
    education: {
        institution: string;
        degree: string;
        fieldOfStudy: string;
        startDate: string;
        endDate: string;
        gpa?: string;
    }[];
    skills: {
        technical: string[];
        soft: string[];
        tools: string[];
        languages: string[];
    };
    certifications: {
        name: string;
        issuer: string;
        date: string;
    }[];
    totalExperienceYears: number;
}

export interface ResumeFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}
