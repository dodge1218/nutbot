import SkeletonLoader from '@/components/SkeletonLoader';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Nutrient Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkeletonLoader type="badge" count={6} />
      </div>

      {/* Gap Alerts */}
      <SkeletonLoader type="card" className="mt-6" />

      {/* Gut Health Score */}
      <SkeletonLoader type="card" className="mt-6" />

      {/* Daily Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <SkeletonLoader type="stat" count={4} />
      </div>
    </div>
  );
}
