interface SkeletonLoaderProps {
  type?: 'card' | 'text' | 'badge' | 'stat' | 'list';
  count?: number;
  className?: string;
}

export default function SkeletonLoader({ type = 'card', count = 1, className = '' }: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`bg-white rounded-xl shadow-md p-6 animate-pulse ${className}`}>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        );
      
      case 'text':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        );
      
      case 'badge':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="h-24 bg-gray-200 rounded-xl"></div>
          </div>
        );
      
      case 'stat':
        return (
          <div className={`bg-white rounded-xl shadow-md p-6 animate-pulse ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        );
      
      case 'list':
        return (
          <div className={`bg-white rounded-xl shadow-md p-4 animate-pulse ${className}`}>
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </>
  );
}
