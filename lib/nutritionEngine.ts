import { getDailyValues, NUTRIENT_NAMES, NUTRIENT_UNITS } from './dailyValues';

export interface FoodItem {
  id: string;
  name: string;
  
  // Macros (per serving)
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  
  // Vitamins
  vitaminA?: number;
  vitaminC?: number;
  vitaminD?: number;
  vitaminE?: number;
  vitaminK?: number;
  vitaminB6?: number;
  vitaminB12?: number;
  folate?: number;
  thiamin?: number;
  riboflavin?: number;
  niacin?: number;
  
  // Minerals
  calcium?: number;
  iron?: number;
  magnesium?: number;
  potassium?: number;
  sodium?: number;
  zinc?: number;
  selenium?: number;
  
  // Gut health markers
  isFermented?: boolean;
  isHighFiber?: boolean;
  isPolyphenolRich?: boolean;
  isUltraProcessed?: boolean;
  
  // Metadata
  servingSize?: string;
  category?: string;
}

export interface NutrientTotals {
  [key: string]: number;
}

export interface NutrientGap {
  nutrient: string;
  name: string;
  current: number;
  target: number;
  percentDV: number;
  severity: 'low' | 'medium' | 'high'; // How urgent to fix
  category: 'deficit' | 'surplus' | 'optimal';
}

export interface SynergySuggestion {
  type: 'synergy' | 'antisynergy' | 'timing';
  nutrientsInvolved: string[];
  message: string;
  actionable: string;
  priority: 'low' | 'medium' | 'high';
}

export interface GutHealthScore {
  score: number; // 0-100
  fiberGrams: number;
  fermentedFoods: number;
  plantDiversity: number;
  ultraProcessedCount: number;
  recommendations: string[];
}

export interface AnalysisResult {
  totals: NutrientTotals;
  gaps: NutrientGap[];
  synergySuggestions: SynergySuggestion[];
  timingSuggestions: SynergySuggestion[];
  gutHealthScore: GutHealthScore;
  topPriorities: string[]; // Top 3 things to fix today
}

/**
 * Analyze daily intake against targets
 */
export function analyzeDailyIntake(
  foods: FoodItem[],
  userProfile?: { sex?: string; age?: number; activityLevel?: string; weight?: number }
): AnalysisResult {
  const dailyValues = getDailyValues(userProfile);
  const totals = calculateTotals(foods);
  const gaps = identifyGaps(totals, dailyValues);
  const synergySuggestions = generateSynergySuggestions(foods, totals);
  const timingSuggestions = generateTimingSuggestions(foods);
  const gutHealthScore = calculateGutSupportScore(totals, foods);
  const topPriorities = determineTopPriorities(gaps, gutHealthScore);
  
  return {
    totals,
    gaps,
    synergySuggestions,
    timingSuggestions,
    gutHealthScore,
    topPriorities,
  };
}

/**
 * Calculate total nutrients from all foods
 */
export function calculateTotals(foods: FoodItem[]): NutrientTotals {
  const totals: NutrientTotals = {};
  
  const nutrientKeys = [
    'calories', 'protein', 'carbs', 'fat', 'fiber',
    'vitaminA', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminK',
    'vitaminB6', 'vitaminB12', 'folate', 'thiamin', 'riboflavin', 'niacin',
    'calcium', 'iron', 'magnesium', 'potassium', 'sodium', 'zinc', 'selenium'
  ];
  
  for (const key of nutrientKeys) {
    totals[key] = foods.reduce((sum, food) => {
      return sum + ((food as any)[key] || 0);
    }, 0);
  }
  
  return totals;
}

/**
 * Identify nutrient gaps (deficits and surpluses)
 */
