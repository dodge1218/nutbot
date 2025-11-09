# Product Requirements Document (PRD)

## NutBot - Smart Nutrition Tracking with Gut Health Focus

**Version:** 1.0  
**Last Updated:** November 8, 2024  
**Document Owner:** Product Team

---

## 1. Executive Summary

NutBot is a modern nutrition tracking application that helps users identify and close nutrient gaps through low-friction food logging, intelligent analysis, and actionable recommendations. Unlike traditional calorie trackers, NutBot focuses on nutrient density, gut health optimization, and practical food-based solutions.

**Vision:** Make comprehensive nutritional analysis accessible, actionable, and stress-free.

**Mission:** Help people understand and optimize their diet through data-driven insights without overwhelming them with complexity.

---

## 2. Problem Statement

### User Pain Points

1. **Existing nutrition apps are tedious** — logging food feels like homework, leading to abandonment
2. **Macro tracking misses the full picture** — users hit protein goals but miss critical micronutrients
3. **Generic advice is not actionable** — "eat healthier" doesn't explain *what* is missing or *why*
4. **Gut health is overlooked** — most trackers ignore fiber quality, fermented foods, and microbiome support
5. **Timing and synergies are ignored** — iron with coffee, calcium with iron, etc.
6. **No clear path from data to action** — apps show deficits but don't suggest practical fixes

### Market Opportunity

- **Wellness market:** $4.5 trillion globally
- **Nutrition apps:** 130M+ downloads but low retention (avg 7-day: 20%)
- **Gut health interest:** 300%+ growth in search volume (2020-2024)
- **Supplement market:** $140B+ globally (2023), users seeking guidance

---

## 3. Target Users

### Primary Personas

#### 1. **The Busy Professional (35% of users)**
- Age: 25-45
- Goals: Energy optimization, prevent burnout
- Pain: No time for complex tracking
- Needs: Quick logging, "what am I missing today?"

#### 2. **The Fitness-Minded User (30% of users)**
- Age: 20-40
- Goals: Performance, recovery, body composition
- Pain: Hitting macros but feeling off
- Needs: Micronutrient tracking, timing optimization

#### 3. **The Gut-Sensitive User (20% of users)**
- Age: 25-55
- Goals: Digestive health, reduce bloating, food sensitivities
- Pain: Not sure what supports gut health
- Needs: Fiber tracking, fermented food suggestions, elimination support

#### 4. **The "Optimize Everything" User (15% of users)**
- Age: 30-50
- Goals: Longevity, biomarker optimization
- Pain: Wants deep insights, willing to pay
- Needs: Wearable integration, advanced analytics, supplement stack optimization

---

## 4. Goals & Non-Goals

### Goals

**MVP (Current - v1.0)**
- ✅ Low-friction food logging (< 30 seconds per meal)
- ✅ Comprehensive nutrient analysis (macros + 15+ micros)
- ✅ Gut health score and recommendations
- ✅ Synergy/anti-synergy detection
- ✅ Food-first recommendations
- ✅ Legal compliance (disclaimers, not medical advice)
- ✅ Vercel-deployable, mobile-responsive

**v1.1 (Q1 2025 - In Progress)**
- ✅ User authentication and data persistence
- ✅ Comprehensive food database (1000+ items with brand variants)
- ✅ AI-powered food recognition (GPT-4 Vision)
- 🔄 Affiliate product integration (supplements matched to gaps)
- 🔄 Recipe suggestions based on detected gaps
- 🔄 Weekly trend analysis and insights
- 🔄 Meal planning tools
- 🔄 RAG system for nutrition knowledge base

**v1.2 (Q2 2025)**
- Food interaction database (synergies & conflicts)
- Model Context Protocol (MCP) server for nutrition tools
- AI-powered meal optimization
- Barcode scanning for packaged foods
- Custom dietary pattern profiles (keto, paleo, vegan, etc.)
- Nutrient timing recommendations
- Export reports (PDF, CSV)

