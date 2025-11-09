# AI Features Guide

Complete documentation for NutBot's AI-powered nutrition intelligence features.

## Overview

NutBot leverages multiple AI systems to provide intelligent, personalized nutrition guidance:

1. **Food Recognition** (v1.1 - Current) - Identify foods from photos using GPT-4 Vision
2. **RAG System** (v1.1 - Planned) - Answer nutrition questions with evidence-based responses
3. **AI Chat** (v2.0 - Planned) - Conversational nutrition assistant
4. **MCP Server** (v1.2 - Planned) - Tool integration for AI agents

---

## 1. AI Food Recognition

### Features

- **Photo-based logging**: Take a photo instead of typing food names
- **Multi-item detection**: Recognize multiple foods in one image
- **Portion estimation**: AI estimates serving sizes in cups, oz, pieces, etc.
- **Confidence scoring**: See how confident the AI is (0-100%)
- **Database matching**: Automatic matching to comprehensive food database
- **Nutritional data**: Instant calorie and macro information

### How to Use

#### From the App

1. Navigate to **Log Food** page
2. Find the **AI Food Recognition** card
3. Click "Take a Photo or Upload Image"
4. Choose camera or upload from gallery
5. Wait 3-5 seconds for AI analysis
6. Review detected items and confidence scores
7. Click "Confirm & Add Items" to log

#### Mobile Camera Access

The photo upload component supports direct camera access on mobile devices:
- Opens native camera app
- Supports rear camera for better food photos
- Works on iOS Safari and Android Chrome

### API Usage

#### Endpoint

```http
POST /api/ai/recognize-food
```

#### Request Body

```json
{
  "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRg...", // Base64 image or URL
  "multipleItems": true // Optional, detect multiple foods
}
```

#### Response (Single Item)

```json
{
  "foodName": "grilled chicken breast",
  "category": "protein",
  "confidence": 92,
  "portionEstimate": {
    "amount": 4,
    "unit": "oz",
    "grams": 113
  },
  "preparation": "grilled",
  "matchedFoodId": "chicken-breast-grilled",
  "nutrients": {
    "calories": 187,
    "protein": 35,
    "carbs": 0,
    "fat": 4,
    "fiber": 0
  }
}
```

#### Response (Multiple Items)

```json
[
  {
    "foodName": "brown rice",
    "category": "grain",
    "confidence": 88,
    "portionEstimate": {
      "amount": 1,
      "unit": "cup",
      "grams": 195
    },
    "nutrients": { ... }
  },
  {
    "foodName": "steamed broccoli",
    "category": "vegetable",
    "confidence": 95,
    "portionEstimate": {
      "amount": 0.5,
      "unit": "cup",
      "grams": 78
    },
    "nutrients": { ... }
  }
]
```

### Implementation Details

#### Technology Stack

- **Model**: OpenAI GPT-4 Vision Preview
- **Cost**: ~$0.01-0.03 per image
- **Latency**: 3-5 seconds average
- **Accuracy**: 85%+ on common foods (validated by user confirmation)

#### Service Architecture

```typescript
// lib/ai/foodRecognition.ts

export async function recognizeFoodFromImage(
  imageUrl: string
): Promise<FoodRecognitionResult>

export async function recognizeMultipleFoods(
  imageUrl: string
): Promise<FoodRecognitionResult[]>

export async function matchFoodToDatabase(
  recognizedFood: FoodRecognitionResult
): Promise<FoodRecognitionResult>
```

#### Database Matching Logic

1. **Extended Database First**: Search 1000+ items with variants
   - Exact name matches
   - Common name matching (e.g., "scallions" → "green onions")
   - Preparation method matching (raw, cooked, grilled, etc.)

2. **Fallback to Base Database**: Search 100+ common items
   - Name contains search

3. **Nutrient Estimation**: If no match found
   - Use category-based defaults
   - Adjust by portion size multiplier

### Configuration

#### Environment Variables

```bash
# Required for AI food recognition
OPENAI_API_KEY=sk-...

# Optional: Rate limiting
AI_FEATURES_ENABLED=true
FREE_TIER_PHOTO_LIMIT=10 # per month
```

#### Usage Limits

**Free Tier:**
- 10 photo recognitions per month
- Single item detection only
- No batch processing

**Premium Tier:**
- Unlimited photo recognition
- Multi-item detection
- Batch processing support
- Priority processing

### Confidence Interpretation

| Confidence | Color | Meaning | Action |
|------------|-------|---------|--------|
| 80-100% | 🟢 Green | High confidence | Safe to confirm |
| 60-79% | 🟡 Yellow | Medium confidence | Review portion and name |
| 0-59% | 🟠 Orange | Low confidence | Verify carefully |

**Low confidence warnings:**
- Unusual foods or presentations
- Poor image quality
- Multiple overlapping items
- Heavily processed/prepared dishes

### Best Practices

#### Photo Quality

✅ **Good Photos:**
- Well-lit, natural lighting
- Single food item centered
- Clear view of entire item
- Standard presentation (plate, bowl)
- Medium distance (1-2 feet)

❌ **Avoid:**
- Low light or heavy shadows
- Extreme close-ups or far shots
- Blurry or out-of-focus
- Heavy filters or edits
- Food behind glass/plastic

