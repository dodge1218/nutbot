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
  // Determine color based on % DV
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-700';
  let barColor = 'bg-gray-400';

  if (percentDV < 50) {
    bgColor = 'bg-red-50';
    textColor = 'text-red-800';
    barColor = 'bg-red-500';
  } else if (percentDV < 80) {
    bgColor = 'bg-yellow-50';
    textColor = 'text-yellow-800';
    barColor = 'bg-yellow-500';
  } else if (percentDV >= 80 && percentDV <= 120) {
    bgColor = 'bg-green-50';
    textColor = 'text-green-800';
    barColor = 'bg-green-500';
  } else if (percentDV > 120) {
    bgColor = 'bg-blue-50';
    textColor = 'text-blue-800';
    barColor = 'bg-blue-500';
  }

  // Cap display at 100% for visual purposes
  const displayPercent = Math.min(percentDV, 100);

  return (
    <div className={`${bgColor} rounded-lg p-4`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-semibold ${textColor}`}>{nutrient}</h4>
        <span className={`text-sm font-bold ${textColor}`}>
          {Math.round(percentDV)}%
        </span>
      </div>
      
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`${barColor} h-2.5 rounded-full transition-all duration-300`}
            style={{ width: `${displayPercent}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className={textColor}>
          {current.toFixed(1)} {unit}
        </span>
        <span className="text-gray-500">
          Target: {target.toFixed(0)} {unit}
        </span>
      </div>
    </div>
  );
}
