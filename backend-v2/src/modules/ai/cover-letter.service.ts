import { GeminiService } from './gemini.service';
import { ResumesService } from '../resumes/resumes.service';
import { AppError } from '../../middleware/errorHandler';
import { ParsedResumeData } from '../resumes/resumes.types';

export class CoverLetterService {
    private geminiService: GeminiService;
    private resumesService: ResumesService;

    constructor() {
        this.geminiService = new GeminiService();
        this.resumesService = new ResumesService();
    }

    async generateCoverLetter(userId: string, resumeId: string, jobDescription: string, companyName?: string): Promise<string> {
        const resume = await this.resumesService.getResume(userId, resumeId);

        if (!resume.parsedData) {
            throw new AppError(400, 'Resume has not been parsed yet');
        }

        const parsedData = resume.parsedData as unknown as ParsedResumeData;

        const prompt = `
      You are an expert career coach and professional writer.
      
      Task: Write a compelling, personalized cover letter for this candidate applying to a specific job.
      
      Guidelines:
      1. Tone: Professional, enthusiastic, and confident.
      2. Structure: 
         - Opening: Strong hook, mention specific role and company (if known).
         - Body Paragraph 1: Connect past experience to job requirements (use evidence from resume).
         - Body Paragraph 2: Highlight soft skills and culture fit.
         - Closing: Call to action.
      3. Length: 300-400 words.
      4. Format: Plain text (markdown is okay for formatting).
      
      Target Job:
      ${companyName ? `Company: ${companyName}` : ''}
      Description: ${jobDescription.substring(0, 5000)}
      
      Candidate Profile:
      Name: ${parsedData.personalInfo.name}
      Current Title: ${parsedData.workExperience?.[0]?.title || 'Professional'}
      Top Skills: ${parsedData.skills?.technical?.slice(0, 5).join(', ')}
      Key Experience: ${JSON.stringify(parsedData.workExperience?.slice(0, 2))}
      
      Output ONLY the body of the cover letter. Do not include placeholders like "[Your Name]" or header addresses unless necessary (the system will add headers later). Start with "Dear Hiring Manager," or specific name if found in JD.
    `;

        return this.geminiService.generateText(prompt);
    }
}
