# Educational Content Model

**Version:** 1.0  
**Last Updated:** November 2024  
**Document Owner:** Content & Product Teams

---

## 1. Overview

NutBot's educational content serves to:
- **Educate** users about nutrients, synergies, and timing
- **Build trust** through evidence-based, clear explanations
- **Drive engagement** by answering "why this nutrient matters"
- **Support SEO** with longtail keyword targeting

This document defines how educational content is structured, stored, tagged, and delivered to users.

---

## 2. Content Types

### 2.1 **Article (Primary Content Type)**

**Format:** Long-form markdown (300-1000 words)

**Structure:**
```markdown
# Title (H1)

**Category:** [Vitamins | Minerals | Synergies | Timing | Gut Health]
**Level:** [Beginner | Intermediate | Advanced]
**Read Time:** [3-7 minutes]

## Introduction (2-3 sentences)

## Section 1: What It Is
- Definition
- Why it matters

## Section 2: How to Get It
- Best food sources (with quantities)
- Supplement options (if relevant)

## Section 3: Timing & Synergies
- When to consume
- What to pair with
- What to avoid

## Section 4: Common Mistakes
- Pitfalls to avoid

## Takeaways (bullet points)

---

**Related Articles:** [Links to 2-3 related pieces]
**Nutrient Tags:** iron, vitamin_c, calcium (comma-separated)
```

**Examples:**
- "Iron + Vitamin C: The Ultimate Absorption Hack"
- "Magnesium Before Bed: Why It Works"
- "Gut Health 101: Fiber, Fermentation, and Diversity"

---

### 2.2 **Quick Tip (Micro-Content)**

**Format:** Short text snippet (50-150 words)

**Use Cases:**
- In-app tooltips
- Dashboard "tip of the day"
- Onboarding hints

**Structure:**
```
💡 Quick Tip: [Title]

[2-3 sentence explanation]

Example: "Add lemon to your spinach salad to boost iron absorption by up to 300%."

[Optional: Link to full article]
```

**Examples:**
- "Space calcium and iron 2+ hours apart"
- "Coffee blocks iron — wait 1 hour after meals"
- "Fermented foods = happier gut bacteria"

---

### 2.3 **FAQ Entry**

**Format:** Question + Answer (100-300 words)

**Use Cases:**
- FAQ page
- Contextual help in app
- Search results

**Structure:**
```
**Q: [User question in natural language]**

A: [Clear, concise answer with actionable advice]

[Optional: Link to full article for more detail]
```

**Examples:**
- Q: "Why is my gut health score low?"
- Q: "Can I take iron and calcium together?"
- Q: "How much fiber do I need per day?"

---

### 2.4 **Video Script (Future)**

**Format:** 60-90 second video script

**Use Cases:**
- TikTok/Instagram Reels
- In-app explainer videos (v2.0)

**Structure:**
- Hook (0-5s): "Did you know..."
- Problem (5-20s): "Most people don't absorb enough iron because..."
- Solution (20-60s): "Here's the fix..."
- CTA (60-90s): "Track your iron in NutBot"

---

## 3. Content Schema (Database)

### Table: `educational_content`

```sql
CREATE TABLE educational_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL, -- URL-friendly, e.g., 'iron-vitamin-c-synergy'
  
  -- Core Fields
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL, -- Meta description / summary (160 chars max)
  content TEXT NOT NULL, -- Full markdown content
  
  -- Categorization
  category VARCHAR(50) NOT NULL, -- 'vitamins', 'minerals', 'synergies', 'timing', 'gut_health'
  level VARCHAR(20) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  content_type VARCHAR(20) DEFAULT 'article', -- 'article', 'quick_tip', 'faq', 'video'
  
  -- Tagging
  nutrient_tags TEXT NOT NULL, -- Comma-separated: 'iron,vitamin_c,calcium'
  keywords TEXT, -- SEO keywords (comma-separated)
  
  -- Metadata
  read_time INTEGER, -- In minutes
  author VARCHAR(100),
  image_url TEXT,
  video_url TEXT,
  
  -- Status
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE, -- Show on homepage
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP
);

CREATE INDEX idx_content_category ON educational_content(category, published);
CREATE INDEX idx_content_tags ON educational_content USING GIN (to_tsvector('english', nutrient_tags));
CREATE INDEX idx_content_slug ON educational_content(slug);
```

---

## 4. Content Categories

### 4.1 **Vitamins**

**Topics:**
- Fat-soluble: A, D, E, K
- Water-soluble: C, B-complex (B1, B2, B3, B6, B12, folate)

