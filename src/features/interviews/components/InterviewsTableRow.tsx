import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Pencil, XCircle} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import type { Interview } from '@/types';

interface InterviewsTableRowProps {
  interview: Interview;
  onView?: (interview: Interview) => void;
  onEdit?: (interview: Interview) => void;
  onCancel?: (interview: Interview) => void;
}

/**
 * Single row in the Interviews table.
 * Displays candidate name, job role, interviewer, date/time, status badge,
 * and an actions dropdown.
 */
export const InterviewsTableRow: React.FC<InterviewsTableRowProps> = ({
  interview,
  onEdit,
  onCancel,
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

  const candidateName = interview.application?.candidate?.full_name ?? 'Unknown Candidate';
  const candidateEmail = interview.application?.candidate?.email ?? '';
  const jobTitle = interview.application?.job?.title ?? 'N/A';
  const formattedDate = interview.date
    ? format(new Date(interview.date), 'MMM d, yyyy')
    : 'N/A';
  const formattedTime = interview.time ?? '';

  // Generate initials for the avatar
  const initials = candidateName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Hash-based avatar colour
  const avatarColors = [
    'bg-[#e7eeff] text-[#0058bc]',
    'bg-[#dcfce7] text-[#15803d]',
    'bg-[#fef3c7] text-[#b45309]',
    'bg-[#ede9fe] text-[#7c3aed]',
    'bg-[#fce7f3] text-[#be185d]',
    'bg-[#ffdad6] text-[#ba1a1a]',
  ];
  const colorIdx = candidateName.length % avatarColors.length;

  return (
    <tr className="group hover:bg-[#fafbff] transition-colors duration-150 border-b border-gray-100 last:border-0">
      {/* Candidate Name */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${avatarColors[colorIdx]}`}>
            {initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-[#0058bc] group-hover:underline transition-colors cursor-default">
              {candidateName}
            </p>
            {candidateEmail && (
              <p className="text-[11px] text-[#9ca3af] mt-0.5 font-medium">
                {candidateEmail}
              </p>
            )}
          </div>
        </div>
      </td>

      {/* Job Role */}
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-[#111c2d] font-medium">{jobTitle}</p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5">{interview.type}</p>
        </div>
      </td>

      {/* Interviewer */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[10px] font-bold text-[#414755]">
            {interview.interviewer?.charAt(0)?.toUpperCase() ?? '?'}
          </div>
          <span className="text-sm text-[#414755]">{interview.interviewer}</span>
        </div>
      </td>

      {/* Date/Time */}
      <td className="px-6 py-4">
        <div>
          <p className="text-sm text-[#111c2d] font-medium">{formattedDate}</p>
          <p className="text-[11px] text-[#9ca3af] mt-0.5">{formattedTime}</p>
        </div>
      </td>


      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center relative" ref={menuRef}>
          <button
            id={`interview-actions-${interview.id}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
            aria-label={`Actions for interview ${interview.id}`}
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
                className="absolute right-8 top-0 z-20 w-44 bg-white rounded-xl border border-[#e2e8f0] shadow-lg py-1.5 overflow-hidden"
              >

                    <button
                      onClick={() => { onEdit?.(interview); setMenuOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#717786]" />
                      Edit Interview
                    </button>
                    <div className="h-px bg-[#e2e8f0] mx-3 my-1" />
                    <button
                      onClick={() => { onCancel?.(interview); setMenuOpen(false); }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/30 transition-colors cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Delete Interview
                    </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  );
};
