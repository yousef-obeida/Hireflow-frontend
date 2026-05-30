import React from 'react';
import { motion } from 'framer-motion';
import { Clock, GripVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Application, Candidate } from '@/types';

interface PipelineCardProps {
  application: Application & { candidate: Candidate };
  onDragStart: (e: React.DragEvent, applicationId: number) => void;
  onClick?: (candidateId: number) => void;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({
  application,
  onDragStart,
  onClick,
}) => {
  const { candidate } = application;

  const initials = candidate.full_name
    ? candidate.full_name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
    : '??';

  const role = application.job?.title ?? 'Candidate';
  const appliedDate = application.applied_at || candidate.created_at;
  const timeAgo = appliedDate
    ? formatDistanceToNow(new Date(appliedDate), { addSuffix: true })
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, application.id)}
      onClick={() => onClick?.(candidate.id)}
      className="group bg-white rounded-xl border border-gray-100 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing transition-shadow select-none"
    >
      {/* Drag handle indicator */}
      <div className="flex items-start gap-3">
        <GripVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0" />

        <div className="flex-1 min-w-0">
          {/* Candidate Info */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#334155] to-[#1e293b] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-[#111c2d] truncate">{candidate.full_name}</p>
              <p className="text-[11px] text-[#717786] font-medium truncate">{role}</p>
            </div>
          </div>

          {/* Footer meta */}
          {timeAgo && (
            <div className="flex items-center gap-1 text-[11px] text-[#9ca3af] font-medium">
              <Clock className="w-3 h-3" />
              {timeAgo}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PipelineCard;
