export function GuideCardSkeleton() {
  return (
    <div className="animate-pulse max-w-sm rounded-xl overflow-hidden shadow-2xl bg-secondary subtle-gradient-reverse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
        <div className="absolute top-3 left-3 h-6 w-20 bg-white/70 rounded-full" />
      </div>

      <div className="p-5">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
        </div>

        {/* Button Row */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}
