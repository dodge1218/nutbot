import SkeletonLoader from '@/components/SkeletonLoader';

export default function LogFoodLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>

      {/* Food List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <SkeletonLoader type="list" count={9} />
      </div>
    </div>
  );
}
