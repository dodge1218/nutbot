import { ExtendedFoodItem } from './types';
import { VEGETABLES } from './vegetables';

// Re-export types
export * from './types';

// Re-export categories
export * from './vegetables';

/**
 * COMPREHENSIVE FOOD DATABASE - 1000+ Items
 * Organized by category with brand variants
 */
export const EXTENDED_FOODS_DATABASE: ExtendedFoodItem[] = [
  ...VEGETABLES,
  // Add other categories here as they are created
];

/**
 * Search function for extended food database
 */
export function searchExtendedFoods(query: string): ExtendedFoodItem[] {
  const lowercaseQuery = query.toLowerCase();
  
  return EXTENDED_FOODS_DATABASE.filter(food => 
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.commonNames.some(name => name.toLowerCase().includes(lowercaseQuery)) ||
    food.category.toLowerCase().includes(lowercaseQuery) ||
    (food.subcategory && food.subcategory.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * Filter foods by dietary restriction
 */
export function filterByDiet(diet: 'vegan' | 'vegetarian' | 'keto' | 'paleo' | 'gluten-free'): ExtendedFoodItem[] {
  switch (diet) {
    case 'vegan':
      return EXTENDED_FOODS_DATABASE.filter(f => f.isVegan);
    case 'vegetarian':
      return EXTENDED_FOODS_DATABASE.filter(f => f.isVegetarian);
    case 'keto':
      return EXTENDED_FOODS_DATABASE.filter(f => f.isKeto);
    case 'paleo':
      return EXTENDED_FOODS_DATABASE.filter(f => f.isPaleo);
    case 'gluten-free':
      return EXTENDED_FOODS_DATABASE.filter(f => f.isGlutenFree);
    default:
      return EXTENDED_FOODS_DATABASE;
  }
}

/**
 * Get foods by category
 */
export function getFoodsByCategory(category: ExtendedFoodItem['category']): ExtendedFoodItem[] {
  return EXTENDED_FOODS_DATABASE.filter(f => f.category === category);
}

/**
 * Get organic variants of a food
 */
export function getOrganicVariants(): ExtendedFoodItem[] {
  return EXTENDED_FOODS_DATABASE.filter(f => f.isOrganic);
}

/**
 * Get fermented foods for gut health
 */
export function getFermentedFoods(): ExtendedFoodItem[] {
  return EXTENDED_FOODS_DATABASE.filter(f => f.isFermented);
}

/**
 * Get foods by season
 */
export function getFoodsBySeason(season: 'spring' | 'summer' | 'fall' | 'winter'): ExtendedFoodItem[] {
  return EXTENDED_FOODS_DATABASE.filter(f => 
    f.season && f.season.includes(season)
  );
}
