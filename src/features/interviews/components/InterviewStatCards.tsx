import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CalendarCheck, Clock, TrendingUp } from 'lucide-react';
import type { Interview } from '@/types';

interface InterviewStatCardsProps {
  interviews: Interview[];
}

/**
 * Four stat cards at the top of the Interviews page.
 * Shows today's schedule count, total scheduled, awaiting feedback, and completion rate.
 */
export const InterviewStatCards: React.FC<InterviewStatCardsProps> = ({ interviews }) => {
  const today = new Date().toISOString().split('T')[0];

  const todayCount = interviews.filter((i) => i.date === today && i.status === 'scheduled').length;
  const totalScheduled = interviews.filter((i) => i.status === 'scheduled').length;
  const completed = interviews.filter((i) => i.status === 'completed').length;
  const awaitingFeedback = completed; // completed interviews are "awaiting feedback"
  const total = interviews.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      label: "Today's Schedule",
      value: todayCount,
      sub: todayCount > 0 ? `${todayCount} interview${todayCount > 1 ? 's' : ''} today` : 'None today',
      icon: Calendar,
      accent: '#0058bc',
      bgAccent: 'bg-[#e7eeff]',
    },
    {
      label: 'Total Scheduled',
      value: totalScheduled,
      sub: 'Upcoming',
      icon: Clock,
      accent: '#7c3aed',
      bgAccent: 'bg-[#ede9fe]',
    },
    {
      label: 'Awaiting Feedback',
      value: awaitingFeedback,
      sub: awaitingFeedback > 0 ? 'Need review' : 'All clear',
      icon: CalendarCheck,
      accent: '#d97706',
      bgAccent: 'bg-[#fef3c7]',
    },
    {
      label: 'Completion Rate',
      value: `${completionRate}%`,
      sub: `${completed} of ${total} total`,
      icon: TrendingUp,
      accent: '#15803d',
      bgAccent: 'bg-[#dcfce7]',
      progress: completionRate,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.06 }}
          className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col gap-2 hover:shadow-md hover:border-gray-200 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#717786] tracking-wide uppercase">
              {card.label}
            </span>
            <div className={`w-8 h-8 rounded-lg ${card.bgAccent} flex items-center justify-center`}>
              <card.icon className="w-4 h-4" style={{ color: card.accent }} />
            </div>
          </div>

          <p className="text-2xl font-bold text-[#111c2d]">{card.value}</p>

          {card.progress !== undefined ? (
            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${card.progress}%` }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.06 }}
                className="h-full rounded-full"
                style={{ backgroundColor: card.accent }}
              />
            </div>
          ) : (
            <p className="text-xs font-medium text-[#717786]">{card.sub}</p>
          )}
        </motion.div>
      ))}
    </div>
  );
};
