-- NutBot Database Schema for Supabase
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard → SQL Editor → New Query

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT UNIQUE,
    "name" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "age" INTEGER,
    "sex" TEXT,
    "weight" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "activityLevel" TEXT DEFAULT 'moderate',
    "dietaryPattern" TEXT,
    "showSupplements" BOOLEAN NOT NULL DEFAULT false,
    "wearablesConnected" BOOLEAN NOT NULL DEFAULT false
);

-- Create Account table (for NextAuth)
CREATE TABLE IF NOT EXISTS "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Account_provider_providerAccountId_key" UNIQUE ("provider", "providerAccountId")
);

-- Create Session table (for NextAuth)
CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL UNIQUE,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create VerificationToken table (for NextAuth)
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "VerificationToken_identifier_token_key" UNIQUE ("identifier", "token")
);

-- Create UserSettings table
CREATE TABLE IF NOT EXISTS "UserSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL UNIQUE,
    "calorieTarget" INTEGER,
    "proteinTarget" DOUBLE PRECISION,
    "carbTarget" DOUBLE PRECISION,
    "fatTarget" DOUBLE PRECISION,
    "fiberTarget" DOUBLE PRECISION,
    "dailyReminder" BOOLEAN NOT NULL DEFAULT true,
    "reminderTime" TEXT DEFAULT '20:00',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create FoodEntry table
CREATE TABLE IF NOT EXISTS "FoodEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "foodId" TEXT,
    "quantity" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "unit" TEXT NOT NULL DEFAULT 'serving',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mealType" TEXT,
    "calories" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "fiber" DOUBLE PRECISION,
    "vitaminC" DOUBLE PRECISION,
    "vitaminD" DOUBLE PRECISION,
    "vitaminA" DOUBLE PRECISION,
    "vitaminE" DOUBLE PRECISION,
    "vitaminK" DOUBLE PRECISION,
    "vitaminB6" DOUBLE PRECISION,
    "vitaminB12" DOUBLE PRECISION,
    "folate" DOUBLE PRECISION,
    "thiamin" DOUBLE PRECISION,
    "riboflavin" DOUBLE PRECISION,
    "niacin" DOUBLE PRECISION,
    "calcium" DOUBLE PRECISION,
    "iron" DOUBLE PRECISION,
    "magnesium" DOUBLE PRECISION,
    "potassium" DOUBLE PRECISION,
    "sodium" DOUBLE PRECISION,
    "zinc" DOUBLE PRECISION,
    "selenium" DOUBLE PRECISION,
    "isFermented" BOOLEAN NOT NULL DEFAULT false,
    "isHighFiber" BOOLEAN NOT NULL DEFAULT false,
    "isPolyphenolRich" BOOLEAN NOT NULL DEFAULT false,
    "isUltraProcessed" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create EducationalContent table
CREATE TABLE IF NOT EXISTS "EducationalContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'beginner',
    "category" TEXT NOT NULL,
    "nutrientTags" TEXT NOT NULL,
    "imageUrl" TEXT,
    "readTime" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create AffiliateProduct table
CREATE TABLE IF NOT EXISTS "AffiliateProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sku" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "fillsNutrients" TEXT NOT NULL,
    "affiliateLink" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "imageUrl" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 100,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "FoodEntry_userId_timestamp_idx" ON "FoodEntry"("userId", "timestamp");
CREATE INDEX IF NOT EXISTS "EducationalContent_category_published_idx" ON "EducationalContent"("category", "published");
CREATE INDEX IF NOT EXISTS "AffiliateProduct_category_active_idx" ON "AffiliateProduct"("category", "active");

-- Create function to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating updatedAt
DROP TRIGGER IF EXISTS update_user_updated_at ON "User";
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_usersettings_updated_at ON "UserSettings";
CREATE TRIGGER update_usersettings_updated_at BEFORE UPDATE ON "UserSettings" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_foodentry_updated_at ON "FoodEntry";
CREATE TRIGGER update_foodentry_updated_at BEFORE UPDATE ON "FoodEntry" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_educationalcontent_updated_at ON "EducationalContent";
CREATE TRIGGER update_educationalcontent_updated_at BEFORE UPDATE ON "EducationalContent" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_affiliateproduct_updated_at ON "AffiliateProduct";
CREATE TRIGGER update_affiliateproduct_updated_at BEFORE UPDATE ON "AffiliateProduct" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'NutBot database schema created successfully! ✅' AS status;
