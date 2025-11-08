import NutrientBadge from '@/components/NutrientBadge';
import GapAlert from '@/components/GapAlert';
import GutHealthScore from '@/components/GutHealthScore';
import { FOODS_DATABASE, COMMON_MEALS } from '@/data/foods';
import { analyzeDailyIntake } from '@/lib/nutritionEngine';
import { getDailyValues, NUTRIENT_NAMES, NUTRIENT_UNITS } from '@/lib/dailyValues';

export default function DashboardPage() {
  // Mock data - in production, fetch from database for current user
  const sampleFoods = [
    FOODS_DATABASE.find(f => f.id === 'oats'),
    FOODS_DATABASE.find(f => f.id === 'blueberries'),
    FOODS_DATABASE.find(f => f.id === 'greek-yogurt'),
    FOODS_DATABASE.find(f => f.id === 'chicken-breast'),
    FOODS_DATABASE.find(f => f.id === 'spinach-cooked'),
    FOODS_DATABASE.find(f => f.id === 'quinoa'),
    FOODS_DATABASE.find(f => f.id === 'salmon'),
  ].filter((f): f is NonNullable<typeof f> => f !== undefined);

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

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Today's Nutrition Dashboard</h2>
        <p className="mt-2 text-gray-600">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Top Priorities */}
      {analysis.topPriorities.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Top 3 Priorities Today</h3>
          <ul className="space-y-2">
            {analysis.topPriorities.map((priority, index) => (
              <li key={index} className="flex items-start">
                <span className="font-bold text-primary-600 mr-2">{index + 1}.</span>
                <span className="text-gray-700">{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gut Health Score */}
      <GutHealthScore
        score={analysis.gutHealthScore.score}
        fiberGrams={analysis.gutHealthScore.fiberGrams}
        fermentedFoods={analysis.gutHealthScore.fermentedFoods}
        plantDiversity={analysis.gutHealthScore.plantDiversity}
        ultraProcessedCount={analysis.gutHealthScore.ultraProcessedCount}
      />

      {/* Nutrient Gaps */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Nutrient Gaps</h3>
        <GapAlert gaps={analysis.gaps} maxDisplay={5} />
      </div>

      {/* Key Nutrients Grid */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Key Nutrients Today</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Smart Suggestions</h3>
          <div className="space-y-3">
            {analysis.synergySuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="border-l-4 border-primary-500 bg-primary-50 p-4 rounded"
              >
                <h4 className="font-semibold text-primary-900">{suggestion.message}</h4>
                <p className="text-sm text-primary-800 mt-1">{suggestion.actionable}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">⚡ Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/log-food"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 text-center"
          >
            + Log a Meal
          </a>
          <a
            href="/recommendations"
            className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 text-center"
          >
            View Recommendations
          </a>
          <a
            href="/education"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 text-center"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Foods Logged Today */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🍽️ Foods Logged Today</h3>
        <div className="space-y-2">
          {sampleFoods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div>
                <span className="font-medium text-gray-900">{food.name}</span>
                <span className="text-sm text-gray-500 ml-2">({food.servingSize})</span>
              </div>
              <div className="text-sm text-gray-600">{food.calories} kcal</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
