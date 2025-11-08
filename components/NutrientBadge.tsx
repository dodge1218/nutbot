interface NutrientBadgeProps {
  nutrient: string;
  current: number;
  target: number;
  unit: string;
  percentDV: number;
}

export default function NutrientBadge({
  nutrient,
  current,
  target,
  unit,
  percentDV,
}: NutrientBadgeProps) {
  // Determine color based on % DV with enhanced gradients
  let bgGradient = 'bg-gradient-to-br from-gray-50 to-gray-100';
  let textColor = 'text-gray-700';
  let barGradient = 'bg-gradient-to-r from-gray-400 to-gray-500';
  let borderColor = 'border-gray-200';
  let icon = '⚪';

  if (percentDV < 50) {
    bgGradient = 'bg-gradient-to-br from-red-50 to-red-100';
    textColor = 'text-red-800';
    barGradient = 'bg-gradient-to-r from-red-400 to-red-600';
    borderColor = 'border-red-200';
    icon = '⚠️';
  } else if (percentDV < 80) {
    bgGradient = 'bg-gradient-to-br from-yellow-50 to-yellow-100';
    textColor = 'text-yellow-800';
    barGradient = 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    borderColor = 'border-yellow-200';
    icon = '⚡';
  } else if (percentDV >= 80 && percentDV <= 120) {
    bgGradient = 'bg-gradient-to-br from-green-50 to-green-100';
    textColor = 'text-green-800';
    barGradient = 'bg-gradient-to-r from-green-400 to-green-600';
    borderColor = 'border-green-200';
    icon = '✅';
  } else if (percentDV > 120) {
    bgGradient = 'bg-gradient-to-br from-blue-50 to-blue-100';
    textColor = 'text-blue-800';
    barGradient = 'bg-gradient-to-r from-blue-400 to-blue-600';
    borderColor = 'border-blue-200';
    icon = '💯';
  }

  // Cap display at 100% for visual purposes
  const displayPercent = Math.min(percentDV, 100);

  return (
    <div className={`${bgGradient} rounded-xl p-4 border-2 ${borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <span className="text-xl mr-2">{icon}</span>
          <h4 className={`font-bold ${textColor}`}>{nutrient}</h4>
        </div>
        <span className={`text-lg font-bold ${textColor} px-3 py-1 rounded-full bg-white/60`}>
          {Math.round(percentDV)}%
        </span>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-white/40 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`${barGradient} h-3 rounded-full transition-all duration-500 ease-out shadow-sm`}
            style={{ width: `${displayPercent}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className={`${textColor} font-semibold`}>
          {current.toFixed(1)} {unit}
        </span>
        <span className={`${textColor} opacity-70 text-xs`}>
          Target: {target.toFixed(0)} {unit}
        </span>
      </div>
    </div>
  );
}