function identifyGaps(totals: NutrientTotals, dailyValues: any): NutrientGap[] {
  const gaps: NutrientGap[] = [];
  
  for (const [nutrient, target] of Object.entries(dailyValues)) {
    if (nutrient === 'water' || nutrient === 'omega3') continue; // Skip for now
    
    const current = totals[nutrient] || 0;
    const percentDV = (current / (target as number)) * 100;
    
    let category: 'deficit' | 'surplus' | 'optimal' = 'optimal';
    let severity: 'low' | 'medium' | 'high' = 'low';
    
    // Sodium is special - we want to be under, not over
    if (nutrient === 'sodium') {
      if (percentDV > 120) {
        category = 'surplus';
        severity = percentDV > 150 ? 'high' : 'medium';
      } else if (percentDV >= 80) {
        category = 'optimal';
      } else {
        category = 'deficit';
        severity = 'low'; // Low sodium is usually fine
      }
    } else {
      // For other nutrients
      if (percentDV < 50) {
        category = 'deficit';
        severity = 'high';
      } else if (percentDV < 80) {
        category = 'deficit';
        severity = 'medium';
      } else if (percentDV >= 80 && percentDV <= 120) {
        category = 'optimal';
      } else if (percentDV > 150) {
        category = 'surplus';
        severity = percentDV > 200 ? 'high' : 'medium';
      }
    }
    
    if (category !== 'optimal') {
      gaps.push({
        nutrient,
        name: NUTRIENT_NAMES[nutrient] || nutrient,
        current,
        target: target as number,
        percentDV,
        severity,
        category,
      });
    }
  }
  
  // Sort by severity and magnitude
  return gaps.sort((a, b) => {
    const severityScore = { high: 3, medium: 2, low: 1 };
    if (severityScore[a.severity] !== severityScore[b.severity]) {
      return severityScore[b.severity] - severityScore[a.severity];
    }
    return Math.abs(b.percentDV - 100) - Math.abs(a.percentDV - 100);
  });
}

/**
 * Generate synergy and anti-synergy suggestions
 */
export function generateSynergySuggestions(
  foods: FoodItem[],
  totals: NutrientTotals
): SynergySuggestion[] {
  const suggestions: SynergySuggestion[] = [];
  
  const hasIron = (totals.iron || 0) > 5;
  const hasVitaminC = (totals.vitaminC || 0) > 20;
  const hasCalcium = (totals.calcium || 0) > 300;
  const isLowVitaminC = (totals.vitaminC || 0) < 30;
  const isHighCalcium = (totals.calcium || 0) > 800;
  
  // Iron + Vitamin C synergy
  if (hasIron && isLowVitaminC) {
    suggestions.push({
      type: 'synergy',
      nutrientsInvolved: ['iron', 'vitamin_c'],
      message: 'Your iron intake is good, but vitamin C is low',
      actionable: 'Add citrus, bell peppers, kiwi, or strawberries to boost iron absorption by up to 300%',
      priority: 'high',
    });
  }
  
  // Iron + Calcium anti-synergy
  if (hasIron && isHighCalcium) {
    suggestions.push({
      type: 'antisynergy',
      nutrientsInvolved: ['iron', 'calcium'],
      message: 'High calcium can reduce iron absorption',
      actionable: 'Consider spacing iron-rich meals and calcium supplements 2+ hours apart',
      priority: 'medium',
    });
  }
  
  // Vitamin D + Calcium synergy
  const hasVitaminD = (totals.vitaminD || 0) > 5;
  if (hasCalcium && !hasVitaminD) {
    suggestions.push({
      type: 'synergy',
      nutrientsInvolved: ['calcium', 'vitamin_d'],
      message: 'Calcium absorption is enhanced by vitamin D',
      actionable: 'Add fatty fish, fortified milk, or get 15 minutes of sunlight',
      priority: 'medium',
    });
  }
  
  // Magnesium + Vitamin D synergy
  const hasMagnesium = (totals.magnesium || 0) > 150;
  if (hasVitaminD && !hasMagnesium) {
    suggestions.push({
      type: 'synergy',
      nutrientsInvolved: ['vitamin_d', 'magnesium'],
      message: 'Vitamin D requires magnesium to be activated',
      actionable: 'Add pumpkin seeds, spinach, almonds, or dark chocolate',
      priority: 'medium',
    });
  }
  
  return suggestions;
}

/**
 * Generate meal timing suggestions
 */
export function generateTimingSuggestions(foods: FoodItem[]): SynergySuggestion[] {
  const suggestions: SynergySuggestion[] = [];
  
  // Check for iron-rich foods (placeholder - would use meal timestamps in real implementation)
  const hasIronRichFoods = foods.some(f => (f.iron || 0) > 2);
  
  if (hasIronRichFoods) {
    suggestions.push({
      type: 'timing',
      nutrientsInvolved: ['iron'],
      message: 'Coffee and tea reduce iron absorption',
      actionable: 'Wait 1-2 hours after iron-rich meals before having coffee or tea',
      priority: 'low',
    });
  }
  
  // Magnesium timing
  const hasMagnesium = foods.some(f => (f.magnesium || 0) > 50);
  if (hasMagnesium) {
    suggestions.push({
      type: 'timing',
      nutrientsInvolved: ['magnesium'],
      message: 'Magnesium promotes relaxation',
      actionable: 'Consider taking magnesium supplements in the evening for better sleep',
      priority: 'low',
    });
  }
  
  return suggestions;
}

