import React from 'react';
import { motion } from 'framer-motion';

interface JobInfoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Reusable animated card wrapper for the Job Detail page sections.
 */
export const JobInfoCard: React.FC<JobInfoCardProps> = ({ children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};