**v2.0 (Q3-Q4 2025)**
- Apple Health / Fitbit integration
- Activity-based calorie adjustments
- Personalized meal timing (based on activity, sleep)
- Real-time nutritional AI chat assistant
- Advanced gut microbiome insights
- Blood biomarker tracking integration
- Continuous glucose monitor (CGM) integration
- Social features (optional): meal sharing, challenges
- Progressive web app (PWA) for offline use

**v2.1 (2026)**
- Multi-user household tracking
- Grocery list generation from meal plans
- Restaurant menu analysis and recommendations
- Personalized supplement stack builder
- Integration with health coaches/nutritionists
- White-label API for B2B (gyms, clinics)
- Mobile apps (iOS & Android native)

### Non-Goals (for MVP and v1.x)

❌ Medical diagnosis or treatment (always labeled "for informational purposes")  
❌ Direct blood test analysis (may integrate with third-party in v2.0+)  
❌ Compete with registered dietitians (we complement, not replace)  
❌ Social media-style feed or community (defer to v2.0+ if user demand exists)  
❌ Prescription or medical-grade device integration (consumer wellness only)  
❌ Children/adolescent tracking (focus on adults 18+ for liability)  
❌ Disease-specific diet plans (diabetes, CKD, etc. — too medical for MVP)  
❌ Food delivery service integration (focus on data insights, not logistics)  
❌ Replacement for registered dietitian or doctor  
❌ Disease management (diabetes, celiac, etc.) — refer to professionals  
❌ Social features (community, sharing) — focus on individual insights  
❌ Calorie restriction focus — emphasize nutrient density  

---

---

## 5. AI & Advanced Features Roadmap

### Phase 1: Foundation AI (v1.1 - Q1 2025) 🔄

**AI-Powered Food Recognition**
- Use GPT-4 Vision to identify foods from photos
- Estimate portion sizes automatically
- Detect ingredients in prepared meals
- Match to comprehensive food database (1000+ items)
- Confidence scoring and manual override option
- **User benefit:** Log meals in seconds by snapping a photo

**Nutrition Knowledge RAG System**
- Vector database with 200+ curated nutrition articles
- Semantic search for food interactions and synergies
- Evidence-based recommendations with source citations
- **User benefit:** Get instant answers to nutrition questions with scientific backing

### Phase 2: Intelligent Optimization (v1.2 - Q2 2025)

**Model Context Protocol (MCP) Server**
- Suite of nutrition tools accessible to AI agents:
  - Nutrient gap analysis
  - Food interaction checker  
  - Meal plan optimizer
  - Recipe nutritional calculator
  - Supplement recommendation generator
- **User benefit:** Integrate NutBot intelligence into other AI tools (Claude, ChatGPT)

**AI Meal Planner**
- Generate personalized meal plans based on:
  - Current nutrient gaps
  - Dietary restrictions
  - Food preferences/allergies
  - Budget constraints
  - Available cooking time
- **User benefit:** Stop guessing what to eat — get data-driven meal suggestions

**Smart Food Interactions**
- Database of 500+ nutrient interactions (synergies & conflicts)
- Real-time warnings when logging conflicting foods
- Timing recommendations (e.g., "Take iron supplement 2 hours after coffee")
- **User benefit:** Maximize nutrient absorption automatically

### Phase 3: Conversational AI (v2.0 - Q3 2025)

**Real-Time Nutrition AI Chat**
- Chat interface connected to:
  - Personal nutrition data
  - Food database
  - Nutrition knowledge base
  - Scientific literature
- Natural language queries:
  - "Why am I low on magnesium?"
  - "What should I eat for dinner to hit my iron goal?"
  - "Is it okay to take calcium with my iron supplement?"
- **User benefit:** Get personalized nutrition coaching without scheduling appointments

