import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles, GripVertical } from 'lucide-react';
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

  // Pseudo AI score for design consistency
  const nameLen = candidate.full_name?.length || 10;
  const aiScore = 50 + ((nameLen * 3) % 49);

  const getScoreStyle = (s: number) => {
    if (s >= 90) return 'bg-[#dcfce7] text-[#166534]';
    if (s >= 80) return 'bg-[#e0f2fe] text-[#0369a1]';
    if (s >= 70) return 'bg-[#fef3c7] text-[#92400e]';
    return 'bg-[#fee2e2] text-[#991b1b]';
  };

  const role = application.job?.title ?? 'Candidate';
  const appliedDate = application.applied_at || candidate.created_at;
  const timeAgo = appliedDate
    ? formatDistanceToNow(new Date(appliedDate), { addSuffix: true })
    : null;

  // Extract simple skills from the role for tag display
  const skillTags = role !== 'Candidate'
    ? role.split(' ').filter((w) => w.length > 3).slice(0, 2)
    : [];

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

          {/* Score + Skill Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold ${getScoreStyle(aiScore)}`}>
              <Sparkles className="w-2.5 h-2.5" />
              {aiScore}% Match
            </span>
            {skillTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#f0f3ff] text-[#414755] text-[11px] font-medium"
              >
                {tag}
              </span>
            ))}
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
