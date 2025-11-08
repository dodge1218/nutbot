/**
 * Reference Daily Values (DVs) for nutrition labels
 * Based on FDA guidelines and general adult recommendations
 * 
 * Note: These are approximate values. Individual needs vary based on:
 * - Age, sex, weight, height
 * - Activity level
 * - Medical conditions
 * - Life stage (pregnancy, lactation, etc.)
 */

export interface DailyValues {
  // Macronutrients
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  
  // Vitamins (fat-soluble)
  vitaminA: number; // mcg RAE
  vitaminD: number; // mcg
  vitaminE: number; // mg
  vitaminK: number; // mcg
  
  // Vitamins (water-soluble)
  vitaminC: number; // mg
  thiamin: number; // mg (B1)
  riboflavin: number; // mg (B2)
  niacin: number; // mg (B3)
  vitaminB6: number; // mg
  folate: number; // mcg DFE
  vitaminB12: number; // mcg
  biotin: number; // mcg
  pantothenicAcid: number; // mg
  
  // Minerals
  calcium: number; // mg
  iron: number; // mg
  magnesium: number; // mg
  phosphorus: number; // mg
  potassium: number; // mg
  sodium: number; // mg
  zinc: number; // mg
  selenium: number; // mcg
  copper: number; // mg
  manganese: number; // mg
  chromium: number; // mcg
  iodine: number; // mcg
  
  // Other
  omega3: number; // mg (EPA + DHA)
  water: number; // ml
}

// Standard adult female (moderately active, ~2000 kcal)
export const DAILY_VALUES_FEMALE: DailyValues = {
  // Macros
  calories: 2000,
  protein: 50, // ~10-35% of calories
  carbs: 275, // ~45-65% of calories
  fat: 78, // ~20-35% of calories
  fiber: 28,
  
  // Fat-soluble vitamins
  vitaminA: 700,
  vitaminD: 15,
  vitaminE: 15,
  vitaminK: 90,
  
  // Water-soluble vitamins
  vitaminC: 75,
  thiamin: 1.1,
  riboflavin: 1.1,
  niacin: 14,
  vitaminB6: 1.3,
  folate: 400,
  vitaminB12: 2.4,
  biotin: 30,
  pantothenicAcid: 5,
  
  // Minerals
  calcium: 1000,
  iron: 18, // Higher for menstruating women
  magnesium: 310,
  phosphorus: 700,
  potassium: 2600,
  sodium: 2300, // Upper limit
  zinc: 8,
  selenium: 55,
  copper: 0.9,
  manganese: 1.8,
  chromium: 25,
  iodine: 150,
  
  // Other
  omega3: 1100,
  water: 2700,
};

// Standard adult male (moderately active, ~2500 kcal)
export const DAILY_VALUES_MALE: DailyValues = {
  // Macros
  calories: 2500,
  protein: 56,
  carbs: 344,
  fat: 97,
  fiber: 34,
  
  // Fat-soluble vitamins
  vitaminA: 900,
  vitaminD: 15,
  vitaminE: 15,
  vitaminK: 120,
  
  // Water-soluble vitamins
  vitaminC: 90,
  thiamin: 1.2,
  riboflavin: 1.3,
  niacin: 16,
  vitaminB6: 1.3,
  folate: 400,
  vitaminB12: 2.4,
  biotin: 30,
  pantothenicAcid: 5,
  
  // Minerals
  calcium: 1000,
  iron: 8,
  magnesium: 400,
  phosphorus: 700,
  potassium: 3400,
  sodium: 2300,
  zinc: 11,
  selenium: 55,
  copper: 0.9,
  manganese: 2.3,
  chromium: 35,
  iodine: 150,
  
  // Other
  omega3: 1600,
  water: 3700,
};

// Default "average adult" values (for FDA nutrition labels)
export const DAILY_VALUES_DEFAULT: DailyValues = {
  // Macros
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
  
  // Fat-soluble vitamins
  vitaminA: 900,
  vitaminD: 20,
  vitaminE: 15,
  vitaminK: 120,
  
  // Water-soluble vitamins
  vitaminC: 90,
  thiamin: 1.2,
  riboflavin: 1.3,
  niacin: 16,
  vitaminB6: 1.7,
  folate: 400,
  vitaminB12: 2.4,
  biotin: 30,
  pantothenicAcid: 5,
  
  // Minerals
  calcium: 1300,
  iron: 18,
  magnesium: 420,
  phosphorus: 1250,
  potassium: 4700,
  sodium: 2300,
  zinc: 11,
  selenium: 55,
  copper: 0.9,
  manganese: 2.3,
  chromium: 35,
  iodine: 150,
  
  // Other
  omega3: 1600,
  water: 3700,
};

