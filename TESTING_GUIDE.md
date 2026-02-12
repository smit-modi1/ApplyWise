# 🚀 ApplyWise - Complete End-to-End Testing Guide

## ✅ Current Status

### Servers Running
- **Frontend:** http://localhost:3002 ✅
- **Backend:** http://localhost:3001 ✅
- **Database:** MySQL on localhost:3306 ✅

### Configuration Fixed
- ✅ Backend `.env` updated: `FRONTEND_URL="http://localhost:3002"`
- ✅ Google OAuth configured with correct callback
- ✅ User context implemented for real user data
- ✅ Dashboard color scheme matches landing page
- ✅ All routes properly configured

---

## 🧪 Complete Testing Workflow

### 1. **Test Landing Page**

**URL:** http://localhost:3002

**Checklist:**
- [ ] ParticleField background animates smoothly
- [ ] Navbar shows: Features, How It Works, Testimonials, Log in, Get Started
- [ ] "Get Started" button links to `/register`
- [ ] "Log in" button links to `/login`
- [ ] All sections visible: Hero, ProductWalkthrough, Pricing, Reviews, Footer
- [ ] Scroll is smooth
- [ ] No console errors

---

### 2. **Test Testimonials Page**

**URL:** http://localhost:3002/testimonials

**Checklist:**
- [ ] Page loads successfully
- [ ] ParticleField background visible
- [ ] Stats section shows: 94% success, 15hrs saved, etc.
- [ ] Featured testimonials (3 cards) display correctly
- [ ] Additional reviews grid (9 cards) displays
- [ ] "Start Free Trial" button links to `/register`
- [ ] Navbar and Footer present

---

### 3. **Test Registration (Email/Password)**

**URL:** http://localhost:3002/register

**Steps:**
1. Fill in form:
   - First Name: `Smit`
   - Last Name: `Modi`
   - Email: `smit.test@example.com`
   - Password: `TestPass123!`
2. Click "Create account"

**Expected Result:**
- [ ] Form submits successfully
- [ ] Redirects to `/dashboard`
- [ ] Dashboard shows "Good morning, Smit"
- [ ] Sidebar shows "SM" and "Smit Modi"
- [ ] No errors in console

**If it fails:**
- Check browser console for errors
- Check Network tab for `/auth/register` request
- Verify backend logs for errors

---

### 4. **Test Google OAuth Login** ⭐ (MAIN TEST)

**URL:** http://localhost:3002/login

