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

**v1.1 (Q1 2025)**
- Affiliate product integration (supplements matched to gaps)
- Recipe suggestions based on detected gaps
- Weekly trend analysis and insights
- Meal planning tools
- User authentication and data persistence

**v2.0 (Q2-Q3 2025)**
- Apple Health / Fitbit integration
- Activity-based calorie adjustments
- Personalized meal timing (based on activity, sleep)
- Photo food logging (AI recognition)
- Advanced gut microbiome insights

### Non-Goals

❌ Medical diagnosis or treatment  
❌ Replacement for registered dietitian or doctor  
❌ Disease management (diabetes, celiac, etc.) — refer to professionals  
❌ Social features (community, sharing) — focus on individual insights  
❌ Calorie restriction focus — emphasize nutrient density  

---

## 5. Features & Requirements

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

## 6. Success Metrics

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

**Business (v1.1+):**
- Affiliate click-through rate (target: 5-8%)
- Affiliate conversion rate (target: 2-4%)
- Premium subscription rate (target: 10% of active users)

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
