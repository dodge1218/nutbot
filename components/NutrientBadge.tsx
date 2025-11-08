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
  let bgGradient = 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50';
  let textColor = 'text-gray-700';
  let barGradient = 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400';
  let borderColor = 'border-gray-200';
  let glowColor = 'shadow-gray-100';
  let iconBg = 'bg-gray-100';
  let iconColor = 'text-gray-600';
  let icon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={2} />
    </svg>
  );

  if (percentDV < 50) {
    bgGradient = 'bg-gradient-to-br from-red-50 via-red-100 to-red-50';
    textColor = 'text-red-800';
    barGradient = 'bg-gradient-to-r from-red-400 via-red-600 to-red-500';
    borderColor = 'border-red-200';
    glowColor = 'shadow-red-100';
    iconBg = 'bg-red-100';
    iconColor = 'text-red-600';
    icon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  } else if (percentDV < 80) {
    bgGradient = 'bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50';
    textColor = 'text-yellow-800';
    barGradient = 'bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500';
    borderColor = 'border-yellow-200';
    glowColor = 'shadow-yellow-100';
    iconBg = 'bg-yellow-100';
    iconColor = 'text-yellow-600';
    icon = (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    );
  } else if (percentDV >= 80 && percentDV <= 120) {
    bgGradient = 'bg-gradient-to-br from-green-50 via-green-100 to-green-50';
    textColor = 'text-green-800';
    barGradient = 'bg-gradient-to-r from-green-400 via-green-600 to-green-500';
    borderColor = 'border-green-200';
    glowColor = 'shadow-green-100';
    iconBg = 'bg-green-100';
    iconColor = 'text-green-600';
    icon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  } else if (percentDV > 120) {
    bgGradient = 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50';
    textColor = 'text-blue-800';
    barGradient = 'bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500';
    borderColor = 'border-blue-200';
    glowColor = 'shadow-blue-100';
    iconBg = 'bg-blue-100';
    iconColor = 'text-blue-600';
    icon = (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }

  // Cap display at 100% for visual purposes
  const displayPercent = Math.min(percentDV, 100);

  return (
    <div className={`${bgGradient} rounded-2xl p-5 border ${borderColor} shadow-lg ${glowColor} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] group`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`${iconBg} ${iconColor} w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            {icon}
          </div>
          <h4 className={`font-bold text-sm ${textColor}`}>{nutrient}</h4>
        </div>
        <span className={`text-lg font-bold ${textColor} px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm`}>
          {Math.round(percentDV)}%
        </span>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-white/60 rounded-full h-3 overflow-hidden shadow-inner backdrop-blur-sm">
          <div
            className={`${barGradient} h-3 rounded-full transition-all duration-700 ease-out shadow-md relative overflow-hidden`}
            style={{ width: `${displayPercent}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
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
