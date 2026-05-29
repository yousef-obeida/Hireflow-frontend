import React from 'react';

/**
 * Skeleton loader for the Job Detail page.
 * Renders shimmer blocks matching the real page layout.
 */
export const JobDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col gap-6 p-6 max-w-[1200px] mx-auto">
      {/* Back link */}
      <div className="h-4 w-32 bg-[#e8ecf0] rounded" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-3 flex-1">
          <div className="h-8 w-72 bg-[#e8ecf0] rounded-lg" />
          <div className="flex gap-3">
            <div className="h-6 w-20 bg-[#f1f3f6] rounded-full" />
            <div className="h-6 w-28 bg-[#f1f3f6] rounded-full" />
            <div className="h-6 w-24 bg-[#f1f3f6] rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-28 bg-[#e8ecf0] rounded-xl" />
          <div className="h-10 w-28 bg-[#e8ecf0] rounded-xl" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
            <div className="h-3 w-20 bg-[#f1f3f6] rounded" />
            <div className="h-7 w-16 bg-[#e8ecf0] rounded" />
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 h-64" />
        <div className="bg-white rounded-2xl border border-gray-100 h-64" />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 h-48" />
    </div>
  );
};
