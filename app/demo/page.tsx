import NutrientBadge from '@/components/NutrientBadge';
import GapAlert from '@/components/GapAlert';
import GutHealthScore from '@/components/GutHealthScore';
import PageTransition from '@/components/PageTransition';
import { analyzeDailyIntake } from '@/lib/nutritionEngine';
import { getDailyValues, NUTRIENT_NAMES, NUTRIENT_UNITS } from '@/lib/dailyValues';
import Link from 'next/link';

export default function DemoPage() {
  // Mock Data for Demo
  const mockFoods = [
    {
      id: '1',
      name: 'Oatmeal with Berries',
      quantity: 1,
      unit: 'bowl',
      calories: 350,
      protein: 12,
      carbs: 60,
      fat: 6,
      fiber: 8,
      vitaminC: 15,
      iron: 3.4,
      magnesium: 60,
      isHighFiber: true,
      isPolyphenolRich: true,
      timestamp: new Date(),
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      quantity: 1,
      unit: 'plate',
      calories: 450,
      protein: 40,
      carbs: 15,
      fat: 20,
      fiber: 5,
      vitaminA: 800,
      vitaminK: 120,
      potassium: 500,
      isFermented: false,
      timestamp: new Date(),
    }
  ];

  // Analyze intake with mock data
  const analysis = analyzeDailyIntake(mockFoods as any, {
    sex: 'female',
    age: 30,
    activityLevel: 'moderate',
  });

  const dailyValues = getDailyValues({ 
    sex: 'female', 
    age: 30, 
    activityLevel: 'moderate' 
  });

  const keyNutrients = [
    'protein',
    'fiber',
    'vitaminC',
    'vitaminD',
    'iron',
    'magnesium',
    'potassium',
    'calcium',
  ];

  const totalCalories = mockFoods.reduce((sum, food) => sum + (food.calories || 0), 0);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Demo Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👀</span>
            <div>
              <h3 className="font-bold text-blue-900">Demo Mode</h3>
              <p className="text-blue-700 text-sm">You are viewing a sample dashboard. Data is not saved.</p>
            </div>
          </div>
          <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Create Account
          </Link>
        </div>

        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">Welcome to NutBot!</h2>
                </div>
                <p className="text-primary-100 text-lg max-w-xl">
                  Here's a preview of your daily nutrition summary.
                </p>
              </div>
              <div className="text-right bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <div className="text-sm text-primary-100 mb-1">Calories Consumed</div>
                <div className="text-4xl font-bold">{Math.round(totalCalories)}</div>
                <div className="text-xs text-primary-200">Target: 2000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Analysis */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Gut Health Score */}
            <section>
              <GutHealthScore score={analysis.gutHealthScore} details={analysis.gutHealthDetails} />
            </section>

            {/* Nutrient Overview */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">📊</span> Nutrient Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {keyNutrients.map((nutrient) => (
                  <NutrientBadge
                    key={nutrient}
                    name={NUTRIENT_NAMES[nutrient] || nutrient}
                    value={analysis.totalNutrients[nutrient] || 0}
                    target={dailyValues[nutrient] || 100}
                    unit={NUTRIENT_UNITS[nutrient] || ''}
                  />
                ))}
              </div>
            </section>

            {/* Recent Meals (Mock) */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">🍽️</span> Recent Meals
              </h3>
              <div className="space-y-4">
                {mockFoods.map((food) => (
                  <div key={food.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl">
                        🥗
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{food.name}</h4>
                        <p className="text-sm text-gray-500">{food.quantity} {food.unit} • {food.calories} kcal</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Logged
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Alerts & Recommendations */}
          <div className="space-y-8">
            {/* Gap Alerts */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Attention Needed
              </h3>
              <div className="space-y-4">
                {analysis.gaps.length > 0 ? (
                  analysis.gaps.slice(0, 3).map((gap: any) => (
                    <GapAlert key={gap.nutrient} gap={gap} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No major nutrient gaps found! 🎉</p>
                  </div>
                )}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Ready to start?</h3>
              <p className="text-gray-300 mb-6">
                Create your account to save your data and get personalized recommendations.
              </p>
              <Link href="/signup" className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-xl font-bold transition-colors">
                Sign Up Free
              </Link>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
