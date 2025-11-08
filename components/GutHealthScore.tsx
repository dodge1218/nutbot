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
  // Determine color based on score
  let scoreColor = 'text-red-600';
  let bgColor = 'bg-red-50';
  let barColor = 'bg-red-500';
  let label = 'Needs Improvement';

  if (score >= 75) {
    scoreColor = 'text-green-600';
    bgColor = 'bg-green-50';
    barColor = 'bg-green-500';
    label = 'Excellent';
  } else if (score >= 60) {
    scoreColor = 'text-yellow-600';
    bgColor = 'bg-yellow-50';
    barColor = 'bg-yellow-500';
    label = 'Good';
  } else if (score >= 40) {
    scoreColor = 'text-orange-600';
    bgColor = 'bg-orange-50';
    barColor = 'bg-orange-500';
    label = 'Fair';
  }

  return (
    <div className={`${bgColor} rounded-lg p-6 border border-gray-200`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Gut Health Score</h3>
        <div className="text-right">
          <div className={`text-3xl font-bold ${scoreColor}`}>{score}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${barColor} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Fiber</div>
          <div className="font-semibold text-gray-900">
            {fiberGrams.toFixed(1)}g / 30g
          </div>
        </div>
        <div>
          <div className="text-gray-600">Fermented Foods</div>
          <div className="font-semibold text-gray-900">
            {fermentedFoods} serving{fermentedFoods !== 1 ? 's' : ''}
          </div>
        </div>
        <div>
          <div className="text-gray-600">Plant Diversity</div>
          <div className="font-semibold text-gray-900">
            {plantDiversity} types
          </div>
        </div>
        <div>
          <div className="text-gray-600">Ultra-Processed</div>
          <div className="font-semibold text-gray-900">
            {ultraProcessedCount} item{ultraProcessedCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300">
        <p className="text-xs text-gray-600">
          💡 Aim for 30+ plant varieties per week, include fermented foods daily, 
          and minimize ultra-processed items for optimal gut microbiome health.
        </p>
      </div>
    </div>
  );
}
