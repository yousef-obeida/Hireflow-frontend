import React from 'react';
import { motion } from 'framer-motion';
import type { Interview } from '@/types';
import { InterviewsTableRow } from './InterviewsTableRow';
import { InterviewsTableSkeleton } from './InterviewsTableSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InterviewsTableProps {
  interviews: Interview[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onView?: (interview: Interview) => void;
  onEdit?: (interview: Interview) => void;
  onCancel?: (interview: Interview) => void;
  onSchedule?: () => void;
  className?: string;
}

/**
 * Interviews table — handles loading, error, empty, and data states.
 */
export const InterviewsTable: React.FC<InterviewsTableProps> = ({
  interviews,
  isLoading,
  isError,
  onRetry,
  onView,
  onEdit,
  onCancel,
  onSchedule,
  className = '',
}) => {
  if (isLoading) return <InterviewsTableSkeleton />;

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <ErrorState message="Failed to load interviews." onRetry={onRetry} />
      </div>
    );
  }

  if (!interviews?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <EmptyState
          title="No interviews found"
          description="Schedule your first interview to start managing candidate screenings."
          icon={<CalendarCheck className="w-7 h-7 text-[#0058bc]" />}
          action={
            onSchedule ? (
              <Button variant="primary" className="px-5 py-2.5 text-sm" onClick={onSchedule}>
                Schedule Interview
              </Button>
            ) : undefined
          }
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={`overflow-x-auto bg-white rounded-2xl border border-gray-100 ${className}`}
    >
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#fafafa]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Candidate Name
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Job Role
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Interviewer
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Date/Time
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview) => (
            <InterviewsTableRow
              key={interview.id}
              interview={interview}
              onView={onView}
              onEdit={onEdit}
              onCancel={onCancel}
            />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