#### Accuracy Tips

1. **Take photos before mixing**: Separate items are easier to identify
2. **Use consistent angles**: Top-down or 45-degree angle
3. **Include reference objects**: Utensils for scale
4. **Verify portions**: AI estimates are approximate
5. **Edit if needed**: You can always adjust portions after

### Error Handling

#### Common Errors

**401 Unauthorized**
```json
{ "error": "Authentication required" }
```
→ User must be logged in

**400 Invalid URL**
```json
{ "error": "Invalid image URL provided" }
```
→ Check image format (JPG, PNG, WebP)

**429 Rate Limited**
```json
{ "error": "Monthly photo limit exceeded. Upgrade to premium for unlimited." }
```
→ Free tier limit reached

**503 Service Unavailable**
```json
{ "error": "AI service temporarily unavailable" }
```
→ OpenAI API issue, retry in a few seconds

### Analytics & Monitoring

Track these metrics for AI feature success:

```typescript
// Example analytics events
analytics.track('ai_food_recognition_started', {
  source: 'camera' | 'upload',
  userTier: 'free' | 'premium'
});

analytics.track('ai_food_recognition_completed', {
  itemsDetected: number,
  averageConfidence: number,
  processingTimeMs: number,
  wasAccurate: boolean // user confirmed without edits
});

analytics.track('ai_food_recognition_edited', {
  itemsEdited: number,
  editTypes: ['name', 'portion', 'removed']
});
```

---

## 2. Nutrition Knowledge RAG System (Planned v1.1)

### Features

- Evidence-based answers from curated nutrition database
- Personalized to user's current nutrient gaps
- Source citations from research papers
- Interactive follow-up questions

### Coming Soon

Full documentation will be added after implementation.

**Planned capabilities:**
- 200+ curated nutrition articles
- Food interaction database
- Personalized recommendations
- Natural language queries

---

## 3. AI Chat Assistant (Planned v2.0)

### Features

- Real-time conversational nutrition guidance
- Access to complete user history
- Proactive pattern recognition
- Meal planning through dialogue

### Coming Soon

Full documentation will be added after implementation.

**Planned capabilities:**
- Streaming responses
- Conversation memory
- Function calling (log food, create meal plans)
- Integration with all NutBot features

---

## 4. Model Context Protocol Server (Planned v1.2)

### Features

- Extend NutBot intelligence to other AI agents
- Standardized tool interface
- Claude, ChatGPT, and custom agent support

### Coming Soon

Full documentation will be added after implementation.

**Planned tools:**
- `analyze_nutrient_intake`
- `get_food_interactions`
- `search_nutrition_knowledge`
- `optimize_meal_plan`
- `calculate_supplement_needs`

---

## Cost Management

### Current Costs (v1.1)

| Feature | Model | Cost per Use | Target |
|---------|-------|--------------|--------|
| Photo Recognition | GPT-4 Vision | $0.01-0.03 | <$0.15/user/mo |
| RAG Embeddings | text-embedding-3-small | $0.0001 | <$0.02/user/mo |
| RAG Answers | GPT-4-turbo | $0.001-0.003 | <$0.05/user/mo |

### Optimization Strategies

1. **Caching**: Store common food recognitions
2. **Rate Limiting**: Free tier limits prevent abuse
3. **Batch Processing**: Group multiple queries
4. **Model Selection**: Use cheaper models where possible
5. **Prompt Efficiency**: Minimize token usage

---

## Security & Privacy

### Data Handling

- **Images**: Not stored permanently, processed in-memory
- **Results**: Cached for 24 hours, then deleted
- **User Data**: Encrypted at rest and in transit
- **API Keys**: Stored as environment variables, never exposed

### Compliance

- GDPR compliant (right to deletion)
- HIPAA considerations (not medical device)
- CCPA compliant (California privacy)

---

## Roadmap

### Q1 2025 (v1.1) ✅ In Progress
- [x] AI Food Recognition
- [x] Photo Upload UI
- [x] Multi-item detection
- [ ] RAG Knowledge System
- [ ] Basic chat queries

### Q2 2025 (v1.2)
- [ ] MCP Server
- [ ] Advanced RAG features
- [ ] Supplement recommendations
- [ ] Meal optimization AI

### Q3-Q4 2025 (v2.0)
- [ ] Full AI Chat Assistant
- [ ] Conversation memory
- [ ] Proactive insights
- [ ] Advanced analytics

### 2026 (v2.1)
- [ ] Custom AI models
- [ ] Offline mode
- [ ] Voice interactions
- [ ] AR food scanning

---

## Support

### Troubleshooting

**Photo recognition not working?**
1. Check internet connection
2. Verify OPENAI_API_KEY is set
3. Check free tier limit (10/month)
4. Try different photo angle/lighting

**Low confidence scores?**
1. Improve photo quality
2. Simplify food presentation
3. Try photographing items separately
4. Add manual details after recognition

### Contact

- Bug reports: GitHub Issues
- Feature requests: GitHub Discussions
- Email: support@nutbot.app
- Documentation: /docs/ai-features-guide.md

---

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Adding new AI features
- Improving recognition accuracy
- Training custom models
- Testing guidelines
