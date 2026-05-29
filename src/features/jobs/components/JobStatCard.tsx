import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface JobStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
  delay?: number;
}

/**
 * Stat metric card used in the Job Detail page hero area.
 */
export const JobStatCard: React.FC<JobStatCardProps> = ({
  label,
  value,
  icon: Icon,
  color = '#0058bc',
  bgColor = '#f0f3ff',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-5 flex items-center gap-4"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-xl font-bold text-[#111c2d]">{value}</p>
      </div>
    </motion.div>
  );
};
