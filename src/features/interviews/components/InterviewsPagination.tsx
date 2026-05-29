import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InterviewsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination footer for the interviews table.
 * Shows "Showing X of Y interviews" text and prev/next navigation buttons.
 */
export const InterviewsPagination: React.FC<InterviewsPaginationProps> = ({
  currentPage, totalPages, totalCount, perPage, onPageChange,
}) => {
  if (totalCount <= 0) return null;

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm font-medium text-[#0058bc]">
        Showing {start}–{end} of {totalCount} interviews
      </p>

      <div className="flex items-center gap-1.5">
        <button
          id="interviews-prev-page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2e8f0] text-[#717786] hover:bg-[#f0f3ff] hover:border-[#c1c6d7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          id="interviews-next-page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-[#e2e8f0] text-[#717786] hover:bg-[#f0f3ff] hover:border-[#c1c6d7] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
