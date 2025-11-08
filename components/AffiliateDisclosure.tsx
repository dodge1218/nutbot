import { getAffiliateDisclosure } from '@/lib/affiliate';

export default function AffiliateDisclosure() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
      <div className="flex items-start">
        <svg
          className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p className="font-medium text-gray-900 mb-1">Affiliate Disclosure</p>
          <p className="text-gray-600">{getAffiliateDisclosure()}</p>
        </div>
      </div>
    </div>
  );
}
