/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Select } from '@/components/ui/Select';
import type { UseCandidatesFilters } from '../hooks/useCandidates';

interface CandidateFiltersProps {
  filters: UseCandidatesFilters;
  setFilters: (filters: UseCandidatesFilters) => void;
  className?: string;
}

export const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  filters,
  setFilters,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-48">
        <Select 
          id="stage-filter"
          value={filters.stage || ''} 
          onChange={(e) => setFilters({ ...filters, stage: e.target.value })}
          options={[
            { value: '', label: 'All Stages' },
            { value: 'applied', label: 'Applied' },
            { value: 'screening', label: 'Screening' },
            { value: 'interview', label: 'Interview' },
          ]}
        />
      </div>
      <div className="w-40">
        <Select 
          id="score-filter"
          value={filters.score || ''} 
          onChange={(e) => setFilters({ ...filters, score: e.target.value })}
          options={[
            { value: '', label: 'All Scores' },
            { value: 'high', label: '> 90%' },
            { value: 'medium', label: '> 70%' },
          ]}
        />
      </div>
    </div>
  );
};
