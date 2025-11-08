export default function LegalDisclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm">
        <p className="text-yellow-800">
          <strong>⚠️ Informational use only.</strong> Not medical advice. 
          Consult a healthcare professional before making dietary changes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">
            Important Legal Disclaimer
          </h3>
          <div className="text-sm text-yellow-800 space-y-2">
            <p>
              <strong>This application is for informational and educational purposes only.</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>This is <strong>not medical advice</strong></li>
              <li>This does not diagnose, treat, cure, or prevent any disease</li>
              <li>Nutrient values are estimates and may not reflect actual products consumed</li>
              <li>
                Always consult a qualified healthcare professional (doctor, registered dietitian) 
                before making dietary changes, especially if you have medical conditions or take medications
              </li>
            </ul>
            <p className="mt-3 text-xs">
              Individual nutritional needs vary based on age, sex, activity level, medical history, 
              and other factors. The recommendations provided are general in nature and may not be 
              appropriate for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
