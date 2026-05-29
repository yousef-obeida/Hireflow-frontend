import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreHorizontal } from 'lucide-react';
import { PipelineCard } from './PipelineCard';
import type { Application, Candidate, Stage } from '@/types';

interface PipelineColumnProps {
  stage: Stage;
  applications: (Application & { candidate: Candidate })[];
  onDragStart: (e: React.DragEvent, applicationId: number) => void;
  onDrop: (e: React.DragEvent, stageId: number) => void;
  onCardClick?: (candidateId: number) => void;
}

export const PipelineColumn: React.FC<PipelineColumnProps> = ({
  stage,
  applications,
  onDragStart,
  onDrop,
  onCardClick,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only trigger leave when actually leaving the column boundary
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e, stage.id);
  };

  // Column color accent based on stage order
  const getColumnAccent = (order: number) => {
    const accents = [
      { border: 'border-t-[#0058bc]', badge: 'bg-[#d0e1fb] text-[#0058bc]' },
      { border: 'border-t-[#7c3aed]', badge: 'bg-[#ede9fe] text-[#7c3aed]' },
      { border: 'border-t-[#d97706]', badge: 'bg-[#fef3c7] text-[#92400e]' },
      { border: 'border-t-[#16a34a]', badge: 'bg-[#dcfce7] text-[#166534]' },
      { border: 'border-t-[#dc2626]', badge: 'bg-[#fee2e2] text-[#991b1b]' },
      { border: 'border-t-[#0891b2]', badge: 'bg-[#cffafe] text-[#155e75]' },
    ];
    return accents[(order - 1) % accents.length];
  };

  const accent = getColumnAccent(stage.order);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col w-[320px] min-w-[320px] h-full rounded-2xl border bg-[#fafbfc] transition-colors duration-200 border-t-[3px] ${accent.border} ${
        isDragOver
          ? 'bg-[#f0f3ff] border-[#0058bc]/30 shadow-lg'
          : 'border-gray-100'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-2.5">
          <h3 className="font-bold text-sm text-[#111c2d] tracking-tight">
            {stage.name}
          </h3>
          <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold ${accent.badge}`}>
            {applications.length}
          </span>
        </div>
        <button className="p-1 rounded-lg hover:bg-gray-100 text-[#717786] transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Cards Container (scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2.5 min-h-[120px]">
        <AnimatePresence mode="popLayout">
          {applications.length > 0 ? (
            applications.map((app) => (
              <PipelineCard
                key={app.id}
                application={app}
                onDragStart={onDragStart}
                onClick={onCardClick}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-gray-200 text-xs text-[#9ca3af] font-medium"
            >
              Drop candidates here
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PipelineColumn;
