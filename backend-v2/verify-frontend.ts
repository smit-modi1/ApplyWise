import puppeteer from 'puppeteer';

(async () => {
    // Generate unique user
    const uniqueId = Math.floor(Math.random() * 100000);
    const email = `frontend_test_${uniqueId}@example.com`;
    const password = 'Password123!';

    console.log(`🚀 Starting Frontend Test for user: ${email}`);

    // 1. Register User via API (Bypass UI for registration to focus on Login)
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
            throw new Error(`API Registration failed: ${regRes.status} ${await regRes.text()}`);
        }
        console.log('✅ API: User registered successfully.');
    } catch (e) {
        console.error('❌ API Error:', e);
        process.exit(1);
    }

    // 2. Launch Browser to Test Login UI
    console.log('🌐 Launching Browser...');
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log('📍 Navigating to Login Page (http://localhost:3000/auth/login)...');
        await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for inputs
        console.log('⏳ Waiting for login form...');
        await page.waitForSelector('form');

        // Find inputs
        const inputs = await page.$$('input');
        if (inputs.length < 2) {
            throw new Error(`Found only ${inputs.length} inputs, expected at least 2 (email, password).`);
        }

        console.log('⌨️  Typing credentials...');
        // Assuming typical order: Email, then Password
        await inputs[0].type(email);
        await inputs[1].type(password);

        // Find submit button
        const submitBtn = await page.$('button[type="submit"]');
        if (!submitBtn) throw new Error('Submit button not found');

        console.log('🖱️  Clicking Sign In...');

        // Click and wait for navigation
        // We handle potential SPA routing where networkidle might not be perfect
        await Promise.all([
            // Wait for URL to change or network idle
            // page.waitForNavigation calls can be flaky in SPAs if no full page reload happens
            // so we will wait for a predicate (url change)
            submitBtn.click(),
            page.waitForFunction(url => document.location.toString().includes('/dashboard'), { timeout: 10000 })
                .catch(() => console.log('⚠️  Navigation wait timed out, checking URL anyway...'))
        ]);

        const url = page.url();
        console.log(`📍 Current URL: ${url}`);

        if (url.includes('/dashboard')) {
            console.log('🎉 SUCCESS: Redirected to Dashboard!');

            // Validate Dashboard Content if possible
            // await page.waitForSelector('h1'); 
            // const title = await page.evaluate(() => document.querySelector('h1')?.innerText);
            // console.log(`📄 Dashboard Title: ${title}`);
        } else {
            console.error('❌ FAILURE: Did not redirect to Dashboard.');
            // Dump HTML
            // const html = await page.content();
            // console.log(html);
        }

    } catch (error) {
        console.error('❌ Browser Test Error:', error);
    } finally {
        await browser.close();
        console.log('🛑 Browser Closed');
    }
})();
