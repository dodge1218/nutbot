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
            {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg shadow-primary-100 p-6 border border-primary-100 hover:shadow-xl hover:shadow-primary-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide mb-1">Total Calories</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mt-1">{analysis.totals.calories}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden backdrop-blur-sm shadow-inner">
              <div className="bg-gradient-to-r from-primary-400 via-primary-600 to-primary-500 h-2 rounded-full transition-all duration-700" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg shadow-green-100 p-6 border border-green-100 hover:shadow-xl hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-1">Protein</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mt-1">{analysis.totals.protein}g</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden backdrop-blur-sm shadow-inner">
              <div className="bg-gradient-to-r from-green-400 via-green-600 to-green-500 h-2 rounded-full transition-all duration-700" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg shadow-blue-100 p-6 border border-blue-100 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1">Gut Health</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mt-1">{analysis.gutHealthScore.score}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden backdrop-blur-sm shadow-inner">
              <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500 h-2 rounded-full transition-all duration-700" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-lg shadow-yellow-100 p-6 border border-yellow-100 hover:shadow-xl hover:shadow-yellow-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-1">Gaps Found</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent mt-1">{analysis.gaps.length}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 bg-white/60 rounded-full h-2 overflow-hidden backdrop-blur-sm shadow-inner">
              <div className="bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500 h-2 rounded-full transition-all duration-700" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Priorities */}
      {analysis.topPriorities.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Top 3 Priorities Today</h3>
          </div>
          <div className="space-y-3">
            {analysis.topPriorities.map((priority: any, index: number) => (
              <div key={index} className="flex items-start p-4 bg-gradient-to-r from-primary-50 via-white to-primary-50/50 rounded-xl hover:shadow-md transition-all duration-300 group border border-primary-100 hover:border-primary-200">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-xl flex items-center justify-center font-bold text-sm mr-4 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  {index + 1}
                </span>
                <span className="text-gray-700 flex-1 font-medium leading-relaxed">{priority}</span>
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
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Nutrient Gaps</h3>
          </div>
          <GapAlert gaps={analysis.gaps} maxDisplay={5} />
        </div>
      )}

      {/* Key Nutrients Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Key Nutrients Today</h3>
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
