#!/usr/bin/env node

/**
 * USDA FoodData Central Import Script
 * 
 * This script imports food data from the USDA FoodData Central API
 * and converts it to our extended food database format.
 * 
 * Usage:
 *   node scripts/import-usda-foods.js --category vegetables --limit 50
 *   node scripts/import-usda-foods.js --search "spinach" --limit 10
 *   node scripts/import-usda-foods.js --fdc-id 170457
 * 
 * Requirements:
 *   - USDA API key (get from https://fdc.nal.usda.gov/api-key-signup.html)
 *   - Set USDA_API_KEY environment variable or create .env file
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const USDA_API_BASE = 'https://api.nal.usda.gov/fdc/v1';
const API_KEY = process.env.USDA_API_KEY || '';

if (!API_KEY) {
  console.error('❌ Error: USDA_API_KEY not set');
  console.error('Get your API key from: https://fdc.nal.usda.gov/api-key-signup.html');
  console.error('Then set it: export USDA_API_KEY="your-key-here"');
  process.exit(1);
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  category: null,
  search: null,
  fdcId: null,
  limit: 10,
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--category' && args[i + 1]) {
    options.category = args[i + 1];
    i++;
  } else if (args[i] === '--search' && args[i + 1]) {
    options.search = args[i + 1];
    i++;
  } else if (args[i] === '--fdc-id' && args[i + 1]) {
    options.fdcId = args[i + 1];
    i++;
  } else if (args[i] === '--limit' && args[i + 1]) {
    options.limit = parseInt(args[i + 1]);
    i++;
  }
}

/**
 * USDA Nutrient ID Mapping to our schema
 */
const NUTRIENT_MAPPING = {
  // Energy
  '1008': 'calories', // kcal
  
  // Macronutrients
  '1003': 'protein', // g
  '1005': 'carbs', // g (total carbohydrate)
  '1004': 'fat', // g (total lipid)
  '1079': 'fiber', // g (total dietary fiber)
  '2000': 'sugar', // g (total sugars)
  '1258': 'saturatedFat', // g (SFA)
  
  // Vitamins
  '1106': 'vitaminA', // mcg RAE
  '1162': 'vitaminC', // mg
  '1114': 'vitaminD', // mcg (D2 + D3)
  '1109': 'vitaminE', // mg
  '1185': 'vitaminK', // mcg
  '1165': 'vitaminB1', // mg (thiamin)
  '1166': 'vitaminB2', // mg (riboflavin)
  '1167': 'vitaminB3', // mg (niacin)
  '1175': 'vitaminB6', // mg
  '1178': 'vitaminB12', // mcg
  '1190': 'folate', // mcg DFE
  '1176': 'biotin', // mcg
  '1170': 'pantothenicAcid', // mg
  
  // Minerals
  '1087': 'calcium', // mg
  '1089': 'iron', // mg
  '1090': 'magnesium', // mg
  '1091': 'phosphorus', // mg
  '1092': 'potassium', // mg
  '1093': 'sodium', // mg
  '1095': 'zinc', // mg
  '1098': 'copper', // mg
  '1101': 'manganese', // mg
  '1103': 'selenium', // mcg
  '1100': 'iodine', // mcg
  '1096': 'chromium', // mcg
  '1102': 'molybdenum', // mcg
  
  // Other nutrients
  '1180': 'choline', // mg
};

/**
 * Make HTTPS request to USDA API
 */
