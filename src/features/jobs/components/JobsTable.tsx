import React from 'react';
import { motion } from 'framer-motion';
import type { Job } from '@/types';
import { JobsTableRow } from './JobsTableRow';
import { JobsTableSkeleton } from './JobsTableSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface JobsTableProps {
  jobs: Job[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onView?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onArchive?: (job: Job) => void;
  onPostJob?: () => void;
  className?: string;
}

export const JobsTable: React.FC<JobsTableProps> = ({
  jobs, isLoading, isError, onRetry, onView, onEdit, onArchive, onPostJob, className = '',
}) => {
  if (isLoading) return <JobsTableSkeleton />;

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <ErrorState message="Failed to load job listings." onRetry={onRetry} />
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <EmptyState
          title="No jobs found"
          description="Create your first job posting to start attracting candidates."
          icon={<Briefcase className="w-7 h-7 text-[#0058bc]" />}
          action={onPostJob ? <Button variant="primary" className="px-5 py-2.5 text-sm" onClick={onPostJob}>Post a Job</Button> : undefined}
        />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className={`overflow-x-auto bg-white rounded-2xl border border-gray-100 ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#fafafa]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">Job Title</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">Department</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">Applicants</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">Status</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">Last Updated</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <JobsTableRow key={job.id} job={job} onView={onView} onEdit={onEdit} onArchive={onArchive} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
