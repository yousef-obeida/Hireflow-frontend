import type { RecentActivity as ActivityType } from '../types';
import { CheckCircle2, MessageSquare, PlusCircle } from 'lucide-react';

interface RecentActivityProps {
  activities: ActivityType[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'offer_accepted':
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
      case 'interview_feedback':
        return <MessageSquare className="w-4 h-4 text-slate-400" />;
      case 'job_posted':
        return <PlusCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-slate-300" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
      
      <div className="relative border-l border-slate-100 ml-3 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative pl-6">
            <div className="absolute -left-[9px] top-1 bg-white p-0.5 rounded-full border border-slate-100">
              {getIcon(activity.type)}
            </div>
            
            <div>
              <p className="text-sm font-medium text-slate-800">
                {/* Highlight specific words */}
                {activity.title.split(/(Sarah Jenkins|Data Analyst)/).map((part, i) => 
                  ['Sarah Jenkins', 'Data Analyst'].includes(part) ? (
                    <strong key={i} className="font-semibold">{part}</strong>
                  ) : (
                    part
                  )
                )}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {activity.description} • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-4 py-2 w-full transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
};
