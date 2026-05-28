/**
 * Page-level skeleton loader with animated shimmer.
 * Use as the loading state for full page components.
 *
 * Provides a generic layout skeleton with a header area,
 * stats row, and content rows.
 */
export const PageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-64 bg-[#dde3ea] rounded-lg" />
        <div className="h-4 w-96 bg-[#e8ecf0] rounded-md" />
      </div>

      {/* Stats row skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-white rounded-2xl border border-[#dde3ea] p-4 space-y-3"
          >
            <div className="h-3 w-20 bg-[#e8ecf0] rounded" />
            <div className="h-6 w-16 bg-[#dde3ea] rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-[#dde3ea] overflow-hidden">
        {/* Table header */}
        <div className="flex gap-4 px-6 py-4 border-b border-[#e8ecf0]">
          {[120, 160, 100, 80, 60].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-[#e8ecf0] rounded"
              style={{ width: w }}
            />
          ))}
        </div>
        {/* Table rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 px-6 py-4 border-b border-[#f1f3f6] last:border-0"
          >
            {[120, 160, 100, 80, 60].map((w, j) => (
              <div
                key={j}
                className="h-3 bg-[#f1f3f6] rounded"
                style={{ width: w }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Inline skeleton for smaller sections (cards, form areas).
 */
export const CardSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-40 bg-white rounded-2xl border border-[#dde3ea] p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8ecf0] rounded-full" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-28 bg-[#e8ecf0] rounded" />
              <div className="h-2 w-20 bg-[#f1f3f6] rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full bg-[#f1f3f6] rounded" />
            <div className="h-2 w-3/4 bg-[#f1f3f6] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
