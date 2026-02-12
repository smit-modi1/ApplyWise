# 🚀 Vercel Deployment Guide for ApplyWise

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:
- ✅ GitHub repository connected to Vercel
- ✅ Backend deployed somewhere (Heroku, Railway, Render, etc.)
- ✅ Database accessible from the internet
- ✅ Google OAuth credentials configured

---

## 🔧 Vercel Configuration

### Step 1: Configure Vercel Project Settings

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your ApplyWise project**
3. **Go to Settings → General**
4. **Set Root Directory:**
   - Root Directory: `frontend-v2`
   - Framework Preset: `Next.js`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

### Step 2: Configure Environment Variables

Go to **Settings → Environment Variables** and add:

#### Required Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
```

**Important:** Replace `https://your-backend-url.com/api` with your actual deployed backend URL.

**Examples:**
- Heroku: `https://applywise-backend.herokuapp.com/api`
- Railway: `https://applywise-backend.up.railway.app/api`
- Render: `https://applywise-backend.onrender.com/api`

---

## 🏗️ Backend Deployment (Required First!)

**Before deploying frontend to Vercel, you MUST deploy your backend first.**

### Option 1: Deploy to Railway (Recommended - Free Tier)

1. **Go to Railway:** https://railway.app
2. **Create New Project → Deploy from GitHub**
3. **Select your ApplyWise repository**
4. **Configure:**
   - Root Directory: `backend-v2`
   - Start Command: `npm run dev` (or `npm start` for production)

5. **Add Environment Variables:**
   ```
   DATABASE_URL=your_mysql_connection_string
   JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
   JWT_EXPIRES_IN=7d
   REFRESH_TOKEN_SECRET=your-refresh-secret-minimum-32-characters
   REFRESH_TOKEN_EXPIRES_IN=30d
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=https://your-backend-url.railway.app/api/auth/google/callback
   GEMINI_API_KEY=your-gemini-api-key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=3001
   NODE_ENV=production
   ```

6. **Deploy and get your backend URL**

### Option 2: Deploy to Heroku

1. **Install Heroku CLI**
2. **Login:** `heroku login`
3. **Create app:** `heroku create applywise-backend`
4. **Add MySQL addon:** `heroku addons:create jawsdb:kitefin`
5. **Set environment variables:** `heroku config:set KEY=VALUE`
6. **Deploy:** `git push heroku main`

### Option 3: Deploy to Render

1. **Go to Render:** https://render.com
2. **New → Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - Root Directory: `backend-v2`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Add environment variables in dashboard**

---

## 🌐 Update Google OAuth Settings

After deploying backend and frontend, update Google Cloud Console:

1. **Go to:** https://console.cloud.google.com
2. **APIs & Services → Credentials**
3. **Select your OAuth 2.0 Client ID**
4. **Add Authorized JavaScript origins:**
   ```
   https://your-backend-url.railway.app
   https://your-vercel-app.vercel.app
   ```
5. **Add Authorized redirect URIs:**
   ```
   https://your-backend-url.railway.app/api/auth/google/callback
   ```

---

## 🚀 Deploy to Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
2. **Import Project → Import Git Repository**
3. **Select ApplyWise repository**
4. **Configure Project:**
   - Framework Preset: `Next.js`
   - Root Directory: `frontend-v2`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = Your backend URL + `/api`
6. **Click Deploy**

### Method 2: Via Git Push (Auto-deploy)

