# Vercel Environment Variables Setup

## Current Status
- ✅ NEXTAUTH_SECRET - Set in Vercel
- ✅ NEXTAUTH_URL - Set in Vercel  
- ✅ DATABASE_URL - Set in Vercel
- ⏳ Database schema - Needs to be created

## Important: Two Connection Strings for Supabase

### For Vercel (use pooled connection):
```
DATABASE_URL="postgres://postgres.imfyuvqkswrhijqcrpwx:yB2zadCB5eaEmLXb@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true"
```
✅ This is what you added to Vercel - correct!

### For Migrations (need direct connection):
Go to Supabase → Project Settings → Database → Connection String → **Direct Connection**

It should look like:
```
postgres://postgres.imfyuvqkswrhijqcrpwx:[password]@aws-1-us-east-1.compute-1.amazonaws.com:5432/postgres
```
(Notice: different port 5432, different host without "pooler")

## Solution: Let Vercel Handle It

Since we can't easily run migrations locally with connection pooling, we'll let Vercel do it on first deploy.

### Add this to package.json for Vercel:

The `postinstall` script already runs `prisma generate`, which is good.

For Vercel to create the tables automatically, we need to add a build hook or use Vercel's Prisma integration.

## Quick Fix: Deploy Without Migration First

1. The DATABASE_URL you set is correct for runtime ✅
2. Push a small change to trigger deployment
3. Vercel will try to connect but might fail on first deploy (expected)
4. Then we'll manually create the schema

Let me create the deployment trigger...
