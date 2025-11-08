# NutBot Deployment Guide

**Version:** 1.0  
**Date:** November 8, 2025  
**Status:** Production Ready  

---

## Repository & Hosting

### GitHub Repository
- **URL:** https://github.com/dodge1218/nutbot
- **Branch:** main
- **Visibility:** Public

### Vercel Deployment
- **Project:** nutbot (dodge1218s-projects)
- **Production URL:** https://nutbot-qbfqpqinx-dodge1218s-projects.vercel.app
- **Framework:** Next.js 14.2.33 (detected automatically)
- **Deployment:** Automatic on push to main branch

---

## Environment Variables (Production)

The following environment variables must be configured in Vercel dashboard:

### Required (Database)
```bash
DATABASE_URL="postgresql://user:password@host:5432/nutbot?schema=public"
```

**Note:** Current setup uses SQLite for development. For production:
1. Provision PostgreSQL database (Vercel Postgres, Supabase, or Neon recommended)
2. Update `DATABASE_URL` in Vercel environment variables
3. Run migrations: `npx prisma migrate deploy`

### Optional (Future Features)
```bash
# Affiliate Integration (v1.1+)
AMAZON_ASSOCIATES_TAG="your-tag-20"
THORNE_AFFILIATE_ID="your-id"

# Wearable Integration (v2.0+)
APPLE_HEALTH_CLIENT_ID="your-client-id"
FITBIT_CLIENT_ID="your-client-id"
FITBIT_CLIENT_SECRET="your-secret"
GOOGLE_FIT_CLIENT_ID="your-client-id"

# Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
POSTHOG_KEY="your-key"
```

---

## Build Configuration

### Next.js Config (`next.config.js`)
- **React Strict Mode:** Enabled
- **SWC Minify:** Enabled
- **Server Actions:** Enabled (native in Next.js 14)

### Warnings (Safe to Ignore)
1. **`experimental.serverActions` deprecated**: Server Actions are now default in Next.js 14
2. **PostCSS `content` field**: Tailwind-specific, doesn't affect functionality

---

## Database Setup

### Development (SQLite)
```bash
# Initialize database
npx prisma db push

# Seed with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Production (PostgreSQL)
```bash
# 1. Provision PostgreSQL database (e.g., Vercel Postgres)
# 2. Update DATABASE_URL environment variable
# 3. Generate Prisma Client
npx prisma generate

# 4. Run migrations
npx prisma migrate deploy

