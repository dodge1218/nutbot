import LegalDisclaimer from '@/components/LegalDisclaimer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { FOODS_DATABASE } from '@/data/foods';
import { analyzeDailyIntake, generateSupplementRecommendations } from '@/lib/nutritionEngine';
import { getProductRecommendations } from '@/lib/affiliate';

export default function RecommendationsPage() {
  // Mock data - in production, fetch from database
  const sampleFoods = [
    FOODS_DATABASE.find(f => f.id === 'oats'),
    FOODS_DATABASE.find(f => f.id === 'chicken-breast'),
    FOODS_DATABASE.find(f => f.id === 'broccoli'),
  ].filter(Boolean);

  const analysis = analyzeDailyIntake(sampleFoods as any, {
    sex: 'female',
    age: 30,
    activityLevel: 'moderate',
  });

  const productRecommendations = getProductRecommendations(analysis.gaps);
  const supplementRecs = generateSupplementRecommendations(analysis.gaps);

  // Food-first recommendations
  const foodRecommendations = [
    {
      gap: 'Vitamin C',
      foods: ['Bell peppers', 'Oranges', 'Strawberries', 'Kiwi', 'Broccoli'],
      benefit: 'Boosts iron absorption, supports immune function',
    },
    {
      gap: 'Fiber',
      foods: ['Lentils', 'Black beans', 'Oats', 'Chia seeds', 'Avocado'],
      benefit: 'Supports gut health, improves satiety, regulates blood sugar',
    },
    {
      gap: 'Magnesium',
      foods: ['Pumpkin seeds', 'Spinach', 'Dark chocolate', 'Almonds', 'Black beans'],
      benefit: 'Promotes relaxation, better sleep, muscle function',
    },
    {
      gap: 'Omega-3',
      foods: ['Salmon', 'Sardines', 'Chia seeds', 'Walnuts', 'Flaxseeds'],
      benefit: 'Anti-inflammatory, heart and brain health',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Personalized Recommendations</h2>
        <p className="mt-2 text-gray-600">
          Based on your intake, here's how to close your nutrient gaps
        </p>
      </div>

      <LegalDisclaimer />

      {/* Food-First Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          🥗 Food-First Solutions (Prioritize These)
        </h3>
        <div className="space-y-6">
          {foodRecommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-primary-500 bg-primary-50 p-4 rounded">
              <h4 className="font-bold text-primary-900 mb-2">To increase: {rec.gap}</h4>
              <div className="mb-2">
                <span className="text-sm font-medium text-primary-800">Top Foods: </span>
                <span className="text-sm text-primary-700">{rec.foods.join(', ')}</span>
              </div>
              <p className="text-sm text-primary-800">
                <strong>Why it matters:</strong> {rec.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Timing Suggestions */}
      {analysis.timingSuggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">⏰ Timing Optimization</h3>
          <div className="space-y-3">
            {analysis.timingSuggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900">{suggestion.message}</h4>
                <p className="text-sm text-gray-700 mt-1">{suggestion.actionable}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Synergy Tips */}
      {analysis.synergySuggestions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🔗 Nutrient Synergies</h3>
          <div className="space-y-3">
            {analysis.synergySuggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">
                    {suggestion.type === 'synergy' ? '✅' : '⚠️'}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900">{suggestion.message}</h4>
                    <p className="text-sm text-gray-700 mt-1">{suggestion.actionable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gut Health Recommendations */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🦠 Gut Health Support</h3>
        <div className="space-y-3">
          {analysis.gutHealthScore.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start p-3 bg-green-50 rounded">
              <span className="text-green-600 mr-2">•</span>
              <p className="text-gray-800">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Recommendations (if enabled) */}
      {productRecommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            💊 Supplement Suggestions (Optional)
          </h3>
          
          <AffiliateDisclosure />

          <div className="mt-6 space-y-4">
            {productRecommendations.map((rec, index) => {
              const priorityColors = {
                high: 'border-red-300 bg-red-50',
                medium: 'border-yellow-300 bg-yellow-50',
                low: 'border-gray-300 bg-gray-50',
              };

              return (
                <div
                  key={index}
                  className={`border-2 ${priorityColors[rec.priority]} rounded-lg p-4`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{rec.product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.product.description}</p>
                      <p className="text-sm font-medium text-gray-800 mt-2">
                        📊 {rec.reason}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Addresses: {rec.fillsGaps.join(', ')}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      {rec.product.price && (
                        <div className="text-lg font-bold text-gray-900">
                          ${rec.product.price}
                        </div>
                      )}
                      <a
                        href={rec.product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block bg-primary-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-700"
                      >
                        View Product →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-600 mt-4 italic">
            Note: Always consult with a healthcare provider before starting any supplement regimen.
          </p>
        </div>
      )}

      {/* Learn More CTA */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Want to Learn More?</h3>
        <p className="mb-4">
          Check out our educational resources to understand nutrient synergies, absorption, and timing.
        </p>
        <a
          href="/education"
          className="inline-block bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
        >
          Browse Education Center →
        </a>
      </div>
    </div>
  );
}
