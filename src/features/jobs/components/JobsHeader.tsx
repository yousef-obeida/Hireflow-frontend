import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/Select';
import type { GetJobsFilters } from '../api/getJobs';

interface JobsHeaderProps {
  filters: GetJobsFilters;
  searchValue?: string;
  onSearch: (query: string) => void;
  onFilterChange: (filters: GetJobsFilters) => void;
  onPostJob: () => void;
}

/**
 * Page header for the Jobs Management page.
 * Contains the title, subtitle, search input, filter panel, and Post Job CTA.
 */
export const JobsHeader: React.FC<JobsHeaderProps> = ({
  filters,
  searchValue,
  onSearch,
  onFilterChange,
  onPostJob,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue ?? '');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLocalSearch(value);
      onSearch(value);
    },
    [onSearch],
  );

  const clearSearch = useCallback(() => {
    setLocalSearch('');
    onSearch('');
  }, [onSearch]);

  const hasActiveFilters = !!filters.status || !!filters.start_date || !!filters.end_date;

  return (
    <div className="space-y-4">
      {/* Top row: Title + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1
            className="text-3xl font-bold tracking-tight !text-black"
            style={{ fontWeight: 'bold' }}
          >
            Jobs Management
          </h1>
          <p className="text-[#717786] text-sm mt-1.5 font-medium">
            Manage your active job listings and review incoming candidates.
          </p>
        </motion.div>

        {/* Search + Filter toggle */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="flex items-center gap-2 shrink-0"
        >
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="jobs-search"
              type="text"
              value={localSearch}
              onChange={handleSearchChange}
              placeholder="Search job title or department..."
              className="pl-10 pr-9 py-2.5 bg-white border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl text-sm text-[#111c2d] placeholder:text-gray-400 focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none w-64"
            />
            {localSearch && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            id="jobs-filter-toggle"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'bg-[#0058bc]/5 border-[#0058bc]/20 text-[#0058bc]'
                : 'bg-white border-[#e2e8f0] text-[#717786] hover:border-[#c1c6d7] hover:text-[#414755]'
            }`}
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </button>

          {/* Post Job CTA */}
          <Button
            id="post-job-btn"
            variant="primary"
            className="px-4 py-2.5 text-sm gap-1.5"
            onClick={onPostJob}
          >
            <Plus className="w-4 h-4" />
            Post Job
          </Button>
        </motion.div>
      </div>

      {/* Filter bar (collapsible) */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap items-end gap-3 bg-white border border-[#e2e8f0] rounded-2xl px-5 py-4"
        >
          <div className="w-44">
            <Select
              id="jobs-status-filter"
              label="Status"
              value={filters.status || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  status: (e.target.value as GetJobsFilters['status']) || undefined,
                })
              }
              options={[
                { value: '', label: 'All Statuses' },
                { value: 'open', label: 'Open' },
                { value: 'closed', label: 'Closed' },
              ]}
            />
          </div>

          <div className="w-44">
            <label htmlFor="jobs-start-date" className="text-sm font-semibold text-[#111c2d] block mb-1.5">
              From
            </label>
            <input
              id="jobs-start-date"
              type="date"
              value={filters.start_date || ''}
              onChange={(e) => onFilterChange({ ...filters, start_date: e.target.value || undefined })}
              className="w-full bg-[#f0f3ff] border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl px-4 py-3 text-sm text-[#111c2d] focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none"
            />
          </div>

          <div className="w-44">
            <label htmlFor="jobs-end-date" className="text-sm font-semibold text-[#111c2d] block mb-1.5">
              To
            </label>
            <input
              id="jobs-end-date"
              type="date"
              value={filters.end_date || ''}
              onChange={(e) => onFilterChange({ ...filters, end_date: e.target.value || undefined })}
              className="w-full bg-[#f0f3ff] border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl px-4 py-3 text-sm text-[#111c2d] focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none"
            />
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              className="px-3 py-2.5 text-xs"
              onClick={() => onFilterChange({})}
            >
              Clear all
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};
