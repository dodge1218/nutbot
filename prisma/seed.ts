import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@nutbot.app' },
    update: {},
    create: {
      email: 'demo@nutbot.app',
      name: 'Demo User',
      age: 30,
      sex: 'female',
      weight: 65,
      height: 165,
      activityLevel: 'moderate',
      dietaryPattern: 'omnivore',
      showSupplements: true,
    },
  });

  console.log('Created demo user:', user.email);

  // Create educational content
  const educationalContent = [
    {
      slug: 'iron-vitamin-c-synergy',
      title: 'Why Vitamin C Boosts Iron Absorption',
      description: 'Learn how pairing iron-rich foods with vitamin C can dramatically improve absorption.',
      content: `# Iron + Vitamin C: A Powerful Duo

Non-heme iron (from plant sources) is harder for your body to absorb than heme iron (from meat). Vitamin C can increase non-heme iron absorption by up to 300%.

## How to Apply This

- Add bell peppers to your lentil soup
- Squeeze lemon on your spinach salad
- Eat kiwi or strawberries after an iron-rich meal
- Drink orange juice with fortified cereal

## What to Avoid

- Don't drink tea or coffee with iron-rich meals (tannins inhibit absorption)
- Separate calcium supplements from iron-rich meals by 2+ hours`,
      level: 'beginner',
      category: 'synergies',
      nutrientTags: 'iron,vitamin_c',
      readTime: 3,
      published: true,
    },
    {
      slug: 'gut-health-basics',
      title: 'Gut Health 101: Fiber, Fermentation, and Diversity',
      description: 'The three pillars of a healthy gut microbiome.',
      content: `# Building a Healthy Gut

Your gut microbiome thrives on three key factors:

## 1. Fiber (25-35g daily)
Feeds beneficial bacteria. Focus on:
- Legumes (lentils, beans, chickpeas)
- Whole grains (oats, quinoa, brown rice)
- Vegetables (broccoli, Brussels sprouts, artichokes)

## 2. Fermented Foods
Provide live beneficial bacteria:
- Yogurt with live cultures
- Kefir
- Sauerkraut
- Kimchi
- Kombucha
- Miso

## 3. Plant Diversity
Aim for 30+ different plant foods per week to support bacterial diversity.

## What Harms Gut Health
- Ultra-processed foods
- Excessive sugar
- Artificial sweeteners (some)
- Chronic stress
- Antibiotics (when necessary, follow with probiotics)`,
      level: 'beginner',
      category: 'gut_health',
      nutrientTags: 'fiber,probiotics',
      readTime: 4,
      published: true,
    },
    {
      slug: 'calcium-iron-timing',
      title: 'Calcium and Iron: Timing Matters',
      description: 'Why you should space these nutrients apart.',
      content: `# Calcium vs Iron: Schedule Them Separately

Calcium can inhibit iron absorption when consumed together.

## The Science
Both minerals compete for the same absorption pathways in your gut.

## Practical Advice

**If you need both:**
- Take calcium supplements at bedtime
- Eat iron-rich meals at lunch/dinner
- Space them at least 2 hours apart

**Food examples:**
- Don't pair: Spinach (iron) + cheese (calcium)
- Better: Spinach salad at lunch, yogurt as evening snack

**Exception:** If you're not iron-deficient and eat a varied diet, this is less critical.`,
      level: 'intermediate',
      category: 'timing',
      nutrientTags: 'calcium,iron',
      readTime: 3,
      published: true,
    },
    {
      slug: 'magnesium-benefits',
      title: 'Magnesium: The Relaxation Mineral',
      description: 'Why most people need more magnesium and how to get it.',
      content: `# Magnesium: Essential and Underconsumed

Up to 50% of people don't get enough magnesium.

## What It Does
- Muscle relaxation
- Better sleep quality
- Stress management
- Energy production (ATP)
- Bone health

## Best Food Sources
- Pumpkin seeds (150mg per ounce)
- Spinach (157mg per cup cooked)
- Black beans (120mg per cup)
- Dark chocolate (95mg per ounce)
- Avocado (58mg per medium fruit)
- Almonds (80mg per ounce)

## Timing Tip
Take magnesium supplements in the evening - it promotes relaxation and better sleep.

## Forms
- Magnesium glycinate: Best absorption, gentle on stomach
- Magnesium citrate: Good absorption, may have laxative effect
- Magnesium oxide: Poor absorption, avoid`,
      level: 'beginner',
      category: 'minerals',
      nutrientTags: 'magnesium',
      readTime: 4,
      published: true,
    },
  ];

  for (const content of educationalContent) {
    await prisma.educationalContent.upsert({
      where: { slug: content.slug },
      update: content,
      create: content,
    });
  }

  console.log(`Created ${educationalContent.length} educational articles`);

  // Create affiliate products
  const products = [
    {
      sku: 'SUPP-IRON-001',
      name: 'Gentle Iron with Vitamin C',
      description: 'Easy-to-absorb iron bisglycinate with 125mg vitamin C',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['iron', 'vitamin_c']),
      affiliateLink: 'https://example.com/iron-supplement',
      price: 19.99,
      priority: 10,
      active: true,
    },
    {
      sku: 'SUPP-D3-001',
      name: 'Vitamin D3 5000 IU',
      description: 'High-potency vitamin D3 for immune and bone health',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['vitamin_d']),
      affiliateLink: 'https://example.com/vitamin-d',
      price: 14.99,
      priority: 10,
      active: true,
    },
    {
      sku: 'SUPP-MAG-001',
      name: 'Magnesium Glycinate 400mg',
      description: 'Highly absorbable magnesium for relaxation and sleep',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['magnesium']),
      affiliateLink: 'https://example.com/magnesium',
      price: 22.99,
      priority: 15,
      active: true,
    },
    {
      sku: 'SUPP-ELECTRO-001',
      name: 'Complete Electrolyte Mix',
      description: 'Balanced sodium, potassium, magnesium for hydration',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['sodium', 'potassium', 'magnesium']),
      affiliateLink: 'https://example.com/electrolytes',
      price: 29.99,
      priority: 20,
      active: true,
    },
    {
      sku: 'SUPP-FIBER-001',
      name: 'Prebiotic Fiber Blend',
      description: 'Gut-friendly fiber blend with inulin and psyllium',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['fiber']),
      affiliateLink: 'https://example.com/fiber',
      price: 24.99,
      priority: 25,
      active: true,
    },
    {
      sku: 'SUPP-OMEGA3-001',
      name: 'Omega-3 Fish Oil 1000mg',
      description: 'High EPA/DHA for heart and brain health',
      category: 'supplement',
      fillsNutrients: JSON.stringify(['omega_3']),
      affiliateLink: 'https://example.com/omega3',
      price: 27.99,
      priority: 30,
      active: true,
    },
    {
      sku: 'FOOD-PROB-001',
      name: 'Organic Live-Culture Yogurt',
      description: 'Probiotic-rich yogurt for gut health',
      category: 'food',
      fillsNutrients: JSON.stringify(['calcium', 'protein', 'probiotics']),
      affiliateLink: 'https://example.com/yogurt',
      price: 5.99,
      priority: 5,
      active: true,
    },
  ];

  for (const product of products) {
    await prisma.affiliateProduct.upsert({
      where: { sku: product.sku },
      update: product,
      create: product,
    });
  }

  console.log(`Created ${products.length} affiliate products`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
