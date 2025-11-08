# NutBot - Smart Nutrition Tracking with Gut Health Focus

**Version:** 1.0.0  
**Status:** ✅ Deployed to Production  
**Live Demo:** https://nutbot-kgaspfo5q-dodge1218s-projects.vercel.app  
**Repository:** https://github.com/dodge1218/nutbot

A modern, friction-free nutrition tracking app that helps users identify nutrient gaps, optimize meal timing, and support gut health through data-driven insights.

## ⚠️ Legal Disclaimer

**This application is for informational and educational purposes only. This is not medical advice. This does not diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare professional before making dietary changes, especially if you have medical conditions or take medications.**

## Features

- **Low-Friction Food Logging**: Quick entry with presets, "usual meals," and simple text input
- **Comprehensive Nutrient Analysis**: Macros, micros, vitamins, minerals, electrolytes, and fiber
- **Gut Health Score**: Track fermented foods, fiber, plant diversity, and ultra-processed burden
- **Smart Recommendations**: Food swaps, meal timing, synergy/anti-synergy warnings
- **Gap Detection**: See exactly which nutrients you're missing and how to fix them
- **Educational Content**: Learn about nutrient absorption, timing, and gut health
- **Affiliate Product Suggestions**: Optional supplement/product recommendations for detected gaps
- **Wearable Integration Ready**: Stubbed endpoints for Apple Health, Fitbit, etc. (v2)

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM (easily swappable to Postgres)
- **Deployment**: Vercel-ready
- **Charts**: Recharts for nutrient visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nutbot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration (defaults work for local development).

4. Initialize the database:
```bash
npx prisma migrate dev --name init
npx prisma db seed  # Optional: seed with sample data
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /(site)
    /dashboard           # Main dashboard with daily summary
    /log-food            # Food logging interface
    /recommendations     # Personalized gap fixes and suggestions
    /education           # Educational content cards
    /settings            # User profile and preferences
  /api                   # API routes
/components              # Shared UI components
/lib                     # Core nutrition engine and utilities
/data                    # Food database and constants
/prisma                  # Database schema and migrations
/docs                    # Product and business documentation
```

## Key Files

- **`/lib/nutritionEngine.ts`**: Core analysis logic, gap detection, synergy calculations
- **`/lib/dailyValues.ts`**: Reference daily values for all nutrients
- **`/lib/affiliate.ts`**: Product matching and affiliate integration
- **`/data/foods.ts`**: Comprehensive food database with nutrient profiles
- **`/components/LegalDisclaimer.tsx`**: Reusable legal disclaimer banner

## Database Management

```bash
# View database in Prisma Studio
npm run db:studio

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Push schema changes without migration
npm run db:push
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. For production, consider upgrading to Postgres (Vercel Postgres, Supabase, etc.)
5. Update `DATABASE_URL` in Vercel environment variables

### Database for Production

The default SQLite setup is great for development but not suitable for serverless production. For Vercel deployment:

1. Set up a Postgres database (Vercel Postgres, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in your `.env` or Vercel environment variables
3. Update `prisma/schema.prisma` provider from `sqlite` to `postgresql`
4. Run migrations: `npx prisma migrate deploy`

## Environment Variables

See `.env.example` for all available configuration options.

Required for production:
- `DATABASE_URL`: Your database connection string
- `NEXT_PUBLIC_APP_URL`: Your production URL

Optional:
- `AFFILIATE_KEY`: For affiliate product integration
- Wearable integration credentials (future feature)

## Documentation

Comprehensive documentation is available in the `/docs` folder:

- **PRD.md**: Product Requirements Document (11 sections, full specifications)
- **business-plan.md**: Business model, market analysis, and financial projections
- **feature-enhancements.md**: Future feature roadmap with detailed specifications
- **deployment-guide.md**: Complete DevOps and deployment instructions
- **task-list.md**: Development tasks and sprint planning
- **legal-disclaimer.md**: Legal compliance and medical disclaimers
- **integration-plan.md**: Wearable and biometric integration architecture
- **content-model.md**: Educational content structure and SEO strategy

## Development Workflow

1. Make code changes
2. Test locally with `npm run dev`
3. Check database with `npm run db:studio`
4. Commit and push to GitHub
5. Vercel auto-deploys (if connected)

## Roadmap

### MVP (Current)
- ✅ Food logging with minimal friction
- ✅ Daily nutrient analysis
- ✅ Gap detection and recommendations
- ✅ Gut health score
- ✅ Synergy/anti-synergy warnings
- ✅ Legal compliance

### v1.1 (Next)
- 🔲 Affiliate product integration
- 🔲 Recipe suggestions based on gaps
- 🔲 Meal planning tools
- 🔲 Weekly trend analysis

### v2.0 (Future)
- 🔲 Apple Health / Fitbit integration
- 🔲 Auto-logging from photos
- 🔲 Advanced biometric correlation
- 🔲 Personalized timing optimization

## Contributing

This is a market-ready product. For feature requests or bug reports, please open an issue.

## License

Proprietary - All rights reserved

## Support

For questions or support, please open an issue on GitHub.

---

## 🚀 Deployment Status

✅ **Production URL:** https://nutbot-kgaspfo5q-dodge1218s-projects.vercel.app  
✅ **GitHub Repository:** https://github.com/dodge1218/nutbot  
✅ **CI/CD:** Automatic deployment on push to main branch  
✅ **Platform:** Vercel (Next.js optimized)  
✅ **Database:** PostgreSQL (production) / SQLite (development)  
✅ **Status:** All systems operational  

**Latest Deployment:** November 8, 2025

---

**Remember**: This app is for informational purposes only and does not replace professional medical or nutritional advice.
