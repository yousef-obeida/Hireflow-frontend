/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import type { DesignCandidate as Candidate } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface CandidateTableProps {
  candidates: Candidate[];
  onAction?: (candidate: Candidate, actionType: 'view_cv' | 'manage') => void;
  className?: string;
  id?: string;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  onAction,
  className = '',
  id,
}) => {
  return (
    <div
      id={id ?? 'candidate-table-container'}
      className={`overflow-x-auto bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 ${className}`}
    >
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#f0f3ff] border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase">
              Candidate
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase">
              Stage
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {candidates.map((candidate) => {
            const initials = candidate.initials ?? candidate.name
              .split(' ')
              .map((n: string) => n[0])
              .join('');

            return (
              <tr
                key={candidate.id}
                className="hover:bg-[#f0f3ff]/40 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0058bc]/10 text-[#0058bc] flex items-center justify-center text-xs font-bold font-sans">
                      {initials}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-sm text-[#111c2d]">
                        {candidate.name}
                      </p>
                      <p className="text-xs text-[#717786] mt-0.5 font-medium">
                        {candidate.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={candidate.stage}>
                    {candidate.stage === 'interview' ? 'Tech Interview' : candidate.stage === 'draft' ? 'Draft' : candidate.stage}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => onAction?.(candidate, candidate.stage === 'hired' || candidate.stage === 'draft' ? 'manage' : 'view_cv')}
                    className="text-sm font-semibold text-[#0058bc] hover:underline hover:text-[#0070eb] cursor-pointer transition-colors"
                  >
                    {candidate.stage === 'hired' || candidate.stage === 'draft' ? 'Manage' : 'View CV'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
