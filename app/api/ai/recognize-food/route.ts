import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  recognizeFoodFromImage,
  recognizeMultipleFoods,
  matchFoodToDatabase,
} from '@/lib/ai/foodRecognition';

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 seconds for AI processing

/**
 * POST /api/ai/recognize-food
 * 
 * Recognize food from an image using AI
 * 
 * Body:
 *   - imageUrl: string (URL of the image to analyze)
 *   - multipleItems: boolean (optional, detect multiple food items)
 * 
 * Returns:
 *   - Single item: FoodRecognitionResult
 *   - Multiple items: FoodRecognitionResult[]
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to use AI features.' },
        { status: 401 }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error:
            'AI features not configured. Please contact support or configure OPENAI_API_KEY.',
        },
        { status: 503 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { imageUrl, multipleItems = false } = body;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request. imageUrl is required and must be a string.' },
        { status: 400 }
      );
    }

    // Validate image URL
    try {
      new URL(imageUrl);
    } catch (e) {
      return NextResponse.json(
        { error: 'Invalid image URL format.' },
        { status: 400 }
      );
    }

    // Log usage for analytics
    console.log(
      `[AI Food Recognition] User: ${session.user.email}, Image: ${imageUrl}, Multiple: ${multipleItems}`
    );

    // Process image with AI
    let result;
    if (multipleItems) {
      result = await recognizeMultipleFoods(imageUrl);
    } else {
      const singleResult = await recognizeFoodFromImage(imageUrl);
      result = await matchFoodToDatabase(singleResult);
    }

    // Return results
    return NextResponse.json(
      {
        success: true,
        data: result,
        message: multipleItems
          ? `Recognized ${Array.isArray(result) ? result.length : 0} food items`
          : 'Food recognized successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[AI Food Recognition Error]:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          {
            error:
              'AI service rate limit reached. Please try again in a few moments.',
          },
          { status: 429 }
        );
      }

      if (error.message.includes('invalid image')) {
        return NextResponse.json(
          { error: 'Could not process image. Please ensure it\'s a valid image URL.' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to recognize food from image.',
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/ai/recognize-food/status
 * 
 * Check if AI food recognition is available
 */
export async function GET() {
  const isConfigured = !!process.env.OPENAI_API_KEY;

  return NextResponse.json({
    available: isConfigured,
    features: {
      singleItemRecognition: isConfigured,
      multipleItemRecognition: isConfigured,
      portionEstimation: isConfigured,
      ingredientDetection: isConfigured,
      databaseMatching: true, // Always available
    },
    message: isConfigured
      ? 'AI food recognition is available'
      : 'AI food recognition requires OpenAI API key configuration',
  });
}