**Sample Articles:**
- "Vitamin D: The Sunshine Vitamin"
- "Why Vitamin C Is Your Iron's Best Friend"
- "B12 for Vegans: What You Need to Know"

---

### 4.2 **Minerals**

**Topics:**
- Macro-minerals: Calcium, magnesium, potassium, sodium
- Trace minerals: Iron, zinc, selenium, iodine

**Sample Articles:**
- "Magnesium: The Relaxation Mineral"
- "Sodium vs. Potassium: Finding Balance"
- "Iron Deficiency: Signs and Solutions"

---

### 4.3 **Synergies**

**Topics:**
- Nutrient pairings that boost absorption
- Functional combinations

**Sample Articles:**
- "Iron + Vitamin C: The Power Duo"
- "Calcium + Vitamin D: Build Stronger Bones"
- "Fat-Soluble Vitamins: Why You Need Healthy Fats"

---

### 4.4 **Timing**

**Topics:**
- When to eat certain nutrients
- Spacing for optimal absorption
- Pre/post-workout nutrition

**Sample Articles:**
- "Calcium and Iron: Why Timing Matters"
- "Magnesium Before Bed: Science-Backed Benefits"
- "Coffee and Iron: The 1-Hour Rule"

---

### 4.5 **Gut Health**

**Topics:**
- Fiber types and benefits
- Fermented foods and probiotics
- Gut-brain axis
- Anti-inflammatory foods

**Sample Articles:**
- "Gut Health 101: The 3 Pillars"
- "Fermented Foods: Your Gut's Best Friend"
- "30 Plants a Week: Why Diversity Matters"
- "Ultra-Processed Foods and Your Microbiome"

---

### 4.6 **Special Topics**

**Topics:**
- Pregnancy nutrition
- Athletic performance
- Aging and longevity
- Plant-based diets

**Sample Articles:**
- "Iron Needs During Pregnancy"
- "Protein Timing for Athletes"
- "Vegan B12: Where to Get It"

---

## 5. Content Lifecycle

### 5.1 **Content Creation Workflow**

```
1. [Ideation] → Topic brainstorming (based on user gaps, searches, trends)
2. [Research] → Evidence review (USDA, NIH, peer-reviewed sources)
3. [Drafting] → Write in markdown (follow structure)
4. [Review] → Nutritionist fact-check (critical for medical accuracy)
5. [Edit] → Simplify language, add examples
6. [Legal Review] → Ensure disclaimers, no medical claims
7. [SEO Optimization] → Add keywords, meta description
8. [Publish] → Set `published = TRUE`, `published_at = NOW()`
9. [Promote] → Share on social, email newsletter
10. [Update] → Review quarterly for accuracy
```

---

### 5.2 **Content Versioning**

- Track major updates in `updated_at` field
- Add changelog at bottom of article (optional):
  ```
  **Last Updated:** November 2024
  **Changes:** Updated vitamin D recommendations per new FDA guidelines
  ```

---

## 6. Content Delivery

### 6.1 **In-App Contextual Display**

**Scenario 1: User has iron deficit**
```
Dashboard → "Learn why you might be low on iron" 
    → Links to "Iron Deficiency: Signs and Solutions"
    → Shows "Iron + Vitamin C" synergy tip
```

**Scenario 2: User logs spinach + bell pepper**
```
Log Food → Auto-detects synergy
    → "Great combo! Iron + Vitamin C ⚡"
    → Link: "Read: Iron Absorption Hacks"
```

**Scenario 3: User views recommendations**
```
Recommendations Page → "Why increase magnesium?"
    → Inline explanation (100 words)
    → Link: "Full article: Magnesium Benefits"
```

---

### 6.2 **Education Center (Dedicated Page)**

**Layout:**
- **Hero:** "Learn How to Optimize Your Nutrition"
- **Featured Articles:** (3-4 hero cards)
- **Browse by Category:** Tabs or filters
- **Search:** Full-text search across all content
- **Recently Added:** Latest 5 articles

**Filters:**
- Category (Vitamins, Minerals, Synergies, etc.)
- Level (Beginner, Intermediate, Advanced)
- Nutrient Tag (Iron, Vitamin C, Fiber, etc.)

---

### 6.3 **Email Drip Campaign**

**New User Journey:**
- Day 1: "Welcome to NutBot" (overview)
- Day 3: "Understanding Nutrient Gaps" (article)
- Day 7: "Gut Health 101" (article)
- Day 14: "Iron + Vitamin C: A Power Duo" (article)
- Day 21: "Your First Week of Insights" (milestone + article)