/**
 * Calculate gut health support score
 */
export function calculateGutSupportScore(
  totals: NutrientTotals,
  foods: FoodItem[]
): GutHealthScore {
  const fiberGrams = totals.fiber || 0;
  const fermentedFoods = foods.filter(f => f.isFermented).length;
  const plantDiversity = new Set(
    foods.filter(f => !f.isUltraProcessed).map(f => f.category || f.name)
  ).size;
  const ultraProcessedCount = foods.filter(f => f.isUltraProcessed).length;
  
  // Score calculation (0-100)
  let score = 0;
  
  // Fiber contribution (0-40 points)
  score += Math.min((fiberGrams / 30) * 40, 40);
  
  // Fermented foods (0-20 points)
  score += Math.min(fermentedFoods * 10, 20);
  
  // Plant diversity (0-30 points)
  score += Math.min(plantDiversity * 3, 30);
  
  // Penalty for ultra-processed (-10 points max)
  score -= Math.min(ultraProcessedCount * 5, 10);
  
  score = Math.max(0, Math.min(100, score));
  
  // Recommendations
  const recommendations: string[] = [];
  
  if (fiberGrams < 25) {
    recommendations.push('Add high-fiber foods: lentils, beans, oats, or berries');
  }
  
  if (fermentedFoods === 0) {
    recommendations.push('Try adding fermented foods: yogurt, kefir, sauerkraut, or kimchi');
  }
  
  if (plantDiversity < 10) {
    recommendations.push('Aim for 30+ different plant foods per week for gut bacteria diversity');
  }
  
  if (ultraProcessedCount > 2) {
    recommendations.push('Reduce ultra-processed foods - they can harm beneficial gut bacteria');
  }
  
  if (score > 75) {
    recommendations.push('Great gut health support! Keep it up.');
  }
  
  return {
    score: Math.round(score),
    fiberGrams,
    fermentedFoods,
    plantDiversity,
    ultraProcessedCount,
    recommendations,
  };
}

/**
 * Determine top 3 priorities for the day
 */
function determineTopPriorities(gaps: NutrientGap[], gutHealth: GutHealthScore): string[] {
  const priorities: string[] = [];
  
  // Add top deficits
  const topDeficits = gaps
    .filter(g => g.category === 'deficit')
    .slice(0, 2)
    .map(g => `Increase ${g.name.toLowerCase()}`);
  
  priorities.push(...topDeficits);
  
  // Add gut health if score is low
  if (gutHealth.score < 60 && gutHealth.recommendations.length > 0) {
    priorities.push(gutHealth.recommendations[0]);
  }
  
  // Add surplus warnings if severe
  const severeSurplus = gaps.find(g => g.category === 'surplus' && g.severity === 'high');
  if (severeSurplus && priorities.length < 3) {
    priorities.push(`Reduce ${severeSurplus.name.toLowerCase()}`);
  }
  
  return priorities.slice(0, 3);
}

/**
 * Generate supplement recommendations based on gaps
 */
export function generateSupplementRecommendations(gaps: NutrientGap[]): {
  nutrient: string;
  name: string;
  reason: string;
  products: string[]; // Product IDs to match
}[] {
  const recommendations: any[] = [];
  
  const severeDeficits = gaps.filter(g => 
    g.category === 'deficit' && 
    (g.severity === 'high' || g.severity === 'medium')
  );
  
  for (const gap of severeDeficits) {
    const rec: any = {
      nutrient: gap.nutrient,
      name: gap.name,
      reason: `You're at ${Math.round(gap.percentDV)}% of daily value`,
      products: [],
    };
    
    // Map to product categories
    switch (gap.nutrient) {
      case 'iron':
        rec.products = ['iron', 'multivitamin'];
        break;
      case 'vitaminD':
        rec.products = ['vitamin_d', 'multivitamin'];
        break;
      case 'magnesium':
        rec.products = ['magnesium'];
        break;
      case 'calcium':
        rec.products = ['calcium', 'multivitamin'];
        break;
      case 'fiber':
        rec.products = ['fiber', 'prebiotic'];
        break;
      case 'potassium':
        rec.products = ['electrolytes'];
        break;
      case 'sodium':
        if (gap.percentDV < 50) {
          rec.products = ['electrolytes'];
        }
        break;
      case 'zinc':
        rec.products = ['zinc', 'multivitamin'];
        break;
    }
    
    if (rec.products.length > 0) {
      recommendations.push(rec);
    }
  }
  
  return recommendations.slice(0, 5); // Top 5 recommendations
}