/**
 * Get appropriate daily values based on user profile
 */
export function getDailyValues(userProfile?: {
  sex?: string;
  age?: number;
  activityLevel?: string;
  weight?: number;
}): DailyValues {
  if (!userProfile?.sex) {
    return DAILY_VALUES_DEFAULT;
  }
  
  const baseValues = userProfile.sex === 'male' 
    ? { ...DAILY_VALUES_MALE }
    : { ...DAILY_VALUES_FEMALE };
  
  // Adjust calories based on activity level
  if (userProfile.activityLevel) {
    const multipliers: Record<string, number> = {
      sedentary: 0.85,
      light: 0.95,
      moderate: 1.0,
      active: 1.15,
      very_active: 1.3,
    };
    
    const multiplier = multipliers[userProfile.activityLevel] || 1.0;
    baseValues.calories = Math.round(baseValues.calories * multiplier);
  }
  
  // Age adjustments for key nutrients
  if (userProfile.age) {
    if (userProfile.age > 50) {
      // Older adults need more vitamin D, B12, calcium
      baseValues.vitaminD = 20;
      baseValues.vitaminB12 = 2.4;
      baseValues.calcium = 1200;
    }
    
    if (userProfile.age > 70) {
      baseValues.vitaminD = 20;
    }
  }
  
  return baseValues;
}

/**
 * Nutrient categories for organization
 */
export const NUTRIENT_CATEGORIES = {
  macros: ['protein', 'carbs', 'fat', 'fiber'],
  vitamins: [
    'vitaminA', 'vitaminC', 'vitaminD', 'vitaminE', 'vitaminK',
    'thiamin', 'riboflavin', 'niacin', 'vitaminB6', 'folate', 'vitaminB12'
  ],
  minerals: [
    'calcium', 'iron', 'magnesium', 'potassium', 'sodium', 'zinc', 'selenium'
  ],
  electrolytes: ['sodium', 'potassium', 'magnesium', 'calcium'],
} as const;

/**
 * Display names for nutrients
 */
export const NUTRIENT_NAMES: Record<string, string> = {
  // Macros
  calories: 'Calories',
  protein: 'Protein',
  carbs: 'Carbohydrates',
  fat: 'Fat',
  fiber: 'Fiber',
  
  // Vitamins
  vitaminA: 'Vitamin A',
  vitaminC: 'Vitamin C',
  vitaminD: 'Vitamin D',
  vitaminE: 'Vitamin E',
  vitaminK: 'Vitamin K',
  thiamin: 'Vitamin B1 (Thiamin)',
  riboflavin: 'Vitamin B2 (Riboflavin)',
  niacin: 'Vitamin B3 (Niacin)',
  vitaminB6: 'Vitamin B6',
  folate: 'Folate',
  vitaminB12: 'Vitamin B12',
  
  // Minerals
  calcium: 'Calcium',
  iron: 'Iron',
  magnesium: 'Magnesium',
  potassium: 'Potassium',
  sodium: 'Sodium',
  zinc: 'Zinc',
  selenium: 'Selenium',
  
  // Other
  omega3: 'Omega-3 Fatty Acids',
};

/**
 * Units for display
 */
export const NUTRIENT_UNITS: Record<string, string> = {
  calories: 'kcal',
  protein: 'g',
  carbs: 'g',
  fat: 'g',
  fiber: 'g',
  
  vitaminA: 'mcg',
  vitaminC: 'mg',
  vitaminD: 'mcg',
  vitaminE: 'mg',
  vitaminK: 'mcg',
  thiamin: 'mg',
  riboflavin: 'mg',
  niacin: 'mg',
  vitaminB6: 'mg',
  folate: 'mcg',
  vitaminB12: 'mcg',
  
  calcium: 'mg',
  iron: 'mg',
  magnesium: 'mg',
  potassium: 'mg',
  sodium: 'mg',
  zinc: 'mg',
  selenium: 'mcg',
  
  omega3: 'mg',
};
