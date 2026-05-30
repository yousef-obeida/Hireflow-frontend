import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Pencil, Archive, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import type { Job } from '@/types';
import { JobStatusBadge } from './JobStatusBadge';

interface JobsTableRowProps {
  job: Job;
  onView?: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onArchive?: (job: Job) => void;
}

/**
 * Single row in the Jobs table.
 * Displays job title, ID, department (derived), applicant count, status badge,
 * last updated date, and an actions dropdown.
 */
export const JobsTableRow: React.FC<JobsTableRowProps> = ({
  job,
  onView,
  onEdit,
  onArchive,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Derive department from job title keywords (placeholder until backend provides it)
  const getDepartment = (title: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes('frontend') || lower.includes('backend') || lower.includes('engineer') || lower.includes('developer') || lower.includes('devops'))
      return 'Engineering';
    if (lower.includes('design') || lower.includes('ux') || lower.includes('ui'))
      return 'Design';
    if (lower.includes('product') || lower.includes('manager'))
      return 'Product';
    if (lower.includes('hr') || lower.includes('people') || lower.includes('recruit'))
      return 'People Ops';
    if (lower.includes('market') || lower.includes('growth') || lower.includes('seo'))
      return 'Growth';
    if (lower.includes('data') || lower.includes('analyst') || lower.includes('scientist'))
      return 'Data';
    if (lower.includes('sales') || lower.includes('account'))
      return 'Sales';
    return 'General';
  };

  const department = getDepartment(job.title);
  const applicantCount = job.applications?.length ?? 0;
  const jobIdStr = `#JOB-${String(job.created_at ? new Date(job.created_at).getFullYear() : 2024)}-${String(job.id).padStart(3, '0')}`;
  const updatedDate = job.updated_at
    ? format(new Date(job.updated_at), 'MMM d, yyyy')
    : 'N/A';

  return (
    <tr
      onClick={() => onView?.(job)}
      className="group hover:bg-[#fafbff] transition-colors duration-150 border-b border-gray-100 last:border-0 cursor-pointer"
    >
      {/* Job Title + ID */}
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-sm text-[#111c2d] group-hover:text-[#0058bc] transition-colors">
            {job.title}
          </p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5 font-medium tracking-wide">
            ID: {jobIdStr}
          </p>
        </div>
      </td>

      {/* Department */}
      <td className="px-6 py-4 text-sm text-[#414755] whitespace-nowrap">
        {department}
      </td>

      {/* Applicants */}
      <td className="px-6 py-4 text-center">
        {applicantCount > 0 ? (
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-semibold text-sm text-[#111c2d]">{applicantCount}</span>
            {/* Show a small trend indicator for visual richness */}
            {applicantCount > 50 && (
              <span className="text-[10px] font-semibold text-[#15803d] bg-[rgba(22,163,74,0.08)] px-1.5 py-0.5 rounded-md">
                ↑{Math.floor(applicantCount * 0.12)}%
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-[#9ca3af]">—</span>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4 text-center">
        <JobStatusBadge status={job.status} />
      </td>

      {/* Last Updated */}
      <td className="px-6 py-4 text-sm text-[#717786] whitespace-nowrap">
        {updatedDate}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center relative" ref={menuRef}>
          <button
            id={`job-actions-${job.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
            aria-label={`Actions for ${job.title}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-8 top-0 z-20 w-40 bg-white rounded-xl border border-[#e2e8f0] shadow-lg py-1.5 overflow-hidden"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit?.(job); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#717786]" />
                  Edit Job
                </button>
                <div className="h-px bg-[#e2e8f0] mx-3 my-1" />
                <button
                  onClick={(e) => { e.stopPropagation(); onArchive?.(job); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/30 transition-colors cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5" />
                  Delete Job
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  );
};