**Steps:**
1. Click "Continue with Google" button
2. Browser redirects to Google login
3. Select your Google account (Smit's account)
4. Grant permissions if asked
5. Google redirects back to app

**Expected Flow:**
```
1. Click "Continue with Google"
   ↓
2. Redirect to: https://accounts.google.com/o/oauth2/v2/auth?...
   ↓
3. User logs in with Google
   ↓
4. Google redirects to: http://localhost:3001/api/auth/google/callback?code=xxx
   ↓
5. Backend processes OAuth, creates/finds user, generates tokens
   ↓
6. Backend redirects to: http://localhost:3002/auth/callback?accessToken=xxx&refreshToken=yyy
   ↓
7. Frontend stores tokens in localStorage
   ↓
8. Frontend redirects to: http://localhost:3002/dashboard
   ↓
9. Dashboard fetches user data from /auth/me
   ↓
10. Dashboard displays: "Good morning, Smit"
```

**Checklist:**
- [ ] Google login popup/redirect appears
- [ ] After Google auth, returns to app
- [ ] No 404 errors
- [ ] Redirects to dashboard
- [ ] Dashboard shows YOUR real name (Smit)
- [ ] Sidebar shows YOUR initials (SM)
- [ ] Sidebar shows YOUR email

**If 404 Error Occurs:**
- Open browser DevTools (F12)
- Go to Network tab
- Try Google login again
- Look for the failed request
- Check the URL it's trying to access
- Screenshot the error and check backend logs

---

### 5. **Test Dashboard After Login**

**URL:** http://localhost:3002/dashboard

**Checklist:**
- [ ] White background (not dark)
- [ ] Black text (readable)
- [ ] Greeting shows YOUR real first name
- [ ] Sidebar profile shows:
  - [ ] Your initials in black circle
  - [ ] Your full name
  - [ ] Your email address
- [ ] All cards have white backgrounds
- [ ] Stats display correctly
- [ ] "Your Journey" section visible
- [ ] "Recent Job Matches" section visible
- [ ] "Tailor a Resume" card (black background) visible
- [ ] "Daily Tip" card (yellow background) visible

---

### 6. **Test User Data Persistence**

**Steps:**
1. Log in successfully
2. Refresh the page (F5)
3. Check dashboard

**Expected Result:**
- [ ] Still logged in (no redirect to login)
- [ ] Dashboard still shows your name
- [ ] Sidebar still shows your info
- [ ] No "Loading..." stuck state

**If it fails:**
- Tokens might not be persisting
- Check localStorage in DevTools → Application → Local Storage
- Should see `accessToken` and `refreshToken`

---

### 7. **Test Logout**

**Steps:**
1. From dashboard, click "Sign Out" in sidebar
2. Observe behavior

**Expected Result:**
- [ ] Redirects to `/login`
- [ ] Tokens cleared from localStorage
- [ ] Cannot access `/dashboard` without logging in again
- [ ] Clicking dashboard link redirects to login

---

### 8. **Test Protected Routes**

**Steps:**
1. Log out completely
2. Try to access: http://localhost:3002/dashboard

**Expected Result:**
- [ ] Redirects to `/login` (or shows login prompt)
- [ ] Cannot see dashboard content without auth

---

## 🐛 Troubleshooting Guide

### Issue: 404 Error on Google Login

**Symptoms:**
- Click "Continue with Google"
- Get 404 error page

**Debugging Steps:**
1. **Check Backend is Running:**
   ```powershell
   netstat -ano | findstr :3001
   ```
   Should show LISTENING on port 3001

2. **Check Backend Logs:**
   - Look at terminal where backend is running
   - Should see: "Server running on port 3001"

3. **Test Backend Directly:**
   - Open browser
   - Go to: http://localhost:3001/health
   - Should see: `{"status":"ok"}`

4. **Test Google OAuth Route:**
   - Go to: http://localhost:3001/api/auth/google
   - Should redirect to Google login page
   - If 404, backend routes not configured correctly

5. **Check .env File:**
   - Open `backend-v2/.env`
   - Verify: `FRONTEND_URL="http://localhost:3002"`
   - Verify: `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

6. **Restart Backend:**
   ```powershell
   # In backend-v2 directory
   cmd /c npm run dev
   ```

---

### Issue: Wrong Name Displayed

**Symptoms:**
- Dashboard shows "Alex" or "there" instead of your name

**Debugging Steps:**
1. **Check /auth/me Response:**
   - Open DevTools → Network tab
   - Refresh dashboard
   - Find `/auth/me` request
   - Check response body
   - Should include: `firstName`, `lastName`, `email`

2. **Check Backend User Model:**
   - Backend should store Google user data correctly
   - Check database `users` table
   - Verify your user record has `firstName` and `lastName`

3. **Check Console for Errors:**
   - Open DevTools → Console
   - Look for "Failed to fetch user" errors
   - Check error details

---

### Issue: Dark Theme / Unreadable Text

**Symptoms:**
- Dashboard has dark background
- Text is hard to read

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Check if latest code is deployed

---

### Issue: Infinite Loading

**Symptoms:**
- Dashboard shows "Loading..." forever
- Name never appears

**Debugging Steps:**
1. **Check Network Requests:**
   - DevTools → Network
   - Look for `/auth/me` request
   - Check if it's pending/failed

2. **Check CORS:**
   - Backend should allow `http://localhost:3002`
   - Check backend CORS configuration

3. **Check Tokens:**
   - DevTools → Application → Local Storage
   - Verify `accessToken` exists
   - Try logging out and back in

---

## 📊 Backend API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Email/password login
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/refresh` - Refresh access token

### Health Check
- `GET /health` - Server health status

---

## 🔐 Google OAuth Configuration

### Frontend URLs
- Login: `http://localhost:3002/login`
- Register: `http://localhost:3002/register`
- Callback: `http://localhost:3002/auth/callback`

### Backend URLs
- OAuth Initiate: `http://localhost:3001/api/auth/google`
- OAuth Callback: `http://localhost:3001/api/auth/google/callback`

### Google Cloud Console
- Authorized JavaScript origins: `http://localhost:3001`
- Authorized redirect URIs: `http://localhost:3001/api/auth/google/callback`

---

## ✅ Success Criteria

The application is working correctly when:

1. ✅ Landing page loads with particle background
2. ✅ Testimonials page displays all content
3. ✅ Can register with email/password
4. ✅ Can login with Google OAuth (no 404)
5. ✅ Dashboard shows YOUR real name
6. ✅ Sidebar shows YOUR initials and email
7. ✅ All text is readable (black on white)
8. ✅ Logout works correctly
9. ✅ Protected routes require authentication
10. ✅ No console errors

---

## 🎯 Priority Test

**MOST IMPORTANT TEST:**

1. Go to: http://localhost:3002/login
2. Click "Continue with Google"
3. Log in with your Google account (Smit)
4. Verify you land on dashboard
5. Verify dashboard says "Good morning, Smit"

**If this works, everything is working! 🎉**

---

## 📝 Quick Reference

### Start Servers
```powershell
# Frontend (already running)
# Running on http://localhost:3002

# Backend
cd c:\Users\Modi\ApplyWise\backend-v2
cmd /c npm run dev
# Should show: Server running on port 3001
```

### Check Server Status
```powershell
# Frontend
netstat -ano | findstr :3002

# Backend
netstat -ano | findstr :3001
```

### View Logs
- **Frontend:** Check terminal where `npm run dev` is running
- **Backend:** Check terminal where `npm run dev` is running
- **Browser:** F12 → Console tab

---

**Current Status:** ✅ All systems configured and ready for testing!

**Next Step:** Test Google OAuth login at http://localhost:3002/login
