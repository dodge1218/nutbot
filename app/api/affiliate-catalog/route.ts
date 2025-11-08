import { NextRequest, NextResponse } from 'next/server';
import { AFFILIATE_PRODUCTS, matchProductsToGaps } from '@/lib/affiliate';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const nutrient = searchParams.get('nutrient');

    let products = [...AFFILIATE_PRODUCTS];

    // Filter by category if provided
    if (category) {
      products = products.filter(p => p.category === category);
    }

    // Filter by nutrient if provided
    if (nutrient) {
      products = products.filter(p =>
        p.fillsNutrients.some(n => 
          n.toLowerCase().includes(nutrient.toLowerCase())
        )
      );
    }

    // Sort by priority
    products.sort((a, b) => a.priority - b.priority);

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      filters: { category, nutrient },
    });
  } catch (error: any) {
    console.error('Error fetching affiliate catalog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gaps } = body;

    if (!gaps || !Array.isArray(gaps)) {
      return NextResponse.json(
        { error: 'Invalid request: gaps must be an array' },
        { status: 400 }
      );
    }

    const matchedProducts = matchProductsToGaps(gaps);

    return NextResponse.json({
      success: true,
      products: matchedProducts,
      count: matchedProducts.length,
      gapsAnalyzed: gaps.length,
    });
  } catch (error: any) {
    console.error('Error matching products:', error);
    return NextResponse.json(
      { error: 'Failed to match products', details: error.message },
      { status: 500 }
    );
  }
}
