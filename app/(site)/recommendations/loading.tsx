import SkeletonLoader from '@/components/SkeletonLoader';

export default function RecommendationsLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mt-6 animate-pulse">
        <div className="h-10 bg-gray-200 rounded-full w-24"></div>
        <div className="h-10 bg-gray-200 rounded-full w-24"></div>
        <div className="h-10 bg-gray-200 rounded-full w-24"></div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4 mt-6">
        <SkeletonLoader type="card" count={6} />
      </div>
    </div>
  );
}
