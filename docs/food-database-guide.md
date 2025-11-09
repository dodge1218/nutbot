# Comprehensive Food Database Guide

## Overview

The NutBot Extended Food Database aims to provide comprehensive nutritional information for 1000+ food items, including brand variants, processing methods, and complete micronutrient profiles.

## Current Status

**Completed:** 30+ vegetable items
**Target:** 1000+ total items

## Database Structure

### Categories & Target Counts

1. **Vegetables (200 items)**
   - ✅ Leafy Greens: 9 items (spinach, kale, arugula, chard, collards)
   - ✅ Cruciferous: 9 items (broccoli, cauliflower, brussels sprouts, cabbage)
   - ✅ Root Vegetables: 6 items (sweet potato, carrot, beet)
   - ⏳ Nightshades: 0/20 (tomato, bell pepper, eggplant)
   - ⏳ Squashes: 0/15 (zucchini, butternut, acorn)
   - ⏳ Alliums: 0/10 (onion, garlic, leeks, shallots)
   - ⏳ Others: 0/20 (asparagus, celery, cucumber, etc.)

2. **Fruits (150 items)**
   - ⏳ Berries: 0/25 (strawberry, blueberry, raspberry, blackberry)
   - ⏳ Citrus: 0/20 (orange, lemon, lime, grapefruit)
   - ⏳ Stone Fruits: 0/15 (peach, plum, cherry, apricot)
   - ⏳ Tropical: 0/20 (banana, mango, pineapple, papaya)
   - ⏳ Pome Fruits: 0/10 (apple, pear)
   - ⏳ Melons: 0/10 (watermelon, cantaloupe, honeydew)
   - ⏳ Others: 0/50 (grapes, kiwi, etc.)

3. **Proteins (200 items)**
   - ⏳ Poultry: 0/30 (chicken, turkey, duck)
   - ⏳ Beef: 0/25 (ground beef, steak, roast)
   - ⏳ Pork: 0/20 (bacon, ham, pork chops)
   - ⏳ Fish: 0/50 (salmon, tuna, cod, tilapia, sardines)
   - ⏳ Seafood: 0/30 (shrimp, crab, lobster, scallops)
   - ⏳ Game Meat: 0/10 (venison, bison, elk)
   - ⏳ Plant Proteins: 0/35 (tofu, tempeh, seitan)

4. **Legumes (60 items)**
   - ⏳ Beans: 0/30 (black, kidney, pinto, navy, chickpea)
   - ⏳ Lentils: 0/10 (red, green, brown, black)
   - ⏳ Peas: 0/10 (green peas, split peas, snap peas)
   - ⏳ Peanuts: 0/10 (raw, roasted, peanut butter)

5. **Grains (100 items)**
   - ⏳ Whole Grains: 0/40 (brown rice, quinoa, oats, barley)
   - ⏳ Refined Grains: 0/30 (white rice, pasta, bread)
   - ⏳ Pseudo-grains: 0/15 (amaranth, buckwheat, millet)
   - ⏳ Cereals: 0/15 (branded breakfast cereals)

6. **Dairy & Alternatives (80 items)**
   - ⏳ Milk: 0/15 (whole, 2%, skim, organic, brands)
   - ⏳ Cheese: 0/30 (cheddar, mozzarella, parmesan, etc.)
   - ⏳ Yogurt: 0/15 (Greek, regular, kefir, brands)
   - ⏳ Plant Milk: 0/20 (soy, almond, oat, coconut, cashew)

7. **Nuts & Seeds (60 items)**
   - ⏳ Tree Nuts: 0/30 (almond, walnut, cashew, pecan, etc.)
   - ⏳ Seeds: 0/20 (chia, flax, hemp, pumpkin, sunflower)
   - ⏳ Nut Butters: 0/10 (almond butter, tahini, etc.)

8. **Oils & Fats (40 items)**
   - ⏳ Cooking Oils: 0/20 (olive, coconut, avocado, canola)
   - ⏳ Animal Fats: 0/10 (butter, ghee, lard, tallow)
   - ⏳ Specialized: 0/10 (MCT oil, fish oil, etc.)

