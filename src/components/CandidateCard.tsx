/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import type { DesignCandidate as Candidate } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface CandidateCardProps {
  candidate: Candidate;
  onSchedule?: (candidate: Candidate) => void;
  onMoreActions?: (candidate: Candidate, event: React.MouseEvent) => void;
  className?: string;
  id?: string;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onSchedule,
  onMoreActions,
  className = '',
  id,
}) => {
  return (
    <div
      id={id ?? `candidate-card-${candidate.id}`}
      className={`bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between transition-transform duration-200 hover:shadow-md ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {candidate.avatarUrl ? (
            <img
              alt={`${candidate.name} avatar`}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100"
              src={candidate.avatarUrl}
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#d0e1fb] text-[#0058bc] flex items-center justify-center font-bold text-lg">
              {candidate.initials ?? candidate.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          )}
          <div>
            <h3 className="font-sans font-semibold text-lg text-[#111c2d] tracking-tight">
              {candidate.name}
            </h3>
            <p className="text-xs text-[#717786] font-medium mt-0.5">
              {candidate.role} • {candidate.experience}
            </p>
          </div>
        </div>
        <Badge variant={candidate.stage}>{candidate.stage}</Badge>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#f0f3ff] p-3 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Score</p>
          <p className="font-sans font-bold text-xl text-[#0058bc]">
            {candidate.score}
          </p>
        </div>
        <div className="bg-[#f0f3ff] p-3 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Status</p>
          <p className="font-sans font-bold text-sm text-[#111c2d] leading-7 truncate max-w-full">
            {candidate.status}
          </p>
        </div>
        <div className="bg-[#f0f3ff] p-3 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Source</p>
          <p className="font-sans font-bold text-sm text-[#111c2d] leading-7 truncate max-w-full">
            {candidate.source}
          </p>
        </div>
      </div>

      {/* Primary Call to Action Footer */}
      <div className="flex gap-2.5">
        <Button
          variant="primary"
          className="flex-1 py-2.5"
          onClick={() => onSchedule?.(candidate)}
        >
          Schedule
        </Button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={(e: React.MouseEvent) => onMoreActions?.(candidate, e)}
          className="px-3 border border-[#c1c6d7] hover:bg-[#f0f3ff] text-[#717786] rounded-xl flex items-center justify-center transition-colors"
          title="More actions"
        >
          <MoreHorizontal className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
