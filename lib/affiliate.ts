/**
 * Affiliate product matching and management
 */

export interface AffiliateProduct {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: 'supplement' | 'food' | 'equipment';
  fillsNutrients: string[]; // e.g., ['iron', 'vitamin_c']
  affiliateLink: string;
  price?: number;
  imageUrl?: string;
  priority: number; // Lower = higher priority
}

// Mock product catalog - in production, this would come from database
export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: '1',
    sku: 'SUPP-IRON-001',
    name: 'Gentle Iron with Vitamin C',
    description: 'Easy-to-absorb iron bisglycinate with 125mg vitamin C for optimal absorption',
    category: 'supplement',
    fillsNutrients: ['iron', 'vitamin_c'],
    affiliateLink: 'https://example.com/iron-supplement',
    price: 19.99,
    priority: 10,
  },
  {
    id: '2',
    sku: 'SUPP-D3-001',
    name: 'Vitamin D3 5000 IU',
    description: 'High-potency vitamin D3 for immune and bone health',
    category: 'supplement',
    fillsNutrients: ['vitaminD'],
    affiliateLink: 'https://example.com/vitamin-d',
    price: 14.99,
    priority: 10,
  },
  {
    id: '3',
    sku: 'SUPP-MAG-001',
    name: 'Magnesium Glycinate 400mg',
    description: 'Highly absorbable magnesium for relaxation, sleep, and muscle support',
    category: 'supplement',
    fillsNutrients: ['magnesium'],
    affiliateLink: 'https://example.com/magnesium',
    price: 22.99,
    priority: 15,
  },
  {
    id: '4',
    sku: 'SUPP-ELECTRO-001',
    name: 'Complete Electrolyte Mix',
    description: 'Balanced sodium, potassium, magnesium for hydration and performance',
    category: 'supplement',
    fillsNutrients: ['sodium', 'potassium', 'magnesium'],
    affiliateLink: 'https://example.com/electrolytes',
    price: 29.99,
    priority: 20,
  },
  {
    id: '5',
    sku: 'SUPP-FIBER-001',
    name: 'Prebiotic Fiber Blend',
    description: 'Gut-friendly fiber blend with inulin and psyllium husk',
    category: 'supplement',
    fillsNutrients: ['fiber'],
    affiliateLink: 'https://example.com/fiber',
    price: 24.99,
    priority: 25,
  },
  {
    id: '6',
    sku: 'SUPP-OMEGA3-001',
    name: 'Omega-3 Fish Oil 1000mg',
    description: 'High EPA/DHA for heart, brain, and anti-inflammatory support',
    category: 'supplement',
    fillsNutrients: ['omega_3'],
    affiliateLink: 'https://example.com/omega3',
    price: 27.99,
    priority: 30,
  },
  {
    id: '7',
    sku: 'FOOD-PROB-001',
    name: 'Organic Live-Culture Yogurt (12-pack)',
    description: 'Probiotic-rich yogurt for gut health',
    category: 'food',
    fillsNutrients: ['calcium', 'protein', 'probiotics'],
    affiliateLink: 'https://example.com/yogurt',
    price: 15.99,
    priority: 5,
  },
  {
    id: '8',
    sku: 'SUPP-ZINC-001',
    name: 'Zinc Picolinate 50mg',
    description: 'Highly bioavailable zinc for immune support',
    category: 'supplement',
    fillsNutrients: ['zinc'],
    affiliateLink: 'https://example.com/zinc',
    price: 12.99,
    priority: 35,
  },
  {
    id: '9',
    sku: 'SUPP-CALC-001',
    name: 'Calcium Citrate with D3',
    description: 'Easily absorbed calcium with vitamin D for bone health',
    category: 'supplement',
    fillsNutrients: ['calcium', 'vitaminD'],
    affiliateLink: 'https://example.com/calcium',
    price: 18.99,
    priority: 40,
  },
  {
    id: '10',
    sku: 'SUPP-B-COMPLEX-001',
    name: 'B-Complex Vitamins',
    description: 'Complete B-vitamin complex for energy and metabolism',
    category: 'supplement',
    fillsNutrients: ['thiamin', 'riboflavin', 'niacin', 'vitaminB6', 'folate', 'vitaminB12'],
    affiliateLink: 'https://example.com/b-complex',
    price: 16.99,
    priority: 45,
  },
];

