import React from 'react';

/**
 * Skeleton loader for the Jobs table.
 * Renders shimmer rows matching the real table column layout.
 */
export const JobsTableSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-[#fafafa]">
        <div className="h-3 w-24 bg-[#e8ecf0] rounded" />
        <div className="h-3 w-28 bg-[#e8ecf0] rounded" />
        <div className="h-3 w-24 bg-[#e8ecf0] rounded" />
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
          {/* Job title + ID */}
          <div className="space-y-2 w-36">
            <div className="h-3.5 w-32 bg-[#e8ecf0] rounded" />
            <div className="h-2.5 w-24 bg-[#f1f3f6] rounded" />
          </div>
          {/* Department */}
          <div className="h-3 w-20 bg-[#f1f3f6] rounded" />
          {/* Applicants */}
          <div className="h-3 w-8 bg-[#f1f3f6] rounded mx-auto" />
          {/* Status */}
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
