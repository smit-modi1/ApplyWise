import puppeteer from 'puppeteer';

(async () => {
    // Generate unique user
    const uniqueId = Math.floor(Math.random() * 100000);
    const email = `frontend_test_${uniqueId}@example.com`;
    const password = 'Password123!';

    console.log(`🚀 Starting Diagnostic Test for user: ${email}`);

    // 1. Register User via API
    try {
        console.log('API: Registering user...');
        const regRes = await fetch('http://localhost:3001/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                firstName: 'Frontend',
                lastName: 'Tester'
            })
        });

        if (!regRes.ok) {
            console.log(`⚠️  API Registration warning: ${regRes.status} ${await regRes.text()}`);
        } else {
            console.log('✅ API: User registered successfully.');
        }
    } catch (e) {
        console.error('❌ API Error:', e);
        process.exit(1);
    }

    // 2. Launch Browser
    console.log('🌐 Launching Browser...');
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    try {
        console.log('📍 Navigating to Login Page (http://localhost:3000/login)...');
        await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0', timeout: 30000 });
        console.log('✅ Login page reached. Waiting 3s for hydration...');
        await new Promise(r => setTimeout(r, 3000));

        const form = await page.$('form');
        if (!form) {
            console.error('❌ Login Form NOT found.');
        } else {
            console.log('✅ Login Form found.');
            const inputs = await page.$$('input');
            if (inputs.length >= 2) {
                console.log('Typing credentials...');
                await inputs[0].type(email);
                await inputs[1].type(password);

                console.log('🖱️  Clicking submit button...');
                const submitBtn = await page.$('button[type="submit"]');

                await Promise.all([
                    submitBtn?.click(),
                    page.waitForFunction(url => document.location.toString().includes('/dashboard'), { timeout: 15000 })
                        .catch(() => console.log('⚠️  Navigation wait timed out.'))
                ]);

                console.log(`Current URL: ${page.url()}`);
                if (page.url().includes('/dashboard')) {
                    console.log('🎉 SUCCESS: Login Flow Verified!');
                } else {
                    console.log('❌ Login failed to redirect.');
                }
            }
        }

    } catch (error) {
        console.error('❌ Browser Test Error:', error);
    } finally {
        await browser.close();
        console.log('🛑 Browser Closed');
    }
})();
