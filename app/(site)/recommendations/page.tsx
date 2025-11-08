import LegalDisclaimer from '@/components/LegalDisclaimer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import PageTransition from '@/components/PageTransition';
import { FOODS_DATABASE } from '@/data/foods';
import { analyzeDailyIntake, generateSupplementRecommendations } from '@/lib/nutritionEngine';
import { getProductRecommendations } from '@/lib/affiliate';

export default function RecommendationsPage() {
  // Mock data - in production, fetch from database
  const sampleFoods = [
    FOODS_DATABASE.find((f: any) => f.id === 'oats'),
    FOODS_DATABASE.find((f: any) => f.id === 'chicken-breast'),
    FOODS_DATABASE.find((f: any) => f.id === 'broccoli'),
  ].filter(Boolean) as any[];

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
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Personalized Recommendations</h2>
          </div>
          <p className="mt-2 text-primary-100 text-lg ml-15">
            Based on your intake, here's how to close your nutrient gaps
          </p>
        </div>
      </div>

      <LegalDisclaimer />

      {/* Food-First Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">🥗</span>
          <h3 className="text-xl font-bold text-gray-900">Food-First Solutions (Prioritize These)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodRecommendations.map((rec, index) => (
            <div key={index} className="border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <h4 className="font-bold text-primary-900 mb-3 text-lg">To increase: {rec.gap}</h4>
              <div className="mb-3">
                <span className="text-sm font-semibold text-primary-800">Top Foods: </span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {rec.foods.map((food, i) => (
                    <span key={i} className="inline-block bg-white px-3 py-1 rounded-full text-sm text-primary-700 border border-primary-200">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start bg-primary-100/50 rounded-lg p-3">
                <span className="text-primary-600 mr-2">💡</span>
                <p className="text-sm text-primary-900">
                  <strong>Why it matters:</strong> {rec.benefit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Timing Suggestions */}
      {analysis.timingSuggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">⏰</span>
            <h3 className="text-xl font-bold text-gray-900">Timing Optimization</h3>
          </div>
          <div className="space-y-3">
            {analysis.timingSuggestions.map((suggestion: any, index: number) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚡</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{suggestion.message}</h4>
                    <p className="text-sm text-gray-700">{suggestion.actionable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Synergy Tips */}
      {analysis.synergySuggestions.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">🔗</span>
            <h3 className="text-xl font-bold text-gray-900">Nutrient Synergies</h3>
          </div>
          <div className="space-y-3">
            {analysis.synergySuggestions.map((suggestion: any, index: number) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-start">
                  <span className="text-3xl mr-3">
                    {suggestion.type === 'synergy' ? '✅' : '⚠️'}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">{suggestion.message}</h4>
                    <p className="text-sm text-gray-700">{suggestion.actionable}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gut Health Recommendations */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">🦠</span>
          <h3 className="text-xl font-bold text-gray-900">Gut Health Support</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {analysis.gutHealthScore.recommendations.map((rec: any, index: number) => (
            <div key={index} className="flex items-start p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200 hover:shadow-md transition-all">
              <span className="text-green-600 text-xl mr-3">✓</span>
              <p className="text-gray-800 text-sm">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Recommendations (if enabled) */}
      {productRecommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-2">💊</span>
            <h3 className="text-xl font-bold text-gray-900">Supplement Suggestions (Optional)</h3>
          </div>
          
          <AffiliateDisclosure />

          <div className="mt-6 space-y-4">
            {productRecommendations.map((rec: any, index: number) => {
              const priorityStyles: Record<string, string> = {
                high: 'border-red-300 bg-gradient-to-r from-red-50 to-red-100/50',
                medium: 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100/50',
                low: 'border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100/50',
              };

              const priorityBadges: Record<string, string> = {
                high: 'bg-red-100 text-red-800 border-red-300',
                medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
                low: 'bg-gray-100 text-gray-800 border-gray-300',
              };

              return (
                <div
                  key={index}
                  className={`border-2 ${priorityStyles[rec.priority]} rounded-xl p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-lg">{rec.product.name}</h4>
                        <span className={`ml-3 px-3 py-1 rounded-full text-xs font-semibold border ${priorityBadges[rec.priority]}`}>
                          {rec.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.product.description}</p>
                      <div className="bg-white/60 rounded-lg p-3 mb-2">
                        <p className="text-sm font-medium text-gray-800">
                          📊 {rec.reason}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-xs text-gray-600 font-medium">Addresses:</span>
                        {rec.fillsGaps.map((gap: any, i: number) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200">
                            {gap}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-6 text-right flex-shrink-0">
                      {rec.product.price && (
                        <div className="text-2xl font-bold text-gray-900 mb-3">
                          ${rec.product.price}
                        </div>
                      )}
                      <a
                        href={rec.product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                      >
                        View Product →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
            <p className="text-sm text-yellow-900 italic flex items-start">
              <span className="text-xl mr-2">⚠️</span>
              <span>Always consult with a healthcare provider before starting any supplement regimen.</span>
            </p>
          </div>
        </div>
      )}

      {/* Learn More CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Want to Learn More? 📚</h3>
            <p className="mb-4 text-primary-100 text-lg">
              Check out our educational resources to understand nutrient synergies, absorption, and timing.
            </p>
            <a
              href="/education"
              className="inline-block bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Browse Education Center →
            </a>
          </div>
          <div className="hidden md:block text-8xl opacity-20">
            🎓
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