**Predictive Analytics**
- Predict nutrient deficiencies before they occur
- Suggest preventative dietary changes
- Identify patterns in gut health scores
- **User benefit:** Proactive health optimization vs. reactive fixes

### Phase 4: Integrations & Ecosystem (v2.0-2.1)

**Wearable Device Integration**
- Apple Health, Fitbit, Garmin, WHOOP
- Activity-adjusted calorie needs
- Sleep quality correlation with nutrition
- HRV-based recovery recommendations

**Blood Biomarker Integration**
- Import results from InsideTracker, Function Health, etc.
- Match dietary recommendations to lab values
- Track nutrient status trends over time
- **User benefit:** Close the loop between diet and measurable health outcomes

**Continuous Glucose Monitor (CGM) Integration**
- Correlate blood sugar responses with specific foods
- Personalized glycemic index
- Meal timing optimization based on glucose patterns
- **User benefit:** Precision nutrition based on individual metabolic response

---

## 6. Feature Specifications (Updated)

### 6.1 Core Features (MVP - Completed ✅)

### 5.1 Food Logging

**Priority:** P0 (Critical)

**User Stories:**
- As a user, I want to log a meal in under 30 seconds
- As a user, I want to select common meals I eat regularly
- As a user, I want to search for foods by name
- As a user, I want to see what I logged today

**Acceptance Criteria:**
- Search returns results in < 500ms
- Common meal presets load entire meal in 1 tap
- Food database includes 50+ common foods with full nutrient profiles
- All logged items show timestamp for timing analysis

**Technical Requirements:**
- In-memory food database for MVP (migrate to DB in v1.1)
- Support "I ate what I usually eat" button
- Track gut health markers (fermented, fiber-rich, ultra-processed)

---

### 5.2 Nutrient Analysis Engine

**Priority:** P0 (Critical)

**User Stories:**
- As a user, I want to see % of daily value for all nutrients
- As a user, I want to know which nutrients I'm missing
- As a user, I want color-coded feedback (red/yellow/green)

**Acceptance Criteria:**
- Compare against sex/age/activity-adjusted daily values
- Highlight deficits < 80% DV and surpluses > 120% DV
- Analysis completes in < 100ms for typical day (10-15 foods)

**Nutrients Tracked:**
- **Macros:** protein, carbs, fat, fiber
- **Vitamins:** A, C, D, E, K, B-complex (B1, B2, B3, B6, B12, folate)
- **Minerals:** calcium, iron, magnesium, potassium, sodium, zinc, selenium
- **Other:** omega-3 (future)

---

### 5.3 Gut Health Score

**Priority:** P0 (Critical)

**User Stories:**
- As a user, I want a simple score (0-100) for gut health
- As a user, I want to understand what improves my score
- As a user, I want specific food suggestions

**Scoring Formula:**
```
Score = min(100, 
  (fiber_grams / 30 * 40) +
  (fermented_foods_count * 10, max 20) +
  (plant_diversity * 3, max 30) -
  (ultra_processed_count * 5, max 10)
)
```

**Display:**
- 0-39: Red, "Needs Improvement"
- 40-59: Orange, "Fair"
- 60-74: Yellow, "Good"
- 75-100: Green, "Excellent"

---

### 5.4 Synergy & Anti-Synergy Detection

**Priority:** P1 (High)

**User Stories:**
- As a user, I want to know if my iron absorption is being blocked
- As a user, I want timing suggestions (when to take supplements)
- As a user, I want to maximize nutrient absorption

**Rules to Implement:**

**Synergies (boost absorption):**
- Iron + Vitamin C → increase non-heme iron absorption 300%
- Calcium + Vitamin D → improve calcium absorption
- Vitamin D + Magnesium → vitamin D activation
- Fat-soluble vitamins (A, D, E, K) + healthy fats

**Anti-Synergies (reduce absorption):**
- Iron + Calcium → compete for absorption pathways
- Iron + Coffee/Tea (tannins) → reduce iron absorption 50-60%
- Calcium + High-fiber meal → may reduce calcium absorption

