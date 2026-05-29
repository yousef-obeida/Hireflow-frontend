import React from 'react';

/**
 * Skeleton loader for the Users table.
 * Renders shimmer rows matching the real table column layout.
 */
export const UsersTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-[#fafafa]">
        <div className="h-3 w-32 bg-[#e8ecf0] rounded" />
        <div className="h-3 w-16 bg-[#e8ecf0] rounded" />
        <div className="h-3 w-28 bg-[#e8ecf0] rounded" />
        <div className="h-3 w-16 bg-[#e8ecf0] rounded" />
      </div>

      {/* Row skeletons */}
      {[...Array(rows)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-6 px-6 py-5 border-b border-gray-50 last:border-0"
        >
          {/* Avatar + Name */}
          <div className="flex items-center gap-3 w-56">
            <div className="w-10 h-10 rounded-full bg-[#e8ecf0] shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3.5 w-28 bg-[#e8ecf0] rounded" />
              <div className="h-2.5 w-40 bg-[#f1f3f6] rounded" />
            </div>
          </div>
          {/* Role */}
          <div className="h-6 w-16 bg-[#f1f3f6] rounded-full mx-auto" />
          {/* Updated */}
          <div className="h-3 w-24 bg-[#f1f3f6] rounded" />
          {/* Actions */}
          <div className="h-4 w-4 bg-[#f1f3f6] rounded ml-auto" />
        </div>
      ))}
    </div>
  );
};
