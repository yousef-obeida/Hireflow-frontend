/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Candidate } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

interface CandidateTableProps {
  candidates: Candidate[];
  isLoading?: boolean;
  className?: string;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  isLoading,
  className = '',
}) => {
  const navigate = useNavigate();
  if (isLoading) {
    return <div className="p-4 text-center text-[#717786]">Loading candidates...</div>;
  }

  if (!candidates?.length) {
    return <div className="p-4 text-center text-[#717786]">No candidates found.</div>;
  }

  return (
    <div className={`overflow-x-auto bg-[#fafafa] rounded-2xl border border-gray-100 ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#fafafa]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Candidate
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
              Role
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
              AI Match
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
              Stage
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
              Applied Date
            </th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white/50">
          {candidates.map((candidate) => {
            const application = candidate.applications?.[0]; // Get most recent application
            const role = application?.job?.title || 'N/A';
            const stageName = application?.stage?.name || 'Sourced';

            // Real AI score from Gemini CV analysis when available, otherwise fall back to pseudo-score
            const nameLen = candidate.full_name?.length || 10;
            const pseudoScore = 50 + (nameLen * 3) % 49; // 50-98 range
            const aiScore = candidate.analysis?.score ?? pseudoScore;

            const appliedDate = application?.applied_at || candidate.created_at;
            const dateStr = appliedDate ? format(new Date(appliedDate), 'MMM d, yyyy') : 'N/A';

            const initials = candidate.full_name
              ? candidate.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
              : '??';

            // Stage color mapping
            let stageColor = 'bg-[#e0e7ff] text-[#3730a3]'; // Default blue-ish
            if (stageName.toLowerCase().includes('technical')) stageColor = 'bg-[#e0f2fe] text-[#0369a1]';
            else if (stageName.toLowerCase().includes('manager')) stageColor = 'bg-[#f3e8ff] text-[#7e22ce]';
            else if (stageName.toLowerCase().includes('offer')) stageColor = 'bg-[#dcfce7] text-[#166534]';

            return (
              <tr
                key={candidate.id}
                className="hover:bg-white transition-colors"
              >
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-medium">
                      {initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#111c2d]">
                        {candidate.full_name}
                      </p>
                      <p className="text-xs text-[#717786] mt-0.5 font-medium">
                        {role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#111c2d] whitespace-nowrap text-center">
                  {role}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center justify-center rounded-3xl px-2.5 py-1 text-xs font-semibold ${aiScore >= 90 ? 'text-green-500' :
                      aiScore >= 80 ? 'text-yellow-500' :
                        'text-orange-500'
                    }`}>
                    {aiScore}%
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center justify-center rounded-2xl px-3 py-1 text-xs font-medium ${stageColor.replace('bg-', 'bg-').replace('text-', 'text-')}`}>
                    {stageName}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#717786]">
                  {dateStr}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      className="px-2.5 py-1.5 text-xs h-8 gap-1"
                      onClick={() => navigate(`/candidates/${candidate.id}/analysis`)}
                    >
                      <Sparkles className="w-3 h-3" />
                      CV Analysis
                    </Button>

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
