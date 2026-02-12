import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';
import { AppError } from '../../middleware/errorHandler';

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: GenerativeModel;

    constructor() {
        this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
        this.model = this.genAI.getGenerativeModel({ model: config.gemini.model });
    }

    async generateJson<T>(prompt: string): Promise<T> {
        try {
            const result = await this.model.generateContent(prompt + '\n\nReturn valid JSON only. Do not use markdown.');
            const response = await result.response;
            const text = response.text();

            // Clean markdown code blocks if present
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(cleanJson) as T;
        } catch (error) {
            logger.error('Gemini JSON generation error:', error);
            throw new AppError(502, 'Failed to generate content from AI');
        }
    }

    async generateText(prompt: string): Promise<string> {
        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            logger.error('Gemini text generation error:', error);
            throw new AppError(502, 'Failed to generate content from AI');
        }
    }
}
