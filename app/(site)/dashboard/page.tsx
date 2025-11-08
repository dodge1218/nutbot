import NutrientBadge from '@/components/NutrientBadge';
import GapAlert from '@/components/GapAlert';
import GutHealthScore from '@/components/GutHealthScore';
import PageTransition from '@/components/PageTransition';
import { FOODS_DATABASE } from '@/data/foods';
import { analyzeDailyIntake } from '@/lib/nutritionEngine';
import { getDailyValues, NUTRIENT_NAMES, NUTRIENT_UNITS } from '@/lib/dailyValues';

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export default function DashboardPage() {
  // Mock data - in production, fetch from database
  const sampleFoods = [
    FOODS_DATABASE.find((f: any) => f.id === 'oats'),
    FOODS_DATABASE.find((f: any) => f.id === 'blueberries'),
    FOODS_DATABASE.find((f: any) => f.id === 'greek-yogurt'),
    FOODS_DATABASE.find((f: any) => f.id === 'chicken-breast'),
    FOODS_DATABASE.find((f: any) => f.id === 'spinach-cooked'),
    FOODS_DATABASE.find((f: any) => f.id === 'quinoa'),
    FOODS_DATABASE.find((f: any) => f.id === 'salmon'),
  ].filter(Boolean) as any[];

  // Analyze intake
  const analysis = analyzeDailyIntake(sampleFoods, {
    sex: 'female',
    age: 30,
    activityLevel: 'moderate',
  });

  const dailyValues = getDailyValues({ sex: 'female', age: 30, activityLevel: 'moderate' });

  // Key nutrients to display
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

  const totalCalories = sampleFoods.reduce((sum, food) => sum + (food.calories || 0), 0);

  return (
    <PageTransition>
    <div className="space-y-6">
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
                <h2 className="text-3xl md:text-4xl font-bold">Good {getTimeOfDay()}!</h2>
              </div>
              <p className="mt-2 text-primary-100 text-lg ml-15">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
              <div className="text-3xl font-bold">{sampleFoods.length}</div>
              <div className="text-sm text-primary-100">foods logged</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-primary-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Calories</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalCalories}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gut Health</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analysis.gutHealthScore.score}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🦠</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-warning-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gaps Found</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{analysis.gaps.length}</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Priorities */}
      {analysis.topPriorities.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">🎯</span>
            <h3 className="text-xl font-bold text-gray-900">Top 3 Priorities Today</h3>
          </div>
          <div className="space-y-2">
            {analysis.topPriorities.map((priority: any, index: number) => (
              <div key={index} className="flex items-start p-3 bg-gradient-to-r from-primary-50 to-white rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                  {index + 1}
                </span>
                <span className="text-gray-700 flex-1">{priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gut Health Score - Full Component */}
      <GutHealthScore
        score={analysis.gutHealthScore.score}
        fiberGrams={analysis.gutHealthScore.fiberGrams}
        fermentedFoods={analysis.gutHealthScore.fermentedFoods}
        plantDiversity={analysis.gutHealthScore.plantDiversity}
        ultraProcessedCount={analysis.gutHealthScore.ultraProcessedCount}
      />

      {/* Nutrient Gaps */}
      {analysis.gaps.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">⚠️</span>
            <h3 className="text-xl font-bold text-gray-900">Nutrient Gaps</h3>
          </div>
          <GapAlert gaps={analysis.gaps} maxDisplay={5} />
        </div>
      )}

      {/* Key Nutrients Grid */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">📊</span>
          <h3 className="text-xl font-bold text-gray-900">Key Nutrients Today</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyNutrients.map((nutrient) => {
            const current = analysis.totals[nutrient] || 0;
            const target = (dailyValues as any)[nutrient] || 1;
            const percentDV = (current / target) * 100;

            return (
              <NutrientBadge
                key={nutrient}
                nutrient={NUTRIENT_NAMES[nutrient] || nutrient}
                current={current}
                target={target}
                unit={NUTRIENT_UNITS[nutrient] || 'g'}
                percentDV={percentDV}
              />
            );
          })}
        </div>
      </div>

      {/* Synergy Suggestions */}
      {analysis.synergySuggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">💡</span>
            <h3 className="text-xl font-bold text-gray-900">Smart Synergy Tips</h3>
          </div>
          <div className="space-y-3">
            {analysis.synergySuggestions.map((suggestion: any, index: number) => (
              <div
                key={index}
                className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg hover:shadow-md transition-shadow"
              >
                <h4 className="font-semibold text-blue-900 mb-1">{suggestion.message}</h4>
                <p className="text-sm text-blue-800">{suggestion.actionable}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">⚡</span>
          <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/log-food"
            className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-center"
          >
            <div className="text-2xl mb-1">🍽️</div>
            <div>Log a Meal</div>
          </a>
          <a
            href="/recommendations"
            className="group bg-white border-2 border-primary-600 text-primary-600 px-6 py-4 rounded-xl font-medium hover:bg-primary-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-center"
          >
            <div className="text-2xl mb-1">💡</div>
            <div>View Tips</div>
          </a>
          <a
            href="/education"
            className="group bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-4 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-center"
          >
            <div className="text-2xl mb-1">📚</div>
            <div>Learn More</div>
          </a>
        </div>
      </div>

      {/* Foods Logged Today */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🍽️</span>
          <h3 className="text-xl font-bold text-gray-900">Foods Logged Today</h3>
        </div>
        <div className="space-y-2">
          {sampleFoods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center flex-1">
                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                <div>
                  <span className="font-medium text-gray-900">{food.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({food.servingSize})</span>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600">{food.calories}</span>
                <span className="text-xs text-gray-500 ml-1">kcal</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
