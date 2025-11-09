# Vercel Deployment Fix Guide

## Issue: Build Failed / Cannot Redeploy

### ✅ Fixes Applied

1. **Fixed `next.config.js`**
   - Removed deprecated `experimental.serverActions: true`
   - Added `output: 'standalone'` for optimal Vercel deployment
   - ✅ Build now passes without warnings

2. **Updated `.env.example`**
   - Added all required environment variables
   - Included AI features configuration
   - Clear instructions for production setup

3. **Created `vercel.json`**
   - Proper build configuration for Vercel
   - Environment variable definitions

---

## Required Steps for Vercel Deployment

### Step 1: Set Up Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

#### REQUIRED (Minimum for app to work):

```bash
DATABASE_URL
# Use Vercel Postgres or external Postgres
# Example: postgres://default:xxxxx@xxxxx.postgres.vercel-storage.com/verceldb?sslmode=require

NEXTAUTH_SECRET
# Generate with: openssl rand -base64 32
# Example: rJ8K2m9Xp4vN7qL3wE5tY8uI6oP1aS2dF4gH7jK9lM

NEXTAUTH_URL
# Your Vercel deployment URL
# Example: https://nutbot-kgaspfo5q-dodge1218s-projects.vercel.app
```

#### OPTIONAL (For full features):

```bash
OPENAI_API_KEY
# Only if you want AI food recognition
# Get from: https://platform.openai.com/api-keys

AI_FEATURES_ENABLED=true
FREE_TIER_PHOTO_LIMIT=10

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
# Only if you want Google OAuth login
```

---

### Step 2: Set Up Database

**Option A: Vercel Postgres (Recommended)**
1. In Vercel dashboard, go to **Storage** tab
2. Click **Create Database** → **Postgres**
3. Copy the connection string
4. Paste it as `DATABASE_URL` environment variable
5. Run migrations:
   ```bash
   # In your local terminal
   npx prisma migrate deploy
   ```

**Option B: External Postgres (Supabase, Railway, etc.)**
1. Create a Postgres database on your preferred provider
2. Copy the connection string
3. Add it as `DATABASE_URL` in Vercel environment variables

**⚠️ Important:** SQLite (`file:./dev.db`) will NOT work on Vercel (serverless environment)

---

### Step 3: Redeploy

1. **Clear Vercel Cache:**
   - Go to your Vercel project
   - Click **Deployments** tab
   - Find latest deployment
   - Click **"..."** menu → **Redeploy**
   - ✅ Check **"Clear Build Cache"**

2. **Or Push to GitHub:**
   ```bash
   git add -A
   git commit -m "fix: Update config for Vercel deployment"
   git push origin main
   ```
   Vercel will auto-deploy

---

### Step 4: Verify Deployment

After deployment, check:

1. **Build Logs:** Look for errors in Vercel deployment logs
2. **Function Logs:** Check for runtime errors
3. **Environment:** Verify all env vars are set correctly

Visit your deployed site and test:
- [ ] Homepage loads with styling
- [ ] Can navigate between pages
- [ ] Login/signup works (requires DATABASE_URL)
- [ ] Dashboard shows (requires auth)
- [ ] Log food works

---

## Common Errors & Fixes

### Error: "Cannot find module '@/lib/auth'"
**Fix:** Already fixed - file exists at `lib/auth.ts`

### Error: "DATABASE_URL not set"
**Fix:** Add DATABASE_URL to Vercel environment variables (see Step 1)

### Error: "NEXTAUTH_SECRET not set"
**Fix:** Generate and add to Vercel:
```bash
openssl rand -base64 32
```

### Error: "Build failed - type errors"
**Fix:** Already fixed - build passes locally

### Error: "Prisma client not generated"
**Fix:** Add to `package.json` (already present):
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Error: "Cannot write to database"
**Fix:** Use Postgres instead of SQLite for Vercel

### Error: "Module not found: Can't resolve 'openai'"
**Fix:** Already installed - `npm install openai` ✅

---

## Vercel-Specific Issues

### Issue: "This deployment contains invalid file paths"
**Fix:** Check for:
- Files with special characters in names
- Very long file paths
- Symbolic links

### Issue: "Build exceeds maximum duration"
**Fix:** 
- Clear build cache
- Check for infinite loops in build scripts
- Ensure dependencies are properly cached

### Issue: "Function size exceeds limit"
**Fix:**
- Enable `output: 'standalone'` in next.config.js ✅ (already done)
- Split large API routes

---

## Database Migration on Vercel

After setting up Postgres on Vercel:

```bash
# Local terminal
npx prisma migrate deploy

# Or create a script in package.json
"scripts": {
  "vercel-build": "prisma generate && prisma migrate deploy && next build"
}
```

Then in Vercel:
- Settings → General → Build & Development Settings
- Build Command: `npm run vercel-build`

---

## Testing Checklist

Before marking deployment as successful:

### Build Phase
- [x] `npm run build` passes locally
- [x] No TypeScript errors
- [x] No deprecated warnings
- [ ] All environment variables set in Vercel

### Deploy Phase
- [ ] Vercel build succeeds
- [ ] No deployment errors in logs
- [ ] Function deployment succeeds

### Runtime Phase
- [ ] Homepage loads correctly
- [ ] CSS/Tailwind styles apply
- [ ] Images load
- [ ] Navigation works
- [ ] Auth pages accessible
- [ ] Dashboard works (after login)
- [ ] API routes respond

---

## Next Steps After Successful Deployment

1. **Test all features** on the live site
2. **Monitor function logs** for any runtime errors
3. **Check performance** with Vercel Analytics
4. **Set up custom domain** (optional)
5. **Enable AI features** by adding OPENAI_API_KEY
6. **Test mobile responsiveness**

---

## Quick Deploy Now

```bash
# Commit fixes
git add -A
git commit -m "fix: Vercel deployment configuration"
git push origin main

# Vercel will auto-deploy
# Check: https://vercel.com/dashboard
```

---

## Support

If deployment still fails:
1. Check Vercel deployment logs in dashboard
2. Look for specific error messages
3. Check function logs for runtime errors
4. Verify all environment variables are set
5. Try redeploying with cache cleared

**Most Common Fix:** Add DATABASE_URL and NEXTAUTH_SECRET to Vercel environment variables!
