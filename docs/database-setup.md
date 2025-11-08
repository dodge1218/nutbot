# Database Setup Guide

## Local Development with PostgreSQL

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (with Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Switch to postgres user (Linux/Mac)
sudo -u postgres psql

# Or connect directly
psql -U postgres

# In psql, run:
CREATE DATABASE nutbot;
CREATE USER nutbot_user WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE nutbot TO nutbot_user;
\q
```

### 3. Configure Environment

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `DATABASE_URL` in `.env`:
```
DATABASE_URL="postgresql://nutbot_user:your_password_here@localhost:5432/nutbot?schema=public"
```

### 4. Run Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data
npm run db:seed
```

### 5. Verify Setup

```bash
# Open Prisma Studio to view database
npx prisma studio
```

---

## Production Setup (Vercel Postgres)

### 1. Create Vercel Postgres Database

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Copy the `DATABASE_URL` connection string

### 2. Configure Environment Variables

In Vercel project settings → **Environment Variables**, add:
```
DATABASE_URL=<your-vercel-postgres-url>
```

### 3. Run Migrations on Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Pull environment variables
vercel env pull .env.production

# Run migrations
DATABASE_URL="$(grep DATABASE_URL .env.production | cut -d '=' -f2-)" npx prisma migrate deploy
```

Or use Vercel's built-in Prisma integration in deploy settings.

---

## Database Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Create and apply new migration
npx prisma migrate dev --name <migration_name>

# Apply migrations to production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Seed database
npm run db:seed

# Format schema file
npx prisma format
```

---

## Troubleshooting

### Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   sudo systemctl status postgresql  # Linux
   brew services list                # macOS
   ```

2. **Verify connection string format:**
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   ```

3. **Test connection:**
   ```bash
   psql -U nutbot_user -d nutbot -h localhost
   ```

### Migration Errors

1. **Reset migrations (development only):**
   ```bash
   npx prisma migrate reset
   ```

2. **Generate client after schema change:**
   ```bash
   npx prisma generate
   ```

### Vercel Deployment Issues

1. **Ensure migrations are applied:**
   - Add build command in `vercel.json` or `package.json`:
   ```json
   "build": "prisma generate && prisma migrate deploy && next build"
   ```

2. **Check connection pooling:**
   - For serverless, use connection pooling:
   ```
   DATABASE_URL="postgres://...?pgbouncer=true&connection_limit=1"
   ```
