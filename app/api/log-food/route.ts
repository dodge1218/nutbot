import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { foods } = body;

    if (!foods || !Array.isArray(foods)) {
      return NextResponse.json({ error: 'Invalid foods data' }, { status: 400 });
    }

    // Create food entries
    const entries = await Promise.all(
      foods.map(async (food: any) => {
        return prisma.foodEntry.create({
          data: {
            userId: user.id,
            foodName: food.name,
            foodId: food.id,
            quantity: 1, // Default to 1 serving
            unit: food.servingSize || 'serving',
            mealType: 'snack', // Default meal type
            timestamp: new Date(),
            
            // Macros
            calories: food.calories,
            protein: food.protein,
            carbs: food.carbs,
            fat: food.fat,
            fiber: food.fiber,

            // Vitamins
            vitaminA: food.vitaminA,
            vitaminC: food.vitaminC,
            vitaminD: food.vitaminD,
            vitaminE: food.vitaminE,
            vitaminK: food.vitaminK,
            vitaminB6: food.vitaminB6,
            vitaminB12: food.vitaminB12,
            folate: food.folate,
            thiamin: food.thiamin,
            riboflavin: food.riboflavin,
            niacin: food.niacin,
            
            // Minerals
            calcium: food.calcium,
            iron: food.iron,
            magnesium: food.magnesium,
            potassium: food.potassium,
            sodium: food.sodium,
            zinc: food.zinc,
            selenium: food.selenium,
            
            // Gut health markers
            isFermented: food.isFermented || false,
            isHighFiber: food.isHighFiber || false,
            isPolyphenolRich: food.isPolyphenolRich || false,
            isUltraProcessed: food.isUltraProcessed || false,
          },
        });
      })
    );

    return NextResponse.json({ success: true, count: entries.length });
  } catch (error) {
    console.error('Error logging food:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