# 5. (Optional) Seed production database
npx prisma db seed
```

### Migration from SQLite to PostgreSQL

**Before deployment:**
1. Backup SQLite data: `npx prisma db pull`
2. Export data: Write custom script or use Prisma Studio
3. Update `schema.prisma` provider to `postgresql`
4. Generate new migration: `npx prisma migrate dev --name postgres_migration`
5. Deploy to production

---

## Deployment Process

### Automatic Deployment (Recommended)
Vercel automatically deploys on every push to `main` branch.

**Workflow:**
1. Make changes locally
2. Commit: `git commit -m "description"`
3. Push: `git push origin main`
4. Vercel builds and deploys automatically
5. Check build status: https://vercel.com/dodge1218s-projects/nutbot

### Manual Deployment (Alternative)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Build Troubleshooting

### Common TypeScript Errors

**Error:** `Type 'X' is possibly 'undefined'`
- **Cause:** TypeScript strict mode doesn't allow undefined without explicit check
- **Fix:** Use type predicates: `.filter((f): f is NonNullable<typeof f> => f !== undefined)`

**Error:** `Parameter 'x' implicitly has an 'any' type`
- **Cause:** TypeScript can't infer type from context
- **Fix:** Add explicit type annotation: `(x: any) => ...` or better, proper typing

### Build Performance
- **Average build time:** 45-60 seconds
- **Cache optimization:** Vercel caches `node_modules` and `.next` between builds
- **First build:** ~60s (no cache)
- **Subsequent builds:** ~30-40s (with cache)

---

## Monitoring & Analytics

### Vercel Analytics (Built-in)
- **Speed Insights:** Core Web Vitals tracking
- **Real User Monitoring:** Actual user performance metrics
- **Enable:** Vercel Dashboard → Project → Analytics

### Error Tracking (Future)
Consider adding:
- **Sentry:** Error monitoring and crash reporting
- **LogRocket:** Session replay for debugging user issues
- **PostHog:** Product analytics and feature flags

---

## Performance Optimization

### Current Optimizations
✅ Next.js App Router (React Server Components)
✅ SWC compiler (faster than Babel)
✅ Automatic code splitting
✅ Image optimization (Next.js Image component - ready for use)
✅ Route prefetching

### Future Optimizations (v1.2+)
- **Database Connection Pooling:** Use Prisma Accelerate or PgBouncer
- **Edge Functions:** Move read-only API routes to Edge Runtime
- **Static Generation:** Pre-render public pages (education center)
- **CDN Caching:** Cache static assets and API responses
- **Image Optimization:** Compress images, use WebP format

---

## Security Checklist

### Current Security
✅ Environment variables stored securely in Vercel
✅ `.env` files excluded from git
✅ No hardcoded secrets in codebase
✅ HTTPS enforced (automatic via Vercel)

### Production Security (Pre-Launch)
- [ ] Add rate limiting to API routes
- [ ] Implement CSRF protection for forms
- [ ] Add input validation and sanitization
- [ ] Set up Content Security Policy (CSP)
- [ ] Enable Vercel's DDoS protection
- [ ] Configure proper CORS headers
- [ ] Add authentication (NextAuth.js recommended)
- [ ] Implement database row-level security (RLS)

---

## Backup & Disaster Recovery

### Database Backups
**PostgreSQL on Vercel:**
- Automatic daily backups (retained for 30 days)
- Point-in-time recovery available

**Manual Backup:**
```bash
# Export schema and data
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20251108.sql
```

### Code Backups
- **Primary:** GitHub repository (already configured)
- **Vercel:** Keeps deployment history for 30 days
- **Recommended:** Set up automated backups to separate cloud storage

---

## Scaling Considerations

### Current Limits (Vercel Free Tier)
- **Bandwidth:** 100 GB/month
- **Serverless Function Execution:** 100 GB-hours/month
- **Builds:** Unlimited
- **Deployments:** Unlimited

### When to Upgrade (Pro Plan $20/mo)
- **Traffic:** >100K pageviews/month
- **Users:** >10K active users
- **Features Needed:**
  - Password-protected deployments
  - Advanced analytics
  - Team collaboration
  - Priority support

### Database Scaling
**Current:** SQLite (development only)
**Production:**
- **< 1K users:** Vercel Postgres Hobby (256 MB storage)
- **1K-10K users:** Vercel Postgres Pro (10 GB storage, connection pooling)
- **10K+ users:** Dedicated PostgreSQL (AWS RDS, Supabase, or Neon)

---

## CI/CD Pipeline

### Current Setup
✅ **Source Control:** GitHub
✅ **Build:** Vercel automatic builds
✅ **Deployment:** Automatic on merge to main
✅ **Preview Deployments:** Automatic for all branches

### Future Enhancements (v1.2+)
- [ ] GitHub Actions for automated testing
- [ ] Playwright/Cypress for E2E tests
- [ ] TypeScript type checking in CI
- [ ] Linting with ESLint + Prettier
- [ ] Automated security scans (Snyk)
- [ ] Lighthouse CI for performance regression

---

## Rollback Procedure

### Quick Rollback (Vercel Dashboard)
1. Go to: https://vercel.com/dodge1218s-projects/nutbot
2. Click "Deployments" tab
3. Find last working deployment
4. Click "..." → "Promote to Production"
5. Confirm rollback

**Recovery Time:** < 2 minutes

### Git-Based Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# OR revert to specific commit
git revert <commit-hash>
git push origin main
```

Vercel will automatically deploy the reverted code.

---

## Health Checks

