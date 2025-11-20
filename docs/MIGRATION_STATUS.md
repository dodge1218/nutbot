# Database Migration Status

**Date:** November 19, 2025
**Status:** In Progress

## Changes
- Updated `prisma/schema.prisma` to use `postgresql` provider instead of `sqlite`.

## Next Steps
1.  **Environment Variables:** Ensure `DATABASE_URL` in `.env` (local) and Vercel Project Settings points to a valid PostgreSQL database (Supabase or Vercel Postgres).
    - *Note:* For Vercel deployment, use the connection pooling URL (port 6543).
    - *Note:* For local migrations, use the direct connection URL (port 5432).
2.  **Migration:** Run `npx prisma migrate dev --name init` locally to create the initial migration and apply it to the database.
3.  **Seeding:** Run `npx prisma db seed` to populate the database with initial data.
4.  **Verification:** Test the application to ensure data persistence works.

## Notes
- The previous SQLite database file (`dev.db` or similar) is no longer used.
- Ensure `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` are set if using Vercel Postgres, or standard `DATABASE_URL` for Supabase.
