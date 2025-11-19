# URGENT: Fix Vercel Deployment Error

## Problem
Your Vercel deployment is showing a purple sad face error because the **DATABASE_URL environment variable** is not set correctly.

## Solution

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Click on your `nutbot` project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add/Update These Variables

**REQUIRED:**

```
DATABASE_URL
postgres://postgres.imfyuvqkswrhijqcrpwx:yB2zadCB5eaEmLXb@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
```

```
NEXTAUTH_SECRET
(Generate one with: openssl rand -base64 32)
Example: kJ8HfG2nM5pQ9rT3vX6wY1zB4cE7dF0a
```

```
NEXTAUTH_URL
https://nutbot.vercel.app
(Or your actual Vercel URL)
```

**OPTIONAL (for AI features):**

```
OPENAI_API_KEY
(Leave blank if you don't have one)
```

```
AI_FEATURES_ENABLED
false
```

### Step 3: Redeploy

After adding the environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

OR just push a new commit to GitHub:
```bash
git commit --allow-empty -m "trigger redeploy"
git push
```

### Step 4: Verify

Once deployed, visit your site at: https://nutbot.vercel.app

The purple error page should be gone and you should see your actual homepage.

---

## Why This Happened

- Vercel was trying to use SQLite (`file:./dev.db`)
- SQLite doesn't work in serverless environments
- The app crashed on startup → purple error page
- Setting DATABASE_URL to Supabase Postgres fixes it

## Database is Already Set Up

Your Supabase database tables are already created (you ran the SQL earlier). 
You just need to tell Vercel how to connect to it.
