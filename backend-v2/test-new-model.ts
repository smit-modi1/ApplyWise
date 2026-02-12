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

    console.log("Testing with 'gemini-flash-latest'...");
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
        const result = await model.generateContent('Hello');
        console.log('✅ gemini-flash-latest works!');
    } catch (e: any) {
        console.log('❌ gemini-flash-latest failed:', e.message);
    }

    console.log("Testing with 'gemini-pro-latest'...");
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro-latest' });
        const result = await model.generateContent('Hello');
        console.log('✅ gemini-pro-latest works!');
    } catch (e: any) {
        console.log('❌ gemini-pro-latest failed:', e.message);
    }
}

main();