9. **Fermented Foods (40 items)**
   - ⏳ Cultured Dairy: 0/10 (yogurt, kefir, sour cream)
   - ⏳ Vegetables: 0/15 (kimchi, sauerkraut, pickles)
   - ⏳ Soy Products: 0/10 (miso, tempeh, natto)
   - ⏳ Beverages: 0/5 (kombucha, kvass)

10. **Herbs & Spices (50 items)**
    - ⏳ Fresh Herbs: 0/15 (basil, cilantro, parsley, mint)
    - ⏳ Dried Spices: 0/35 (turmeric, ginger, cinnamon, etc.)

11. **Beverages (30 items)**
    - ⏳ Tea: 0/10 (green, black, herbal)
    - ⏳ Coffee: 0/5 (regular, decaf, espresso)
    - ⏳ Juices: 0/10 (orange, apple, vegetable)
    - ⏳ Others: 0/5 (bone broth, protein shakes)

12. **Processed/Packaged (90 items)**
    - ⏳ Protein Bars: 0/15 (brands)
    - ⏳ Protein Powders: 0/15 (whey, plant-based)
    - ⏳ Snacks: 0/30 (chips, crackers, bars)
    - ⏳ Common Brands: 0/30 (popular packaged foods)

## Food Variants Strategy

Each food item should have multiple variants when applicable:

### Processing Methods
- **Raw** → **Cooked** (boiled, steamed, roasted, grilled, fried, baked)
- **Fresh** → **Frozen** → **Canned** → **Dried**
- **Whole** → **Chopped** → **Pureed** → **Juiced**

### Brand Variations
- **Generic** (USDA standard)
- **Organic** (Whole Foods 365, organic brands)
- **Conventional** (major supermarket brands)
- **Specialty** (artisanal, local, imported)

### Examples:
- Spinach: raw organic, raw conventional, frozen, canned
- Chicken: raw breast, cooked breast, grilled breast, rotisserie
- Blueberries: fresh organic, fresh conventional, frozen, dried
- Oats: steel-cut, rolled, instant, branded instant packets

## Data Fields Priority

### Essential Fields (100% completion)
- ✅ id, name, commonNames
- ✅ category, subcategory
- ✅ variant, isOrganic
- ✅ servingSize
- ✅ calories, protein, carbs, fat, fiber

### High Priority (80%+ completion target)
- ⚠️ Major vitamins: A, C, D, K, B6, B12, folate
- ⚠️ Key minerals: iron, calcium, magnesium, potassium, zinc
- ⚠️ Dietary flags: vegan, vegetarian, gluten-free, keto, paleo
- ⚠️ Allergens

### Medium Priority (50%+ completion)
- ⏳ All B vitamins
- ⏳ Trace minerals: selenium, copper, manganese, chromium
- ⏳ Phytonutrients: polyphenols, carotenoids, flavonoids
- ⏳ Gut health: prebiotics, probiotics, resistant starch
- ⏳ Glycemic index/load

### Nice to Have
- ⏳ Seasonal availability
- ⏳ Storage recommendations
- ⏳ Shelf life
- ⏳ Brand-specific data

## Data Sources

