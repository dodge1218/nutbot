import { NutrientGap } from '@/lib/nutritionEngine';

interface GapAlertProps {
  gaps: NutrientGap[];
  maxDisplay?: number;
}

export default function GapAlert({ gaps, maxDisplay = 5 }: GapAlertProps) {
  if (gaps.length === 0) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-green-900 font-bold text-lg">Perfect Balance! ✨</p>
            <p className="text-green-700 text-sm">No significant nutrient gaps detected today</p>
          </div>
        </div>
      </div>
    );
  }

  const deficits = gaps.filter(g => g.category === 'deficit');
  const surpluses = gaps.filter(g => g.category === 'surplus');
  const displayGaps = [...deficits, ...surpluses].slice(0, maxDisplay);

  return (
    <div className="space-y-3">
      {displayGaps.map((gap, index) => {
        const isDeficit = gap.category === 'deficit';
        const isHigh = gap.severity === 'high';
        
        let bgGradient = 'bg-gradient-to-r from-yellow-50 to-yellow-100';
        let borderColor = 'border-yellow-300';
        let iconBg = 'bg-yellow-500';
        let textColor = 'text-yellow-900';
        let icon = '⚡';
        
        if (isDeficit && isHigh) {
          bgGradient = 'bg-gradient-to-r from-red-50 to-red-100';
          borderColor = 'border-red-300';
          iconBg = 'bg-red-500';
          textColor = 'text-red-900';
          icon = '⚠️';
        } else if (!isDeficit) {
          bgGradient = 'bg-gradient-to-r from-blue-50 to-blue-100';
          borderColor = 'border-blue-300';
          iconBg = 'bg-blue-500';
          textColor = 'text-blue-900';
          icon = '📊';
        }

        return (
          <div
            key={`gap-${index}`}
            className={`${bgGradient} border-2 ${borderColor} rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center text-white text-xl shadow-lg`}>
                  {icon}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h4 className={`font-bold text-lg ${textColor} mb-1`}>
                  {isDeficit ? '📉 Low' : '📈 High'}: {gap.name}
                </h4>
                <p className={`text-sm ${textColor} opacity-90`}>
                  You're at <strong className="font-extrabold">{Math.round(gap.percentDV)}%</strong> of the 
                  daily recommended value
                  {isDeficit ? ' — consider adding more' : ' — you may want to reduce intake'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      
      {gaps.length > maxDisplay && (
        <p className="text-sm text-gray-600 text-center font-medium py-2 bg-gray-100 rounded-lg">
          + {gaps.length - maxDisplay} more nutrient{gaps.length - maxDisplay > 1 ? 's' : ''} to review
        </p>
      )}
    </div>
  );
}
