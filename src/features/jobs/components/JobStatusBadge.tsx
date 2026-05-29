import React from 'react';
import type { JobStatus } from '@/types';

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig: Record<JobStatus, { label: string; bg: string; text: string; dot: string }> = {
  open: {
    label: 'OPEN',
    bg: 'bg-[rgba(22,163,74,0.08)]',
    text: 'text-[#15803d]',
    dot: 'bg-[#16a34a]',
  },
  closed: {
    label: 'CLOSED',
    bg: 'bg-[rgba(186,26,26,0.08)]',
    text: 'text-[#ba1a1a]',
    dot: 'bg-[#ba1a1a]',
  },
};

/**
 * Colored status badge for job postings.
 * Supports "open" and "closed" statuses with distinct color coding.
 */
export const JobStatusBadge: React.FC<JobStatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status] ?? statusConfig.open;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase select-none ${config.bg} ${config.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />
      {config.label}
    </span>
  );
};