function makeRequest(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const queryParams = new URLSearchParams({
      api_key: API_KEY,
      ...params,
    });
    
    const url = `${USDA_API_BASE}${endpoint}?${queryParams}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Search for foods
 */
async function searchFoods(query, limit = 10) {
  console.log(`🔍 Searching for: ${query}`);
  
  const result = await makeRequest('/foods/search', {
    query,
    pageSize: limit,
    dataType: ['Foundation', 'SR Legacy'], // Use high-quality databases
  });
  
  return result.foods || [];
}

/**
 * Get detailed food information by FDC ID
 */
async function getFoodDetails(fdcId) {
  console.log(`📊 Fetching details for FDC ID: ${fdcId}`);
  return await makeRequest(`/food/${fdcId}`);
}

/**
 * Convert USDA food to our extended format
 */
function convertToExtendedFormat(usdaFood) {
  const nutrients = {};
  
  // Map nutrients
  if (usdaFood.foodNutrients) {
    usdaFood.foodNutrients.forEach(nutrient => {
      const nutrientId = nutrient.nutrient?.id?.toString();
      const fieldName = NUTRIENT_MAPPING[nutrientId];
      
      if (fieldName && nutrient.amount) {
        nutrients[fieldName] = parseFloat(nutrient.amount.toFixed(2));
      }
    });
  }
  
  // Determine category from food category
  let category = 'vegetable'; // default
  let subcategory = null;
  
  const foodCategory = usdaFood.foodCategory?.description?.toLowerCase() || '';
  const description = usdaFood.description?.toLowerCase() || '';
  
  if (foodCategory.includes('vegetable') || description.includes('vegetable')) {
    category = 'vegetable';
    if (description.includes('spinach') || description.includes('kale') || description.includes('lettuce')) {
      subcategory = 'leafy_green';
    } else if (description.includes('broccoli') || description.includes('cauliflower') || description.includes('cabbage')) {
      subcategory = 'cruciferous';
    } else if (description.includes('carrot') || description.includes('potato') || description.includes('beet')) {
      subcategory = 'root';
    }
  } else if (foodCategory.includes('fruit') || description.includes('fruit')) {
    category = 'fruit';
    if (description.includes('berry') || description.includes('berries')) {
      subcategory = 'berry';
    } else if (description.includes('orange') || description.includes('lemon') || description.includes('lime')) {
      subcategory = 'citrus';
    }
  } else if (foodCategory.includes('protein') || description.includes('meat') || description.includes('poultry') || description.includes('fish')) {
    category = 'protein';
    if (description.includes('chicken') || description.includes('turkey')) {
      subcategory = 'poultry';
    } else if (description.includes('beef') || description.includes('pork')) {
      subcategory = 'meat';
    } else if (description.includes('fish') || description.includes('salmon') || description.includes('tuna')) {
      subcategory = 'fish';
    }
  } else if (foodCategory.includes('dairy') || description.includes('milk') || description.includes('cheese') || description.includes('yogurt')) {
    category = 'dairy';
  } else if (foodCategory.includes('grain') || description.includes('bread') || description.includes('rice') || description.includes('oat')) {
    category = 'grain';
  }
  
  // Determine variant from description
  let variant = 'raw';
  if (description.includes('cooked') || description.includes('boiled')) {
    variant = 'cooked';
  } else if (description.includes('steamed')) {
    variant = 'steamed';
  } else if (description.includes('roasted')) {
    variant = 'roasted';
  } else if (description.includes('grilled')) {
    variant = 'grilled';
  } else if (description.includes('fried')) {
    variant = 'fried';
  } else if (description.includes('baked')) {
    variant = 'baked';
  } else if (description.includes('canned')) {
    variant = 'canned';
  } else if (description.includes('frozen')) {
    variant = 'frozen';
  } else if (description.includes('dried')) {
    variant = 'dried';
  }
  
  // Determine if organic (USDA data doesn't usually specify)
  const isOrganic = description.includes('organic');
  
  // Generate ID
  const id = usdaFood.description
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Get common names
  const commonNames = [];
  if (usdaFood.additionalDescriptions) {
    commonNames.push(...usdaFood.additionalDescriptions);
  }
  
  // Dietary flags (conservative defaults - may need manual review)
  const isVegan = !['protein', 'dairy'].includes(category) && !description.includes('egg');
  const isVegetarian = category !== 'protein' || description.includes('egg');
  const isGlutenFree = !description.includes('wheat') && !description.includes('barley') && !description.includes('rye');
  const isDairyFree = category !== 'dairy' && !description.includes('milk') && !description.includes('cheese');
  const isKeto = (nutrients.carbs || 100) < 10; // < 10g carbs per serving
  const isPaleo = ['vegetable', 'fruit', 'protein', 'nut'].includes(category) && !description.includes('processed');
  
  return {
    id,
    name: usdaFood.description,
    commonNames,
    category,
    subcategory,
    variant,
    isOrganic,
    servingSize: '100g', // USDA data is typically per 100g
    
    ...nutrients,
    
    // Gut health
    isFermented: description.includes('fermented') || description.includes('yogurt') || description.includes('kimchi'),
    
    // Food quality
    isWholeFood: !description.includes('processed'),
    isProcessed: description.includes('processed') || variant === 'canned',
    isUltraProcessed: description.includes('ultra-processed'),
    
    // Dietary flags
    allergens: [],
    isVegan,
    isVegetarian,
    isGlutenFree,
    isDairyFree,
    isKeto,
    isPaleo,
    
    // Metadata
    dataSource: `USDA:${usdaFood.fdcId}`,
    verified: false, // Requires manual review
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 USDA Food Data Import Script\n');
  
  let foods = [];
  
  try {
    if (options.fdcId) {
      // Get specific food by FDC ID
      const foodDetails = await getFoodDetails(options.fdcId);
      foods = [foodDetails];
    } else if (options.search) {
      // Search for foods
      foods = await searchFoods(options.search, options.limit);
    } else if (options.category) {
      // Search by category
      const categorySearchTerms = {
        vegetables: 'vegetables',
        fruits: 'fruits',
        proteins: 'meat poultry fish',
        dairy: 'milk cheese yogurt',
        grains: 'rice wheat oat bread',
      };
      
      const searchTerm = categorySearchTerms[options.category] || options.category;
      foods = await searchFoods(searchTerm, options.limit);
    } else {
      console.error('❌ Please specify --category, --search, or --fdc-id');
      process.exit(1);
    }
    
    console.log(`\n✅ Found ${foods.length} foods\n`);
    
    // Convert foods
    const convertedFoods = foods.map(food => {
      try {
        return convertToExtendedFormat(food);
      } catch (e) {
        console.error(`⚠️  Error converting ${food.description}:`, e.message);
        return null;
      }
    }).filter(Boolean);
    
    console.log(`✅ Successfully converted ${convertedFoods.length} foods\n`);
    
    // Display results
    convertedFoods.forEach((food, index) => {
      console.log(`${index + 1}. ${food.name}`);
      console.log(`   ID: ${food.id}`);
      console.log(`   Category: ${food.category}${food.subcategory ? ` (${food.subcategory})` : ''}`);
      console.log(`   Variant: ${food.variant}`);
      console.log(`   Macros: ${food.calories || '?'} cal, ${food.protein || '?'}g protein, ${food.carbs || '?'}g carbs, ${food.fat || '?'}g fat`);
      console.log(`   Source: ${food.dataSource}`);
      console.log('');
    });
    
    // Save to file
    const outputDir = path.join(__dirname, '../data/imported');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const outputFile = path.join(outputDir, `usda-foods-${timestamp}.json`);
    
    fs.writeFileSync(outputFile, JSON.stringify(convertedFoods, null, 2));
    console.log(`💾 Saved to: ${outputFile}`);
    console.log('\n✅ Done! Review the imported foods and add them to foods-extended.ts');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