### Primary Sources
1. **USDA FoodData Central** (https://fdc.nal.usda.gov/)
   - Most comprehensive free database
   - Standard Reference (SR) and Survey (FNDDS) databases
   - API available for automated import

2. **Nutritionix API** (https://www.nutritionix.com/)
   - Branded food products
   - Restaurant items
   - Commercial database

3. **ESHA Food Processor**
   - Research-grade nutrient database
   - Extensive micronutrient data

### Secondary Sources
- Research literature for phytonutrients
- Brand websites for branded products
- Agricultural extension services for seasonal data

## Implementation Strategy

### Phase 1: Foundation (Current)
- ✅ Create database structure
- ✅ Populate 30+ vegetable variants
- ✅ Establish data entry patterns

### Phase 2: Core Foods (Weeks 1-2)
- [ ] Add top 200 most commonly consumed foods
- [ ] Focus on whole foods (vegetables, fruits, proteins)
- [ ] Complete all essential fields
- [ ] Add major brand variants

### Phase 3: Expansion (Weeks 3-4)
- [ ] Add remaining whole foods
- [ ] Complete legumes, grains, nuts, seeds
- [ ] Add dairy and alternatives
- [ ] Fill in high-priority micronutrients

### Phase 4: Specialty Items (Week 5-6)
- [ ] Add fermented foods with probiotic data
- [ ] Add herbs and spices with polyphenol data
- [ ] Add processed/packaged items
- [ ] Complete brand variants

### Phase 5: Enhancement (Week 7-8)
- [ ] Fill in missing micronutrients
- [ ] Add phytonutrient data
- [ ] Add food interaction markers
- [ ] Verify and validate all entries

## Automation Scripts

### USDA Data Import
```bash
# Script to import foods from USDA API
node scripts/import-usda-foods.js --category vegetables --limit 50
```

### Brand Data Scraping
```bash
# Script to scrape nutrition labels
node scripts/scrape-brand-foods.js --brand "Whole Foods 365"
```

### Data Validation
```bash
# Validate database completeness
node scripts/validate-food-database.js
```

## Quality Control

### Validation Rules
1. **Required Fields:** All essential fields must be present
2. **Nutrient Ranges:** Values must be within reasonable ranges
3. **Serving Sizes:** Must be standardized (preferably in grams)
4. **Consistency:** Variants of same food should have similar base nutrients

### Review Process
1. Automated validation on commit
2. Manual review of new entries
3. User feedback mechanism
4. Periodic USDA data sync

## Usage Examples

### Search by Name
```typescript
const spinachVariants = searchExtendedFoods('spinach');
// Returns: raw organic, raw conventional, cooked, frozen
```

### Filter by Diet
```typescript
const veganFoods = filterByDiet('vegan');
const ketoFoods = filterByDiet('keto');
```

### Get Seasonal Foods
```typescript
const fallFoods = getFoodsBySeason('fall');
```

### Find Gut Health Foods
```typescript
const fermentedFoods = getFermentedFoods();
const prebioticFoods = EXTENDED_FOODS_DATABASE.filter(f => 
  (f.prebioticFiber ?? 0) > 2
);
```

## Next Steps

1. **Immediate:** Add fruits category (berries, citrus, stone fruits)
2. **Short-term:** Add top 50 protein sources
3. **Medium-term:** Add legumes and grains
4. **Long-term:** Complete all 1000+ items with full nutrient profiles

## Contributing

When adding new foods, follow this template:

```typescript
{
  id: 'food-name-variant',
  name: 'Food Name (Preparation)',
  commonNames: ['Alternative Name 1', 'Alternative Name 2'],
  category: 'category',
  subcategory: 'specific_type',
  variant: 'preparation_method',
  isOrganic: boolean,
  servingSize: 'X unit (Xg)',
  
  // Macros (required)
  calories: X,
  protein: X,
  carbs: X,
  fat: X,
  fiber: X,
  
  // Key micronutrients (fill as many as possible)
  vitaminA: X,
  vitaminC: X,
  // ... etc
  
  // Flags (required)
  isFermented: boolean,
  isWholeFood: boolean,
  isProcessed: boolean,
  isUltraProcessed: boolean,
  
  allergens: [],
  isVegan: boolean,
  isVegetarian: boolean,
  isGlutenFree: boolean,
  isDairyFree: boolean,
  isKeto: boolean,
  isPaleo: boolean,
  
  // Optional but recommended
  season: ['season1', 'season2'],
  shelfLife: 'description',
  storage: 'instructions',
  
  dataSource: 'USDA',
  verified: true,
}
```

## Resources

- [USDA FoodData Central](https://fdc.nal.usda.gov/)
- [USDA API Documentation](https://fdc.nal.usda.gov/api-guide.html)
- [Nutritionix API](https://developer.nutritionix.com/)
- [Food Composition Databases](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/methods-and-application-of-food-composition-laboratory/)

---

**Last Updated:** November 8, 2025  
**Database Version:** 0.1.0  
**Total Items:** 30+  
**Target:** 1000+
