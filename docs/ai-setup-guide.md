# AI Features Setup Guide

Quick start guide for setting up NutBot's AI capabilities.

## Prerequisites

- Node.js 18+ installed
- Next.js 14 project
- OpenAI API account
- Vercel or similar hosting (optional)

---

## 1. Get OpenAI API Key

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-...`)

**Important:** Store this key securely, you can only view it once!

---

## 2. Configure Environment Variables

### Local Development

Create or update `.env.local`:

```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-...your_key_here

# Optional: Feature Flags
AI_FEATURES_ENABLED=true
FREE_TIER_PHOTO_LIMIT=10

# Database (required for user auth)
DATABASE_URL=postgresql://...

# NextAuth (required for authentication)
NEXTAUTH_SECRET=...your_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Production (Vercel)

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `OPENAI_API_KEY` = your OpenAI key
   - `AI_FEATURES_ENABLED` = `true`
   - All other existing env vars (database, auth, etc.)

---

## 3. Install Dependencies

```bash
npm install openai
```

Verify in `package.json`:
```json
{
  "dependencies": {
    "openai": "^4.0.0"
  }
}
```

---

## 4. Test AI Features

### Build Check

```bash
npm run build
```

Should complete successfully with no errors in AI files.

### Local Development

```bash
npm run dev
```

Open http://localhost:3000/log-food and look for the **AI Food Recognition** card.

### Test Photo Recognition

1. Navigate to `/log-food`
2. Click "Take a Photo or Upload Image"
3. Upload a test food photo
4. Verify:
   - ✅ Loading state appears
   - ✅ Results return within 5 seconds
   - ✅ Confidence score shown
   - ✅ Portion estimate displayed
   - ✅ Can confirm and add items

---

## 5. Monitor Usage & Costs

### OpenAI Dashboard

Track costs at [platform.openai.com/usage](https://platform.openai.com/usage)

**Expected costs:**
- GPT-4 Vision: $0.01-0.03 per image
- Target: <$0.15 per user per month

### Set Spending Limits

1. Go to **Settings** → **Limits**
2. Set monthly budget (e.g., $50)
3. Set up email alerts at 50%, 75%, 90%

---

## 6. Verify File Structure

Ensure these files exist:

```
nutbot/
├── lib/
│   └── ai/
│       └── foodRecognition.ts     ✅ AI service
├── app/
│   └── api/
│       └── ai/
│           └── recognize-food/
│               └── route.ts        ✅ API endpoint
├── components/
│   └── FoodPhotoUpload.tsx        ✅ UI component
├── app/(site)/
│   └── log-food/
│       └── page.tsx               ✅ Integration
└── docs/
    └── ai-features-guide.md        ✅ Documentation
```

---

## 7. Common Issues & Solutions

### Error: "Missing credentials"

**Problem:** OPENAI_API_KEY not found

**Solutions:**
1. Check `.env.local` has correct key
2. Restart dev server: `npm run dev`
3. Verify no typos in variable name
4. For production, check Vercel env vars

### Error: "Rate limit exceeded"

**Problem:** OpenAI rate limits hit

**Solutions:**
1. Wait 1 minute and retry
2. Upgrade OpenAI account tier
3. Implement request caching
4. Add exponential backoff

### Error: "Authentication required"

**Problem:** User not logged in

**Solutions:**
1. Verify NextAuth configured correctly
2. Check session middleware
3. Test login flow first
4. Check `authOptions` in API route

### Low Recognition Accuracy

**Problem:** AI frequently misidentifies foods

**Solutions:**
1. Improve photo quality guidelines
2. Add more examples to database
3. Tune confidence thresholds
4. Use multi-item detection sparingly

---

## 8. Performance Optimization

### Caching Strategy

Add Redis or in-memory cache for common foods:

```typescript
// lib/cache.ts
const cache = new Map<string, FoodRecognitionResult>();

export function getCachedRecognition(imageHash: string) {
  return cache.get(imageHash);
}

export function setCachedRecognition(
  imageHash: string,
  result: FoodRecognitionResult
) {
  cache.set(imageHash, result);
  setTimeout(() => cache.delete(imageHash), 24 * 60 * 60 * 1000); // 24h
}
```

### Image Optimization

Resize images before sending to API:

```typescript
// Resize to max 800x800 before uploading
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      const maxSize = 800;
      let width = img.width;
      let height = img.height;
      
      if (width > height && width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      } else if (height > maxSize) {
        width *= maxSize / height;
        height = maxSize;
      }
      
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.8));
    };
    img.src = URL.createObjectURL(file);
  });
}
```

---

## 9. Database Schema

Add AI tracking fields to your database:

```sql
-- Add to existing foods table or logs table
ALTER TABLE food_logs ADD COLUMN ai_recognized BOOLEAN DEFAULT FALSE;
ALTER TABLE food_logs ADD COLUMN ai_confidence INTEGER; -- 0-100
ALTER TABLE food_logs ADD COLUMN ai_raw_result JSONB;

-- Track AI usage for billing
CREATE TABLE ai_usage (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  feature VARCHAR(50), -- 'food_recognition', 'rag_query', 'chat'
  cost_usd DECIMAL(10, 6),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for monthly cost queries
CREATE INDEX idx_ai_usage_user_month ON ai_usage(user_id, DATE_TRUNC('month', created_at));
```

---

## 10. Testing Checklist

Before going to production:

- [ ] OpenAI API key working in production
- [ ] Photo upload works on mobile (iOS Safari, Android Chrome)
- [ ] Camera permission prompt appears correctly
- [ ] Results return within 5 seconds
- [ ] Confidence scores display accurately
- [ ] Database matching finds correct foods
- [ ] Error messages are user-friendly
- [ ] Free tier limits enforced
- [ ] Cost monitoring alerts configured
- [ ] Analytics tracking events fire
- [ ] Performance acceptable (Lighthouse score)

---

## 11. Launch Checklist

### Pre-Launch

- [ ] Set OpenAI spending limit ($50/month)
- [ ] Configure rate limiting (10 requests/minute per user)
- [ ] Add user messaging about free tier limits
- [ ] Test with 10+ different food photos
- [ ] Verify mobile camera works on real devices
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Add analytics for AI feature usage

### Post-Launch

- [ ] Monitor OpenAI costs daily for first week
- [ ] Track accuracy via user confirmations
- [ ] Collect user feedback
- [ ] Adjust confidence thresholds based on data
- [ ] Expand food database based on mismatches

---

## 12. Upgrade Path

### From Basic to Full AI Stack

**Current (v1.1):**
```
✅ Food Recognition
⏳ RAG System
⏳ AI Chat
⏳ MCP Server
```

**Next Steps:**
1. Implement RAG System (see docs/PRD.md section 5.8)
2. Add vector database (Pinecone)
3. Build knowledge base (200+ articles)
4. Create AI chat interface
5. Deploy MCP server

---

## Resources

- [OpenAI Vision API Docs](https://platform.openai.com/docs/guides/vision)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [AI Features Guide](./ai-features-guide.md)
- [PRD with Roadmap](./PRD.md)

---

## Support

**Issues?**
- Check [Troubleshooting](#7-common-issues--solutions)
- GitHub Issues: [Create Issue](https://github.com/yourusername/nutbot/issues)
- Email: support@nutbot.app

**Want to contribute?**
See [CONTRIBUTING.md](../CONTRIBUTING.md)
