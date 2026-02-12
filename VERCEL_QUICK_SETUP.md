# ✅ Vercel Quick Setup Checklist

## 🚨 IMPORTANT: Deploy Backend First!

Before deploying to Vercel, you MUST deploy your backend. Otherwise, the frontend will have no API to connect to.

---

## 📋 Step-by-Step Deployment

### Step 1: Deploy Backend (Choose One)

#### Option A: Railway (Recommended - Easy & Free)
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `ApplyWise` repository
5. Click "Add variables" and add these:
   ```
   DATABASE_URL=your_mysql_url
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
   REFRESH_TOKEN_SECRET=your-refresh-secret-minimum-32-characters-long
   GOOGLE_CLIENT_ID=your-google-client-id-from-google-cloud-console
   GOOGLE_CLIENT_SECRET=your-google-client-secret-from-google-cloud-console
   GEMINI_API_KEY=your-gemini-api-key-from-google-ai-studio
   FRONTEND_URL=https://your-app-name.vercel.app
   NODE_ENV=production
   PORT=3001
   ```
6. In Settings → Set:
   - Root Directory: `backend-v2`
   - Start Command: `npm start`
7. Click "Deploy"
8. **Copy your Railway URL** (e.g., `https://applywise-backend.up.railway.app`)

#### Option B: Render
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub → Select ApplyWise
4. Configure:
   - Name: `applywise-backend`
   - Root Directory: `backend-v2`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (same as above)
6. Create Web Service
7. **Copy your Render URL**

---

### Step 2: Update Google OAuth

1. Go to https://console.cloud.google.com
2. APIs & Services → Credentials
3. Click your OAuth 2.0 Client ID
4. Add to "Authorized JavaScript origins":
   ```
   https://your-backend-url.railway.app
   ```
5. Add to "Authorized redirect URIs":
   ```
   https://your-backend-url.railway.app/api/auth/google/callback
   ```
6. Save

---

### Step 3: Configure Vercel

1. Go to https://vercel.com/dashboard
2. Find your ApplyWise project (or import it)
3. Go to **Settings → General**
4. Set:
   - **Root Directory:** `frontend-v2`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

5. Go to **Settings → Environment Variables**
6. Add this variable:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://your-backend-url.railway.app/api
   ```
   ⚠️ Replace with YOUR actual backend URL from Step 1!

7. Click "Save"

---

### Step 4: Deploy to Vercel

#### Method 1: Redeploy from Dashboard
1. Go to **Deployments** tab
2. Click "Redeploy" on latest deployment
3. Wait for build to complete

#### Method 2: Trigger from Git (Automatic)
1. Vercel will automatically deploy when you push to GitHub
2. Already done! (Changes were just pushed)

---

### Step 5: Update Backend FRONTEND_URL

1. Go back to Railway/Render dashboard
2. Find your backend service
3. Go to Variables/Environment Variables
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-app-name.vercel.app
   ```
5. Redeploy backend

---

### Step 6: Update Google OAuth Again

1. Go back to Google Cloud Console
2. Add to "Authorized JavaScript origins":
   ```
   https://your-app-name.vercel.app
   ```
3. Save

---

## 🧪 Test Your Deployment

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Landing page should load
3. Click "Log in"
4. Try Google OAuth login
5. Should redirect to dashboard with your name

---

## 🐛 If Something Goes Wrong

### Error: "Failed to fetch" or "Network Error"
**Problem:** Backend not deployed or wrong URL

**Fix:**
1. Check backend is running (visit backend URL in browser)
2. Verify `NEXT_PUBLIC_API_URL` in Vercel matches backend URL
3. Redeploy Vercel after fixing

### Error: "404 Not Found"
**Problem:** Wrong root directory in Vercel

**Fix:**
1. Vercel Settings → General
2. Set Root Directory to `frontend-v2`
3. Redeploy

### Error: "Build Failed"
**Problem:** Missing dependencies or build errors

**Fix:**
1. Check Vercel build logs
2. Test locally: `cd frontend-v2 && npm run build`
3. Fix errors and push to GitHub

### Error: Google OAuth not working
**Problem:** OAuth URLs not configured

**Fix:**
1. Update Google Cloud Console with production URLs
2. Update backend `GOOGLE_CALLBACK_URL` to backend URL
3. Update backend `FRONTEND_URL` to Vercel URL

---

## 📝 Quick Reference

### Your URLs (Fill these in):
- **Backend URL:** `https://_____________________.railway.app`
- **Frontend URL:** `https://_____________________.vercel.app`

### Environment Variables:

**Vercel (Frontend):**
```
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL/api
```

**Railway/Render (Backend):**
```
FRONTEND_URL=https://YOUR-VERCEL-URL
GOOGLE_CALLBACK_URL=https://YOUR-BACKEND-URL/api/auth/google/callback
```

---

## ✅ Deployment Complete!

Once everything is set up:
- ✅ Backend running on Railway/Render
- ✅ Frontend running on Vercel
- ✅ Google OAuth configured
- ✅ Environment variables set
- ✅ App accessible and working

**Your ApplyWise app is now live! 🎉**

---

## 📚 Need More Help?

See the full guide: `VERCEL_DEPLOYMENT_GUIDE.md`