**Display:**
- Green badge: "Synergy detected"
- Yellow/orange badge: "Consider timing adjustment"
- Include actionable suggestion ("add bell pepper to this meal")

---

### 5.5 Recommendations System

**Priority:** P0 (Critical)

**Hierarchy (always food-first):**
1. **Whole foods** (top 5 foods to add)
2. **Meal timing** adjustments
3. **Recipe ideas** (v1.1)
4. **Products/supplements** (opt-in, with disclaimer)

**User Stories:**
- As a user, I want top 3 priorities for today
- As a user, I want to know *why* a nutrient matters
- As a user, I want practical, achievable suggestions

**Tone:**
- Supportive, not preachy
- "Here's what would help most" not "You're doing it wrong"
- Celebrate wins ("Great gut health support today!")

---

### 5.6 Legal & Compliance

**Priority:** P0 (Critical)

**Requirements:**
- Prominent disclaimer on every page with health advice
- "Not medical advice" banner
- Affiliate disclosure where applicable
- Privacy policy (for v1.1 with user accounts)
- GDPR/CCPA compliance (for v1.1)

**Disclaimer Text (Minimum):**
> This application is for informational and educational purposes only. This is not medical advice. This does not diagnose, treat, cure, or prevent any disease. Consult a qualified healthcare professional before making dietary changes, especially if you have medical conditions or take medications.

---

### 5.7 AI-Powered Food Recognition (v1.1)

**Priority:** P1 (High Value Add)

**User Stories:**
- As a user, I want to log food by taking a photo instead of typing
- As a user, I want portion sizes estimated automatically
- As a user, I want to verify AI suggestions before they're logged

**Technical Implementation:**
- OpenAI GPT-4 Vision API for image analysis
- Fallback to manual entry if confidence < 70%
- Multi-item detection for complete meals
- Integration with extended food database (1000+ items)

**User Flow:**
1. User taps "Log with Photo" button
2. Camera opens or user uploads image
3. AI analyzes image (3-5 seconds)
4. Results shown with confidence scores
5. User can edit portions/selections
6. Tap "Confirm" to log

**API Endpoint:**
- `POST /api/ai/recognize-food`
- Input: `{ imageUrl: string, multipleItems?: boolean }`
- Output: `{ foodName, category, confidence, portionEstimate, nutrients, matchedFoodId }`

**Display:**
- Show confidence percentage (e.g., "85% confident this is grilled chicken")
- Highlight low-confidence items in yellow
- Allow manual override for any field
- Show matched database item with full nutritional data

**Cost Considerations:**
- GPT-4 Vision: ~$0.01-0.03 per image
- Limit: 10 free photo recognitions per month for free tier
- Premium: unlimited photo recognition

**Success Metrics:**
- 80%+ accuracy on common foods
- <5 seconds total processing time
- 60%+ users find it helpful (post-launch survey)

---

### 5.8 Nutrition Knowledge RAG System (v1.1)

**Priority:** P1 (Differentiation)

**User Stories:**
- As a user, I want to ask questions about nutrition in natural language
- As a user, I want evidence-based answers with sources
- As a user, I want answers personalized to my current gaps

**Knowledge Base Content:**
- 200+ curated nutrition articles
- Food interaction database (synergies & conflicts)
- Nutrient function explanations
- Gut health research summaries
- Evidence-level ratings (strong, moderate, preliminary)

**Technical Implementation:**
- Vector database: Pinecone or Supabase Vector
- Embeddings: OpenAI text-embedding-3-small
- LLM: GPT-4-turbo for answer generation
- Context: User's recent foods + nutrient gaps

**Example Queries:**
- "Why am I low on iron even though I eat meat?"
- "What foods help with magnesium absorption?"
- "Is it true vitamin C helps with iron?"
- "What should I eat for better gut health?"

