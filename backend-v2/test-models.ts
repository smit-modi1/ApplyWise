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

    /*
    // This is not directly exposed in the high level SDK easily in the same way, 
    // but let's try to just use valid models we know like 'gemini-pro' or 'gemini-1.5-flash-latest'
    // Actually, listing models might require using the REST API directly if the SDK doesn't expose it easily in this version.
    // But let's try the simplest test: 'gemini-pro'
    */

    console.log("Testing with 'gemini-1.5-flash'...");
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Hello');
        console.log('✅ gemini-1.5-flash works!');
    } catch (e: any) {
        console.log('❌ gemini-1.5-flash failed:', e.message);
    }

    console.log("Testing with 'gemini-pro'...");
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Hello');
        console.log('✅ gemini-pro works!');
    } catch (e: any) {
        console.log('❌ gemini-pro failed:', e.message);
    }
}

main();
