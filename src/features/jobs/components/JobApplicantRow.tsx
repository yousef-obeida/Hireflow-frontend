import React from 'react';
import type { Application } from '@/types';
import { format } from 'date-fns';

interface JobApplicantRowProps {
  application: Application;
}

/**
 * Single row in the applicants table within the Job Detail page.
 */
export const JobApplicantRow: React.FC<JobApplicantRowProps> = ({ application }) => {
  const candidate = application.candidate;
  const name = candidate?.full_name ?? 'Unknown';
  const email = candidate?.email ?? '—';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const stageName = application.stage?.name ?? '—';

  const statusConfig: Record<string, { bg: string; text: string }> = {
    active: { bg: 'bg-[rgba(22,163,74,0.08)]', text: 'text-[#15803d]' },
    hired: { bg: 'bg-[rgba(37,99,235,0.08)]', text: 'text-[#2563eb]' },
    rejected: { bg: 'bg-[rgba(186,26,26,0.08)]', text: 'text-[#ba1a1a]' },
  };

  const statusStyle = statusConfig[application.status] ?? statusConfig.active;

  const appliedDate = application.applied_at
    ? format(new Date(application.applied_at), 'MMM d, yyyy')
    : application.created_at
      ? format(new Date(application.created_at), 'MMM d, yyyy')
      : '—';

  return (
    <tr className="group hover:bg-[#fafbff] transition-colors duration-150 border-b border-gray-100 last:border-0">
      {/* Candidate */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0058bc] to-[#2563eb] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111c2d]">{name}</p>
            <p className="text-[11px] text-[#9ca3af]">{email}</p>
          </div>
        </div>
      </td>

      {/* Stage */}
      <td className="px-5 py-3.5 text-sm text-[#414755]">{stageName}</td>

      {/* Status */}
      <td className="px-5 py-3.5 text-center">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${statusStyle.bg} ${statusStyle.text}`}
        >
          {application.status}
        </span>
      </td>

      {/* Applied */}
      <td className="px-5 py-3.5 text-sm text-[#717786] whitespace-nowrap">{appliedDate}</td>
    </tr>
  );
};
