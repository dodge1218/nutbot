interface GutHealthScoreProps {
  score: number;
  fiberGrams: number;
  fermentedFoods: number;
  plantDiversity: number;
  ultraProcessedCount: number;
}

export default function GutHealthScore({
  score,
  fiberGrams,
  fermentedFoods,
  plantDiversity,
  ultraProcessedCount,
}: GutHealthScoreProps) {
  // Determine color based on score with enhanced styling
  let scoreColor = 'text-red-600';
  let bgGradient = 'bg-gradient-to-br from-red-50 to-red-100';
  let barGradient = 'bg-gradient-to-r from-red-400 to-red-600';
  let borderColor = 'border-red-300';
  let label = 'Needs Improvement';
  let icon = '😟';

  if (score >= 75) {
    scoreColor = 'text-green-600';
    bgGradient = 'bg-gradient-to-br from-green-50 to-green-100';
    barGradient = 'bg-gradient-to-r from-green-400 to-green-600';
    borderColor = 'border-green-300';
    label = 'Excellent';
    icon = '🎉';
  } else if (score >= 60) {
    scoreColor = 'text-yellow-600';
    bgGradient = 'bg-gradient-to-br from-yellow-50 to-yellow-100';
    barGradient = 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    borderColor = 'border-yellow-300';
    label = 'Good';
    icon = '😊';
  } else if (score >= 40) {
    scoreColor = 'text-orange-600';
    bgGradient = 'bg-gradient-to-br from-orange-50 to-orange-100';
    barGradient = 'bg-gradient-to-r from-orange-400 to-orange-600';
    borderColor = 'border-orange-300';
    label = 'Fair';
    icon = '😐';
  }

  return (
    <div className={`${bgGradient} rounded-2xl p-6 border-2 ${borderColor} shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <span className="text-4xl mr-3">🦠</span>
          <h3 className="text-xl font-bold text-gray-900">Gut Health Score</h3>
        </div>
        <div className="text-right">
          <div className="flex items-center">
            <span className="text-3xl mr-2">{icon}</span>
            <div>
              <div className={`text-4xl font-extrabold ${scoreColor}`}>{score}</div>
              <div className={`text-sm font-semibold ${scoreColor}`}>{label}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`${barGradient} h-4 rounded-full transition-all duration-700 ease-out shadow-md`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white/60 rounded-lg p-3 border border-white">
          <div className="text-gray-600 font-medium flex items-center text-xs">
            <span className="mr-1">🌾</span> Fiber
          </div>
          <div className="font-bold text-gray-900 text-lg mt-1">
            {fiberGrams.toFixed(1)}g / 30g
          </div>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-white">
          <div className="text-gray-600 font-medium flex items-center text-xs">
            <span className="mr-1">🥬</span> Fermented Foods
          </div>
          <div className="font-bold text-gray-900 text-lg mt-1">
            {fermentedFoods} serving{fermentedFoods !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-white">
          <div className="text-gray-600 font-medium flex items-center text-xs">
            <span className="mr-1">🌱</span> Plant Diversity
          </div>
          <div className="font-bold text-gray-900 text-lg mt-1">
            {plantDiversity} types
          </div>
        </div>
        <div className="bg-white/60 rounded-lg p-3 border border-white">
          <div className="text-gray-600 font-medium flex items-center text-xs">
            <span className="mr-1">⚠️</span> Ultra-Processed
          </div>
          <div className="font-bold text-gray-900 text-lg mt-1">
            {ultraProcessedCount} item{ultraProcessedCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t-2 border-white/60">
        <p className="text-xs text-gray-700 leading-relaxed flex items-start">
          <span className="mr-2">💡</span>
          <span>
            Aim for 30+ plant varieties per week, include fermented foods daily, 
            and minimize ultra-processed items for optimal gut microbiome health.
          </span>
        </p>
      </div>
    </div>
  );
}
