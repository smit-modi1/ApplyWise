import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { AppError } from '../../middleware/errorHandler';
import { ParsedResumeData, ResumeFile } from './resumes.types';
import { logger } from '../../utils/logger';
import { GeminiService } from '../ai/gemini.service';

export class ResumeParserService {
    private geminiService: GeminiService;

    constructor() {
        this.geminiService = new GeminiService();
    }

    async parseResume(file: ResumeFile): Promise<ParsedResumeData> {
        let text = '';

        // Extract text based on file type
        if (file.mimetype === 'application/pdf') {
            text = await this.extractTextFromPdf(file.buffer);
        } else if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.mimetype === 'application/msword'
        ) {
            text = await this.extractTextFromDocx(file.buffer);
        } else {
            throw new AppError(400, 'Unsupported file format. Please upload PDF or DOCX.');
        }

        if (!text || text.trim().length === 0) {
            throw new AppError(400, 'Could not extract text from the resume.');
        }

        // Parse with AI
        return this.parseWithGemini(text);
    }

    private async extractTextFromPdf(buffer: Buffer): Promise<string> {
        try {
            const data = await pdf(buffer);
            return data.text;
        } catch (error) {
            logger.error('Error parsing PDF:', error);
            throw new AppError(500, 'Failed to read PDF file');
        }
    }

    private async extractTextFromDocx(buffer: Buffer): Promise<string> {
        try {
            const result = await mammoth.extractRawText({ buffer });
            return result.value;
        } catch (error) {
            logger.error('Error parsing DOCX:', error);
            throw new AppError(500, 'Failed to read DOCX file');
        }
    }

    private async parseWithGemini(text: string): Promise<ParsedResumeData> {
        const prompt = `
      You are an expert ATS resume parser. Extract structured data from the following resume text.
      Return ONLY valid JSON. Do not include markdown formatting or backticks.
      
      Resume Text:
      ${text.substring(0, 30000)} // Limit context window if needed

      Required JSON Structure:
      {
        "personalInfo": {
          "name": "Full Name",
          "email": "email@example.com",
          "phone": "number",
          "location": "City, Country",
          "linkedinUrl": "url if present"
        },
        "professionalSummary": "summary text",
        "workExperience": [
          {
            "company": "Company Name",
            "title": "Job Title",
            "location": "City, Country",
            "startDate": "YYYY-MM",
            "endDate": "YYYY-MM or Present",
            "isCurrent": boolean,
            "durationMonths": number,
            "description": ["bullet point 1", "bullet point 2"]
          }
        ],
        "education": [
          {
            "institution": "University Name",
            "degree": "Degree Name",
            "fieldOfStudy": "Major",
            "startDate": "YYYY",
            "endDate": "YYYY",
            "gpa": "3.5/4.0"
          }
        ],
        "skills": {
          "technical": ["React", "Node.js"],
          "soft": ["Leadership", "Communication"],
          "tools": ["Jira", "Figma"],
          "languages": ["English"]
        },
        "certifications": [
          {
            "name": "Cert Name",
            "issuer": "Issuer",
            "date": "YYYY-MM"
          }
        ],
        "totalExperienceYears": number (calculated total years)
      }
    `;

        return this.geminiService.generateJson<ParsedResumeData>(prompt);
    }
}
