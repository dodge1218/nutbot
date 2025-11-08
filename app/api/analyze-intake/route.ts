import { NextRequest, NextResponse } from 'next/server';
import { analyzeDailyIntake } from '@/lib/nutritionEngine';
import { getFoodById } from '@/data/foods';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { foodIds, userProfile } = body;

    if (!foodIds || !Array.isArray(foodIds)) {
      return NextResponse.json(
        { error: 'Invalid request: foodIds must be an array' },
        { status: 400 }
      );
    }

    // Get food items
    const foods = foodIds
      .map((id: string) => getFoodById(id))
      .filter(Boolean);

    if (foods.length === 0) {
      return NextResponse.json(
        { error: 'No valid foods found' },
        { status: 400 }
      );
    }

    // Analyze intake
    const analysis = analyzeDailyIntake(foods as any, userProfile);

    return NextResponse.json({
      success: true,
      analysis,
      foodsAnalyzed: foods.length,
    });
  } catch (error: any) {
    console.error('Error analyzing intake:', error);
    return NextResponse.json(
      { error: 'Failed to analyze intake', details: error.message },
      { status: 500 }
    );
  }
}
