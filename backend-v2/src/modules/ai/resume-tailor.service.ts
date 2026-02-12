import { GeminiService } from './gemini.service';
import { ResumesService } from '../resumes/resumes.service';
import { TailoredContent } from './ai.types';
import { AppError } from '../../middleware/errorHandler';
import { ParsedResumeData } from '../resumes/resumes.types';

export class ResumeTailorService {
    private geminiService: GeminiService;
    private resumesService: ResumesService;

    constructor() {
        this.geminiService = new GeminiService();
        this.resumesService = new ResumesService();
    }

    async tailorResume(userId: string, resumeId: string, jobDescription: string): Promise<TailoredContent> {
        const resume = await this.resumesService.getResume(userId, resumeId);

        if (!resume.parsedData) {
            throw new AppError(400, 'Resume has not been parsed yet');
        }

        const parsedData = resume.parsedData as unknown as ParsedResumeData;

        const prompt = `
      You are an expert Resume Tailor and ATS Optimizer.
      
      Task: Tailor the following candidate's resume content to match the target Job Description.
      
      Rules:
      1. Do NOT fabricate experience. Only rephrase or highlight existing experience.
      2. Use keywords from the JD where truthful.
      3. Rewrite the Professional Summary to align with the role.
      4. Select top 5-8 matching skills.
      5. Estimate an ATS match score (0-100).
      
      Target Job Description:
      ${jobDescription.substring(0, 5000)}
      
      Candidate Profile:
      ${JSON.stringify(parsedData.workExperience)}
      ${JSON.stringify(parsedData.skills)}
      
      Return JSON:
      {
        "professionalSummary": "New summary...",
        "skills": {
          "technical": ["Skill 1", "Skill 2"],
          "soft": ["Skill A"]
        },
        "highlightedExperience": [
          {
            "company": "Company A",
            "points": ["Original point rewritten to emphasize X", "Original point optimized"]
          }
        ],
        "atsScorePrediction": 85
      }
    `;

        return this.geminiService.generateJson<TailoredContent>(prompt);
    }
}
