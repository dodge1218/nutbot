/**
 * Extended Comprehensive Food Database - Type Definitions
 */

export interface ExtendedFoodItem {
  // Identification
  id: string;
  name: string;
  commonNames: string[];
  category: 'vegetable' | 'fruit' | 'protein' | 'grain' | 'dairy' | 'legume' | 'nut' | 'seed' | 'oil' | 'fermented' | 'beverage' | 'herb' | 'spice';
  subcategory?: string; // e.g., 'leafy_green', 'citrus', 'poultry'
  
  // Classification
  brand?: string; // null for generic foods
  variant: 'raw' | 'cooked' | 'steamed' | 'roasted' | 'grilled' | 'fried' | 'baked' | 'canned' | 'frozen' | 'dried' | 'fermented';
  isOrganic: boolean;
  servingSize: string;
  
  // Macronutrients (per serving)
  calories: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  sugar?: number; // g
  saturatedFat?: number; // g
  
  // Vitamins (complete profile)
  vitaminA?: number; // mcg RAE
  vitaminC?: number; // mg
  vitaminD?: number; // mcg
  vitaminE?: number; // mg
  vitaminK?: number; // mcg
  vitaminB1?: number; // Thiamin mg
  vitaminB2?: number; // Riboflavin mg
  vitaminB3?: number; // Niacin mg (or niacin for backward compatibility)
  vitaminB6?: number; // mg
  vitaminB12?: number; // mcg
  folate?: number; // mcg DFE
  biotin?: number; // mcg
  pantothenicAcid?: number; // mg
  
  // Minerals (complete profile)
  calcium?: number; // mg
  iron?: number; // mg
  magnesium?: number; // mg
  phosphorus?: number; // mg
  potassium?: number; // mg
  sodium?: number; // mg
  zinc?: number; // mg
  copper?: number; // mg
  manganese?: number; // mg
  selenium?: number; // mcg
  iodine?: number; // mcg
  chromium?: number; // mcg
  molybdenum?: number; // mcg
  
  // Phytonutrients & Bioactives
  polyphenols?: number; // mg
  carotenoids?: number; // mcg (beta-carotene, lutein, zeaxanthin)
  flavonoids?: number; // mg
  anthocyanins?: number; // mg
  omega3?: number; // g (ALA, EPA, DHA combined)
  omega6?: number; // g
  choline?: number; // mg
  
  // Gut Health Markers
  isFermented: boolean;
  probioticStrains?: string[]; // e.g., ['Lactobacillus acidophilus', 'Bifidobacterium']
  prebioticFiber?: number; // g (inulin, FOS, resistant starch)
  resistantStarch?: number; // g
  
  // Food Quality Indicators
  isWholeFood: boolean;
  isProcessed: boolean;
  isUltraProcessed: boolean;
  glycemicIndex?: number; // 0-100
  glycemicLoad?: number;
  
  // Allergens & Dietary Restrictions
  allergens: string[]; // ['gluten', 'dairy', 'nuts', 'soy', 'shellfish', 'eggs', 'fish']
  isVegan: boolean;
  isVegetarian: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isKeto: boolean;
  isPaleo: boolean;
  
  // Interactions
  synergies?: string[]; // IDs of foods that enhance absorption
  antagonists?: string[]; // IDs of foods that inhibit absorption
}