### Application Health
**Endpoint:** `/api/health` (TODO: create in v1.1)

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-08T09:30:00Z",
  "database": "connected",
  "version": "1.0.0"
}
```

### Manual Health Checks
```bash
# Check if app is responding
curl https://nutbot-qbfqpqinx-dodge1218s-projects.vercel.app

# Check API endpoint
curl https://nutbot-qbfqpqinx-dodge1218s-projects.vercel.app/api/analyze-intake \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"foodIds": ["oats", "blueberries"]}'
```

---

## Launch Checklist

### Pre-Launch (Before Public Release)
- [ ] Configure production PostgreSQL database
- [ ] Run database migrations
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics (PostHog/GA4)
- [ ] Add authentication (NextAuth.js)
- [ ] Implement rate limiting
- [ ] Set up monitoring and alerts
- [ ] Create health check endpoint
- [ ] Test all API routes with production data
- [ ] Perform load testing (k6 or Artillery)
- [ ] Review and harden security
- [ ] Set up custom domain
- [ ] Configure email service (transactional emails)
- [ ] Create privacy policy and terms of service
- [ ] Test payment integration (if applicable)

### Post-Launch
- [ ] Monitor error rates and performance
- [ ] Set up user feedback collection
- [ ] Create support documentation
- [ ] Implement feature flags (for gradual rollouts)
- [ ] Schedule regular backups
- [ ] Plan first feature update (v1.1)

---

## Custom Domain Setup (Optional)

### Using Vercel
1. Purchase domain (Namecheap, Google Domains, etc.)
2. In Vercel Dashboard → Project → Settings → Domains
3. Add custom domain (e.g., `nutbot.app`)
4. Update DNS records:
   - **Type:** CNAME
   - **Name:** @ or www
   - **Value:** cname.vercel-dns.com
5. Wait for DNS propagation (~1-48 hours)
6. SSL certificate auto-generated by Vercel

### Recommended Domain Names
- nutbot.app
- nutbot.io
- mynutbot.com
- nutrifyx.com
- synergy-nutrition.com

---

## Support & Troubleshooting

### Common Issues

**Issue:** Build fails with "Module not found"
- **Solution:** Run `npm install` locally, commit `package-lock.json`

**Issue:** Prisma Client not generated
- **Solution:** Add `postinstall` script: `"postinstall": "prisma generate"`

**Issue:** Environment variables not working
- **Solution:** Check Vercel Dashboard → Settings → Environment Variables
- Ensure variables are set for "Production" environment

**Issue:** API routes return 500 errors
- **Solution:** Check Vercel Function Logs in Dashboard → Deployments → [Latest] → Functions

### Getting Help
- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Prisma Documentation:** https://www.prisma.io/docs
- **GitHub Issues:** https://github.com/dodge1218/nutbot/issues

---

## Cost Estimation

### Current Setup (Free Tier)
- **Vercel:** $0/month (hobby plan)
- **GitHub:** $0/month (public repo)
- **Total:** $0/month

### Production Setup (Estimated)
| Service | Tier | Cost |
|---------|------|------|
| **Vercel** | Pro | $20/month |
| **Database** | Vercel Postgres Pro | $30/month |
| **Email** | SendGrid (100K emails) | $19.95/month |
| **Error Tracking** | Sentry (10K events) | $26/month |
| **Analytics** | PostHog (1M events) | $0 (free tier) |
| **Total** | | **~$96/month** |

### At Scale (10K+ active users)
| Service | Tier | Cost |
|---------|------|------|
| **Vercel** | Enterprise | $2,500+/month |
| **Database** | Dedicated (AWS RDS) | $200-500/month |
| **Email** | SendGrid (1M emails) | $90/month |
| **Error Tracking** | Sentry (100K events) | $89/month |
| **Analytics** | PostHog (10M events) | $200/month |
| **Total** | | **~$3,000-3,500/month** |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-08 | Initial production deployment |
| | | - All core features implemented |
| | | - Dashboard, food logging, recommendations |
| | | - Educational content, settings |
| | | - API routes for analysis and suggestions |

---

**Document Owner:** Engineering Team  
**Last Updated:** November 8, 2025  
**Next Review:** Weekly during beta, monthly post-launch
