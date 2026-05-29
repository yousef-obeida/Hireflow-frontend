/**
 * Skeleton loader for the interviews table.
 * Shows shimmer rows while data is being fetched.
 */
export const InterviewsTableSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Table header skeleton */}
      <div className="flex gap-6 px-6 py-4 border-b border-[#e8ecf0] bg-[#fafafa]">
        {[140, 120, 100, 100, 80, 60].map((w, i) => (
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
          className="flex items-center gap-6 px-6 py-5 border-b border-[#f1f3f6] last:border-0"
        >
          {/* Avatar + Name */}
          <div className="flex items-center gap-3" style={{ width: 140 }}>
            <div className="w-9 h-9 bg-[#e8ecf0] rounded-full shrink-0" />
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-24 bg-[#e8ecf0] rounded" />
              <div className="h-2 w-16 bg-[#f1f3f6] rounded" />
            </div>
          </div>
          {/* Other columns */}
          <div className="h-3 bg-[#f1f3f6] rounded" style={{ width: 120 }} />
          <div className="h-3 bg-[#f1f3f6] rounded" style={{ width: 100 }} />
          <div className="h-3 bg-[#f1f3f6] rounded" style={{ width: 100 }} />
          <div className="h-3 bg-[#f1f3f6] rounded" style={{ width: 80 }} />
          <div className="h-3 bg-[#f1f3f6] rounded" style={{ width: 40 }} />
        </div>
      ))}
    </div>
  );
};