1. **Connect repository to Vercel** (one-time setup)
2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```
3. **Vercel automatically deploys**

---

## 🐛 Common Vercel Errors & Solutions

### Error 1: "Module not found" or "Cannot find module"

**Cause:** Missing dependencies or incorrect root directory

**Solution:**
1. Go to Vercel Settings → General
2. Set Root Directory to `frontend-v2`
3. Redeploy

### Error 2: "Build failed" or "Command failed"

**Cause:** Build errors in code or missing environment variables

**Solution:**
1. Check Vercel build logs
2. Ensure all environment variables are set
3. Test build locally:
   ```bash
   cd frontend-v2
   npm run build
   ```
4. Fix any errors shown

### Error 3: "404 Page Not Found" after deployment

**Cause:** Incorrect routing or missing pages

**Solution:**
1. Check `vercel.json` configuration
2. Ensure all pages are in `frontend-v2/app` directory
3. Clear Vercel cache and redeploy

### Error 4: "API calls failing" or "CORS errors"

**Cause:** Backend not deployed or CORS not configured

**Solution:**
1. Ensure backend is deployed and running
2. Update `NEXT_PUBLIC_API_URL` in Vercel environment variables
3. Configure CORS in backend to allow Vercel domain:
   ```typescript
   // backend-v2/src/app.ts
   app.use(cors({
       origin: [
           'http://localhost:3002',
           'https://your-vercel-app.vercel.app'
       ],
       credentials: true
   }));
   ```

### Error 5: "Environment variables not working"

**Cause:** Environment variables not prefixed with `NEXT_PUBLIC_`

**Solution:**
- All client-side env vars MUST start with `NEXT_PUBLIC_`
- Example: `NEXT_PUBLIC_API_URL` (correct) vs `API_URL` (wrong)
- Redeploy after adding variables

### Error 6: "Google OAuth not working on Vercel"

**Cause:** OAuth redirect URLs not configured

**Solution:**
1. Update Google Cloud Console with Vercel URLs
2. Update backend `FRONTEND_URL` to Vercel URL
3. Update backend `GOOGLE_CALLBACK_URL` to backend URL

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] Backend is deployed and accessible
- [ ] Database is accessible from backend
- [ ] `NEXT_PUBLIC_API_URL` points to deployed backend
- [ ] Google OAuth credentials updated with production URLs
- [ ] Backend `FRONTEND_URL` points to Vercel app
- [ ] All environment variables set in Vercel
- [ ] Root directory set to `frontend-v2`
- [ ] Build succeeds locally (`npm run build`)

---

## 🔍 Testing Deployment

After deployment:

1. **Visit your Vercel URL:** `https://your-app.vercel.app`
2. **Test landing page loads**
3. **Test navigation** (Features, Testimonials, etc.)
4. **Test registration** with email/password
5. **Test Google OAuth login**
6. **Test dashboard** shows correct user data
7. **Check browser console** for errors

---

## 📊 Monitoring

### View Logs:
1. **Vercel Dashboard → Deployments**
2. **Click on deployment → View Function Logs**
3. **Check for errors**

### View Analytics:
1. **Vercel Dashboard → Analytics**
2. **Monitor page views, performance, errors**

---

## 🔄 Redeploying

### Automatic Redeploy (Recommended):
- Push to GitHub main branch
- Vercel automatically redeploys

### Manual Redeploy:
1. **Vercel Dashboard → Deployments**
2. **Click ⋯ on latest deployment**
3. **Click "Redeploy"**

---

## 🌍 Custom Domain (Optional)

1. **Vercel Dashboard → Settings → Domains**
2. **Add Domain:** `applywise.com`
3. **Follow DNS configuration instructions**
4. **Update Google OAuth** with custom domain
5. **Update backend `FRONTEND_URL`** to custom domain

---

## 📝 Environment Variables Reference

### Frontend (Vercel):
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

### Backend (Railway/Heroku/Render):
```
DATABASE_URL=mysql://user:pass@host:3306/db
JWT_SECRET=your-secret-key-minimum-32-chars
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-secret-32-chars
REFRESH_TOKEN_EXPIRES_IN=30d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=https://your-backend.railway.app/api/auth/google/callback
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=3001
NODE_ENV=production
```

---

## 🆘 Need Help?

If deployment fails:

1. **Check Vercel build logs** for specific errors
2. **Test build locally:** `cd frontend-v2 && npm run build`
3. **Verify environment variables** are set correctly
4. **Check backend is running:** Visit backend health endpoint
5. **Review this guide** step by step

---

## 🎉 Success!

Once deployed successfully:
- ✅ Frontend accessible at `https://your-app.vercel.app`
- ✅ Backend accessible at `https://your-backend.railway.app`
- ✅ Google OAuth working
- ✅ Database connected
- ✅ All features functional

**Your ApplyWise app is now live! 🚀**
