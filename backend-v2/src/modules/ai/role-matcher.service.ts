import { GeminiService } from './gemini.service';
import { ResumesService } from '../resumes/resumes.service';
import { RoleSuggestion } from './ai.types';
import { AppError } from '../../middleware/errorHandler';
import { ParsedResumeData } from '../resumes/resumes.types';

export class RoleMatcherService {
    private geminiService: GeminiService;
    private resumesService: ResumesService;

    constructor() {
        this.geminiService = new GeminiService();
        this.resumesService = new ResumesService();
    }

    async suggestRoles(userId: string, resumeId: string): Promise<RoleSuggestion[]> {
        // 1. Get resume data
        const resume = await this.resumesService.getResume(userId, resumeId);

        if (!resume.parsedData) {
            throw new AppError(400, 'Resume has not been parsed yet');
        }

        const parsedData = resume.parsedData as unknown as ParsedResumeData;

        // 2. prompt
        const prompt = `
      Analyze the following candidate profile and suggest 3-5 suitable job roles.
      
      Candidate Profile:
      - Title: ${parsedData.workExperience?.[0]?.title || 'Unknown'}
      - Skills: ${parsedData.skills?.technical?.join(', ') || ''}
      - Experience: ${parsedData.totalExperienceYears} years
      - Education: ${parsedData.education?.[0]?.degree || ''} in ${parsedData.education?.[0]?.fieldOfStudy || ''}
      
      Provide suggestions in 3 categories:
      1. Similar: Roles matching current title/experience
      2. Progressive: Next logical step up
      3. Pivot: Adjacent roles using transferrable skills
      
      Return JSON format:
      [
        {
          "role": "Role Title",
          "confidenceScore": 85,
          "reasoning": "Matching skills in X and Y...",
          "category": "Similar"
        }
      ]
    `;

        // 3. call gemini
        const suggestions = await this.geminiService.generateJson<RoleSuggestion[]>(prompt);

        return suggestions;
    }
}