**Answer Format:**
```
[Direct Answer in 2-3 sentences]

**Why this matters for you:**
- You're currently at 45% of your iron goal
- Your recent meals: [list]

**Practical suggestions:**
1. [Specific food combination]
2. [Timing recommendation]
3. [Food to add]

**Sources:**
- [Research citation 1]
- [Research citation 2]
```

**Success Metrics:**
- 90%+ answers cite correct sources
- <3 seconds response time
- 70%+ user satisfaction rating

---

### 5.9 AI Chat Assistant (v2.0)

**Priority:** P2 (Future Premium Feature)

**User Stories:**
- As a user, I want to have a conversation about my nutrition
- As a user, I want the AI to remember context from previous messages
- As a user, I want meal planning help through chat

**Capabilities:**
- Real-time conversational interface
- Access to user's complete nutrition history
- Proactive suggestions based on patterns
- Meal planning assistance
- Recipe modifications for nutrient goals

**User Flow:**
1. User opens chat interface
2. Types natural language question
3. AI streams response in real-time
4. Can ask follow-up questions
5. Can act on suggestions (e.g., "Add this to my log")

**Technical Stack:**
- Streaming API for real-time responses
- LangChain for conversation memory
- Function calling for actions (log food, create meal plan)
- Rate limiting: 50 messages/day free, unlimited premium

**Example Conversation:**
```
User: I'm feeling tired lately
AI: I see you've been low on iron and B12 for the past week. This could 
    contribute to fatigue. Would you like suggestions to boost these?
User: Yes, but I don't eat meat
AI: Great! Here are plant-based iron sources you haven't tried:
    1. Lentils with lemon (vitamin C boosts absorption)
    2. Spinach with orange slices
    3. Fortified cereals
    For B12, since it's mostly in animal products, you might consider:
    - Nutritional yeast
    - Fortified plant milk
    - B12 supplement (consult your doctor)
    Would you like me to add any of these to a meal plan?
```

---

### 5.10 Model Context Protocol (MCP) Server (v1.2)

**Priority:** P2 (Ecosystem Play)

**Purpose:**
Enable other AI agents (Claude, ChatGPT, custom tools) to access NutBot's nutrition intelligence through standardized tools.

**Available Tools:**
1. **analyze_nutrient_intake**
   - Input: List of foods + user profile
   - Output: Complete nutrient analysis with gaps

2. **get_food_interactions**
   - Input: Two food names
   - Output: Synergies, conflicts, timing recommendations

3. **search_nutrition_knowledge**
   - Input: Natural language query
   - Output: Relevant articles with source citations

4. **optimize_meal_plan**
   - Input: Target nutrients, dietary restrictions, meal count
   - Output: Optimized meal suggestions

5. **calculate_supplement_needs**
   - Input: Current intake, target values
   - Output: Supplement recommendations with dosages

**Usage Example (Claude Desktop):**
```json
{
  "mcpServers": {
    "nutbot": {
      "command": "npx",
      "args": ["-y", "nutbot-mcp-server"],
      "env": {
        "NUTBOT_API_KEY": "user_api_key"
      }
    }
  }
}
```

**Business Value:**
- Extends NutBot brand beyond web app
- Creates API usage revenue opportunity
- Positions NutBot as nutrition infrastructure
- Drives users back to main app

---

## 6. Success Metrics (Updated)

### North Star Metric
**Weekly Active Users (WAU) who log at least 4 days/week**

### Key Metrics

**Engagement:**
- Daily active users (DAU)
- 7-day retention rate (target: 40%)
- 30-day retention rate (target: 20%)
- Avg. days logged per week (target: 4+)

**Behavior:**
- Time to first log (target: < 24 hours after signup)
- Foods logged per session (target: 3-5)
- Recommendation views (target: 60% of users)
- Education content reads (target: 30% of users)

