import { NextRequest, NextResponse } from 'next/server';
import { getProductRecommendations } from '@/lib/affiliate';
import { generateSupplementRecommendations } from '@/lib/nutritionEngine';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gaps, userPreferences } = body;

    if (!gaps || !Array.isArray(gaps)) {
      return NextResponse.json(
        { error: 'Invalid request: gaps must be an array' },
        { status: 400 }
      );
    }

    // Generate food-first recommendations
    const foodRecommendations = generateSupplementRecommendations(gaps);

    // Generate product recommendations (if user has enabled them)
    let productRecommendations: any[] = [];
    if (userPreferences?.showSupplements !== false) {
      productRecommendations = getProductRecommendations(gaps);
    }

    return NextResponse.json({
      success: true,
      foodRecommendations,
      productRecommendations,
      totalGaps: gaps.length,
    });
  } catch (error: any) {
    console.error('Error generating suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions', details: error.message },
      { status: 500 }
    );
  }
}