/**
 * Match products to detected nutrient gaps
 */
export function matchProductsToGaps(
  gaps: { nutrient: string; severity: string }[]
): AffiliateProduct[] {
  const matchedProducts: AffiliateProduct[] = [];
  const seenProducts = new Set<string>();
  
  // Normalize nutrient names for matching
  const normalizeNutrient = (n: string) => {
    return n.toLowerCase().replace(/[^a-z0-9]/g, '');
  };
  
  // Process each gap
  for (const gap of gaps) {
    const normalizedGap = normalizeNutrient(gap.nutrient);
    
    // Find products that fill this nutrient
    const candidates = AFFILIATE_PRODUCTS.filter(product => 
      product.fillsNutrients.some(n => 
        normalizeNutrient(n) === normalizedGap
      )
    );
    
    // Add unique products, prioritized
    for (const product of candidates.sort((a, b) => a.priority - b.priority)) {
      if (!seenProducts.has(product.id)) {
        matchedProducts.push(product);
        seenProducts.add(product.id);
      }
    }
  }
  
  // Sort by priority and return top matches
  return matchedProducts
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 6); // Top 6 products
}

/**
 * Get product recommendations with rationale
 */
export interface ProductRecommendation {
  product: AffiliateProduct;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  fillsGaps: string[];
}

export function getProductRecommendations(
  gaps: { nutrient: string; name: string; severity: string; percentDV: number }[]
): ProductRecommendation[] {
  const recommendations: ProductRecommendation[] = [];
  const matchedProducts = matchProductsToGaps(gaps);
  
  for (const product of matchedProducts) {
    // Find which gaps this product addresses
    const relevantGaps = gaps.filter(gap =>
      product.fillsNutrients.some(n => 
        n.toLowerCase() === gap.nutrient.toLowerCase() ||
        n.toLowerCase().includes(gap.nutrient.toLowerCase())
      )
    );
    
    if (relevantGaps.length === 0) continue;
    
    // Determine priority
    const hasHighSeverity = relevantGaps.some(g => g.severity === 'high');
    const hasMediumSeverity = relevantGaps.some(g => g.severity === 'medium');
    
    let priority: 'high' | 'medium' | 'low' = 'low';
    if (hasHighSeverity) priority = 'high';
    else if (hasMediumSeverity) priority = 'medium';
    
    // Generate reason
    const gapNames = relevantGaps.map(g => g.name).join(', ');
    const lowestPercent = Math.min(...relevantGaps.map(g => g.percentDV));
    
    let reason = `You're at ${Math.round(lowestPercent)}% of daily value for ${gapNames}`;
    if (relevantGaps.length > 1) {
      reason = `Addresses ${relevantGaps.length} nutrient gaps: ${gapNames}`;
    }
    
    recommendations.push({
      product,
      reason,
      priority,
      fillsGaps: relevantGaps.map(g => g.name),
    });
  }
  
  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return recommendations.sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

/**
 * Get affiliate disclosure text
 */
export function getAffiliateDisclosure(): string {
  return "This page contains affiliate links. We may earn a commission if you make a purchase through these links, at no additional cost to you. This helps support the development of NutBot.";
}

/**
 * Track affiliate click (stub - implement with analytics)
 */
export function trackAffiliateClick(productId: string, userId?: string): void {
  // In production, send to analytics
  console.log('[Affiliate Click]', { productId, userId, timestamp: new Date() });
}