**AI Features (v1.1+):**
- Photo recognition usage rate (target: 40% of daily logs)
- RAG query usage (target: 2-3 questions per active user/week)
- AI chat interactions (target: 3-5 messages per session for users who engage)
- Photo recognition accuracy (target: 85%+ validated by user confirmation)
- RAG answer helpfulness rating (target: 4.2+/5.0)
- AI feature cost per user (target: <$0.15/month)

**Business (v1.1+):**
- Affiliate click-through rate (target: 5-8%)
- Affiliate conversion rate (target: 2-4%)
- Premium subscription rate (target: 10% of active users)
- Premium conversion from AI features (track separately)

**Health Outcomes (long-term):**
- Nutrient gaps closed week-over-week
- Gut health score improvement
- User-reported energy, digestion, sleep (surveys)

---

## 7. User Flows

### 7.1 Core Flow: Log → Analyze → Act

```
1. User opens app
2. Clicks "Log Food"
3. Searches OR selects common meal
4. Reviews daily dashboard
   - Sees gut health score
   - Sees top 3 nutrient gaps
   - Sees synergy suggestions
5. Clicks "Recommendations"
6. Reviews food-first suggestions
7. Optionally views product suggestions
8. Returns tomorrow to log again
```

### 7.2 First-Time User Onboarding (v1.1)

```
1. Welcome screen
2. Legal disclaimer (accept to continue)
3. Basic profile (age, sex, activity level)
4. "Log your first meal" tutorial
5. Dashboard tour (tooltips)
6. "Come back tomorrow" reminder
```

---

## 8. Technical Architecture

### Stack
- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes (serverless functions)
- **Database:** SQLite (dev/MVP) → PostgreSQL (production)
- **ORM:** Prisma
- **Deployment:** Vercel
- **Analytics:** (TBD - Posthog, Mixpanel, or similar)

### Data Models
- User (profile, preferences)
- FoodEntry (logged items with timestamps)
- EducationalContent (articles, tips)
- AffiliateProduct (supplements, foods)

### APIs (Internal)
- `POST /api/analyze-intake` — analyze food array, return gaps
- `POST /api/suggest-improvements` — generate recommendations
- `POST /api/sync-wearables` — (stubbed for v2.0)
- `GET /api/affiliate-catalog` — fetch products

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Legal liability (medical advice) | High | Prominent disclaimers, legal review, insurance |
| Low retention (like other apps) | High | Focus on low friction, celebrate wins, education |
| Food database inaccuracy | Medium | Clearly label as "estimates," cite USDA sources |
| Wearable integration complexity | Medium | Stub endpoints, defer to v2.0, focus on MVP first |
| Affiliate products seen as spammy | Medium | Always show food-first, make supplements opt-in |

---

## 10. Open Questions

1. Should we gamify (streaks, badges)? → Test in v1.1
2. Do users want social features? → Survey after launch
3. Pricing model for premium? → $4.99/mo or $39.99/yr (test)
4. Which wearables to prioritize? → Apple Health first (largest iOS user base)
5. How to handle special diets (keto, paleo)? → Custom DV targets in v1.1

---

## 11. Timeline

**MVP (v1.0):** November 2024 ✅  
**v1.1 (Monetization + Polish):** Q1 2025  
**v2.0 (Wearables + Advanced):** Q2-Q3 2025

---

## Appendix: Competitive Analysis

| Competitor | Strength | Weakness | Our Advantage |
|------------|----------|----------|---------------|
| MyFitnessPal | Huge food DB, brand | Macro-only focus, ads | Micronutrient depth, gut focus |
| Cronometer | Detailed micros | Clunky UX, niche | Simpler UX, synergies |
| Noom | Behavior change | Expensive, calorie-focused | Nutrient education, free tier |
| Zero Longevity | Biohacking focus | Expensive ($15+/mo) | Accessible pricing, gut health |

---

**Document Status:** Final Draft  
**Next Review:** Q1 2025 (post-launch feedback)
