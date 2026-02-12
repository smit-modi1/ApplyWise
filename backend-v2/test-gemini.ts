import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env explicitly since we are running a standalone script
dotenv.config({ path: resolve(__dirname, '.env') });

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error('❌ GEMINI_API_KEY is missing in .env');
        return;
    }

    console.log('🔄 Testing Gemini API...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || 'gemini-1.5-pro' });

    try {
        const result = await model.generateContent('Hello! Verify if you are working. Reply with "AI is Online".');
        const response = await result.response;
        console.log('✅ Gemini Response:', response.text());
    } catch (error) {
        console.error('❌ Gemini Error:', error);
    }
}

main();
