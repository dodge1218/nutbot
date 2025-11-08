import { NutrientGap } from '@/lib/nutritionEngine';

interface GapAlertProps {
  gaps: NutrientGap[];
  maxDisplay?: number;
}

export default function GapAlert({ gaps, maxDisplay = 5 }: GapAlertProps) {
  if (gaps.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-green-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-green-800 font-medium">
            Great job! No significant nutrient gaps detected today.
          </p>
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
        
        let bgColor = 'bg-yellow-50';
        let borderColor = 'border-yellow-200';
        let iconColor = 'text-yellow-600';
        let textColor = 'text-yellow-800';
        
        if (isDeficit && isHigh) {
          bgColor = 'bg-red-50';
          borderColor = 'border-red-200';
          iconColor = 'text-red-600';
          textColor = 'text-red-800';
        } else if (!isDeficit) {
          bgColor = 'bg-blue-50';
          borderColor = 'border-blue-200';
          iconColor = 'text-blue-600';
          textColor = 'text-blue-800';
        }

        return (
          <div
            key={`gap-${index}`}
            className={`${bgColor} border ${borderColor} rounded-lg p-4`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {isDeficit ? (
                  <svg
                    className={`h-5 w-5 ${iconColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className={`h-5 w-5 ${iconColor}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3 flex-1">
                <h4 className={`font-semibold ${textColor}`}>
                  {isDeficit ? 'Low' : 'High'}: {gap.name}
                </h4>
                <p className={`text-sm ${textColor} mt-1`}>
                  You're at <strong>{Math.round(gap.percentDV)}%</strong> of the 
                  daily recommended value
                  {isDeficit ? ' — consider adding more' : ' — you may want to reduce intake'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      
      {gaps.length > maxDisplay && (
        <p className="text-sm text-gray-500 text-center">
          + {gaps.length - maxDisplay} more nutrient{gaps.length - maxDisplay > 1 ? 's' : ''} to review
        </p>
      )}
    </div>
  );
}