**Weekly Newsletter:**
- 1 featured article
- 1 quick tip
- User's top nutrient gap + related article

---

## 7. SEO Strategy

### 7.1 **Target Keywords (Longtail)**

Examples:
- "How to increase iron absorption naturally"
- "Best foods for gut health"
- "Magnesium before bed benefits"
- "Vitamin D deficiency symptoms"
- "Calcium and iron interaction"

### 7.2 **On-Page SEO**

- **Title Tag:** 60 chars max, include keyword
- **Meta Description:** 160 chars, actionable
- **URL Slug:** `/education/[category]/[slug]`
- **Header Tags:** H1 (title), H2 (sections), H3 (subsections)
- **Internal Linking:** Link to related articles, dashboard
- **Alt Text:** For images (nutrient charts, infographics)

### 7.3 **Content Distribution**

- **Blog:** Host on subdomain (blog.nutbot.app) or /education
- **Medium:** Republish (with canonical link)
- **Social:** Snippets on Instagram, TikTok, Twitter
- **Reddit:** Authentic contributions to r/nutrition, r/fitness

---

## 8. Content Quality Standards

### 8.1 **Accuracy**

- Cite sources (NIH, USDA, peer-reviewed journals)
- Fact-check with nutritionist or RD
- Update when guidelines change (e.g., FDA DV updates)

### 8.2 **Tone & Voice**

- **Friendly, not clinical:** "Here's how to boost iron" not "Iron bioavailability optimization"
- **Supportive, not preachy:** "Try adding..." not "You must..."
- **Evidence-based, not sensational:** "Studies show..." not "This one weird trick..."

### 8.3 **Accessibility**

- Reading level: 8th grade (Flesch-Kincaid)
- Avoid jargon, or define it
- Use bullet points, short paragraphs
- Include visuals (charts, icons) where helpful

---

## 9. Performance Metrics

### Content Engagement
- Article views (total, unique)
- Avg. time on page (target: 2+ minutes)
- Scroll depth (% who reach end)
- Bounce rate (target: < 50%)

### User Behavior
- % of users who read 1+ article/month (target: 40%)
- Articles read per user (target: 2-3/month)
- Click-through from dashboard tips (target: 15%)

### SEO Performance
- Organic search traffic (target: 10K visits/month by Month 12)
- Ranking for target keywords (top 10 on Google)
- Backlinks earned

---

## 10. Content Roadmap

### MVP Launch (November 2024)
- ✅ 10 core articles (Iron, Magnesium, Gut Health, Synergies)
- ✅ 20 quick tips (in-app tooltips)
- ✅ 15 FAQ entries

### v1.1 (Q1 2025)
- 30 total articles (cover all major nutrients)
- Video scripts for top 5 articles
- Guest posts from RD/nutritionists

### v1.2 (Q2 2025)
- User-generated content (testimonials, stories)
- Interactive tools (nutrient calculator, synergy checker)

### v2.0 (Q3 2025)
- Personalized learning paths ("Iron Mastery in 7 Days")
- In-app video library
- Quizzes and knowledge checks

---

## 11. Legal & Compliance

### Disclaimers

Every article must include:
```
**Disclaimer:** This article is for informational purposes only and is not medical advice. Consult a healthcare professional before making dietary changes.
```

### Medical Claims

**Allowed:**
- "Vitamin C may help iron absorption" ✅
- "Magnesium supports relaxation" ✅

**NOT Allowed:**
- "This cures iron deficiency" ❌
- "Guaranteed to fix your sleep" ❌

---

## 12. Content Maintenance

### Quarterly Review
- Check for outdated information (e.g., DV changes)
- Update links (ensure not broken)
- Refresh examples and food sources

### User Feedback
- Comments/questions on articles (future feature)
- "Was this helpful?" thumbs up/down
- Identify gaps in coverage

---

## Conclusion

NutBot's educational content is a **core product differentiator**. By providing clear, actionable, evidence-based information, we build trust, drive engagement, and establish authority in the nutrition space.

**Next Steps:**
1. ✅ Seed initial 10 articles (MVP)
2. Hire nutritionist for ongoing fact-checking (Q1 2025)
3. Build content calendar (2 articles/month)
4. Launch Education Center page (v1.1)

---

**Document Owner:** Content Team  
**Last Updated:** November 2024  
**Next Review:** Q1 2025
