/**
 * AI-Powered Food Recognition Service
 * 
 * Uses OpenAI's GPT-4 Vision API to analyze food images and extract:
 * - Food identification
 * - Portion size estimation
 * - Ingredients (for prepared dishes)
 * - Preparation method
 * 
 * Then matches against our food database for complete nutritional data.
 */

import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

export interface FoodRecognitionResult {
  foodName: string;
  category: string;
  confidence: number; // 0-100
  portionEstimate: {
    amount: number;
    unit: string;
    grams?: number;
  };
  ingredients?: string[];
  preparation?: string;
  matchedFoodId?: string;
  nutrients?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
}

/**
 * Analyze a food image using GPT-4 Vision
 */
export async function recognizeFoodFromImage(
  imageUrl: string
): Promise<FoodRecognitionResult> {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this food image and provide detailed information. Be as specific as possible.

Return your analysis as a JSON object with this exact structure:
{
  "food_name": "specific name of the food",
  "category": "one of: vegetable, fruit, protein, grain, dairy, legume, nut, seed, beverage, prepared_meal",
  "confidence": 0-100 (how confident you are in this identification),
  "portion_estimate": {
    "amount": estimated number,
    "unit": "cup, oz, piece, slice, tbsp, etc.",
    "grams": estimated weight in grams
  },
  "ingredients": ["ingredient1", "ingredient2"] (if it's a prepared dish),
  "preparation": "raw, cooked, grilled, fried, baked, steamed, roasted, etc.",
  "visual_cues": ["cue1", "cue2"] (what helped you identify it),
  "serving_context": "description of how it's plated/served"
}

Important:
- Be conservative with portion estimates
- For prepared meals, list all visible ingredients
- Note if you can see brand packaging or labels
- Indicate if multiple food items are visible
- If uncertain, lower the confidence score`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      temperature: 0.3, // Lower temperature for more consistent results
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from vision API');
    }

    // Extract JSON from response (GPT sometimes adds markdown formatting)
    let jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from vision API response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Convert to our format
    const result: FoodRecognitionResult = {
      foodName: parsed.food_name,
      category: parsed.category,
      confidence: parsed.confidence,
      portionEstimate: {
        amount: parsed.portion_estimate.amount,
        unit: parsed.portion_estimate.unit,
        grams: parsed.portion_estimate.grams,
      },
      ingredients: parsed.ingredients,
      preparation: parsed.preparation,
    };

    return result;
  } catch (error) {
    console.error('Food recognition error:', error);
    throw new Error(
      `Failed to recognize food from image: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

/**
 * Match recognized food against our database
 */
export async function matchFoodToDatabase(
  recognizedFood: FoodRecognitionResult
): Promise<FoodRecognitionResult> {
  // Import dynamically to avoid circular dependencies
  const { FOODS_DATABASE } = await import('@/data/foods');
  const { EXTENDED_FOODS_DATABASE, searchExtendedFoods } = await import(
    '@/data/foods-extended'
  );

  // Try exact match first
  let matched = EXTENDED_FOODS_DATABASE.find(
    (food) =>
      food.name.toLowerCase().includes(recognizedFood.foodName.toLowerCase()) ||
      food.commonNames.some((name) =>
        name.toLowerCase().includes(recognizedFood.foodName.toLowerCase())
      )
  );

  // Try fuzzy search in extended database
  if (!matched) {
    const searchResults = searchExtendedFoods(recognizedFood.foodName);
    if (searchResults.length > 0) {
      // Find best match considering preparation method
      matched = searchResults.find(
        (food) =>
          recognizedFood.preparation &&
          food.variant === recognizedFood.preparation
      );
      if (!matched) {
        matched = searchResults[0]; // Take first result if no preparation match
      }
    }
  }

  // Fallback to original database
  if (!matched) {
    const fallbackMatch = FOODS_DATABASE.find((food) =>
      food.name.toLowerCase().includes(recognizedFood.foodName.toLowerCase())
    );
    if (fallbackMatch) {
      return {
        ...recognizedFood,
        matchedFoodId: fallbackMatch.id,
        nutrients: {
          calories: fallbackMatch.calories ?? 0,
          protein: fallbackMatch.protein ?? 0,
          carbs: fallbackMatch.carbs ?? 0,
          fat: fallbackMatch.fat ?? 0,
          fiber: fallbackMatch.fiber ?? 0,
        },
      };
    }
  }

  // If we found a match in extended database
  if (matched) {
    // Calculate nutrients based on portion estimate
    const portionMultiplier = recognizedFood.portionEstimate.grams
      ? recognizedFood.portionEstimate.grams / 100 // Extended DB is per 100g
      : 1;

    return {
      ...recognizedFood,
      matchedFoodId: matched.id,
      nutrients: {
        calories: Math.round(matched.calories * portionMultiplier),
        protein: Math.round(matched.protein * portionMultiplier * 10) / 10,
        carbs: Math.round(matched.carbs * portionMultiplier * 10) / 10,
        fat: Math.round(matched.fat * portionMultiplier * 10) / 10,
        fiber: matched.fiber
          ? Math.round(matched.fiber * portionMultiplier * 10) / 10
          : undefined,
      },
    };
  }

  // No match found - return recognition result without database match
  return {
    ...recognizedFood,
    // Estimate nutrients based on category and portion if no match
    nutrients: estimateNutrientsFromCategory(
      recognizedFood.category,
      recognizedFood.portionEstimate.grams || 100
    ),
  };
}

/**
 * Estimate nutrients when no database match is found
 * This provides rough estimates based on food category
 */
function estimateNutrientsFromCategory(
  category: string,
  grams: number
): { calories: number; protein: number; carbs: number; fat: number } {
  // Very rough estimates per 100g
  const categoryDefaults: Record<
    string,
    { calories: number; protein: number; carbs: number; fat: number }
  > = {
    vegetable: { calories: 25, protein: 2, carbs: 5, fat: 0.2 },
    fruit: { calories: 60, protein: 0.5, carbs: 15, fat: 0.2 },
    protein: { calories: 200, protein: 25, carbs: 0, fat: 10 },
    grain: { calories: 150, protein: 5, carbs: 30, fat: 1 },
    dairy: { calories: 100, protein: 8, carbs: 5, fat: 5 },
    legume: { calories: 120, protein: 8, carbs: 20, fat: 0.5 },
    nut: { calories: 600, protein: 20, carbs: 20, fat: 50 },
    seed: { calories: 500, protein: 18, carbs: 25, fat: 40 },
  };

  const defaults =
    categoryDefaults[category] || categoryDefaults.vegetable;
  const multiplier = grams / 100;

  return {
    calories: Math.round(defaults.calories * multiplier),
    protein: Math.round(defaults.protein * multiplier * 10) / 10,
    carbs: Math.round(defaults.carbs * multiplier * 10) / 10,
    fat: Math.round(defaults.fat * multiplier * 10) / 10,
  };
}

/**
 * Analyze multiple foods in one image
 */
export async function recognizeMultipleFoods(
  imageUrl: string
): Promise<FoodRecognitionResult[]> {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this image and identify ALL separate food items visible. 

For EACH food item, provide detailed information as a JSON array:
[
  {
    "food_name": "specific name",
    "category": "vegetable/fruit/protein/etc",
    "confidence": 0-100,
    "portion_estimate": {
      "amount": number,
      "unit": "cup/oz/piece/etc",
      "grams": estimated_grams
    },
    "preparation": "raw/cooked/etc"
  },
  ... more items
]

If it's a single food item, still return an array with one object.
If it's a complex meal, break it down into individual components.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from vision API');
    }

    // Extract JSON array
    let jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON array from vision API response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Convert each item
    const results: FoodRecognitionResult[] = parsed.map((item: any) => ({
      foodName: item.food_name,
      category: item.category,
      confidence: item.confidence,
      portionEstimate: {
        amount: item.portion_estimate.amount,
        unit: item.portion_estimate.unit,
        grams: item.portion_estimate.grams,
      },
      preparation: item.preparation,
    }));

    // Match each food to database
    const matchedResults = await Promise.all(
      results.map((result) => matchFoodToDatabase(result))
    );

    return matchedResults;
  } catch (error) {
    console.error('Multiple food recognition error:', error);
    throw new Error(
      `Failed to recognize foods from image: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
