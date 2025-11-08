import SkeletonLoader from '@/components/SkeletonLoader';

export default function AffiliatesLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 animate-pulse mb-6">
        <div className="h-12 bg-gray-200 rounded mb-4"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonLoader type="card" count={9} />
      </div>
    </div>
  );
}
