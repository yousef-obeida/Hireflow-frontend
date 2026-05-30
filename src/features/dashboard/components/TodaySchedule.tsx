import type { TodayInterview } from '../types';
import { Video } from 'lucide-react';

interface TodayScheduleProps {
  interviews: TodayInterview[];
}

export const TodaySchedule = ({ interviews }: TodayScheduleProps) => {
  if (!interviews || interviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Today's Schedule</h3>
        <p className="text-slate-500 text-sm">No interviews scheduled for today.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">Today's Schedule</h3>
      
      <div className="space-y-4">
        {interviews.map((interview) => {
          // Parse time if it's a string like "10:00:00"
          const timeString = interview.time.substring(0, 5); // "10:00"
          const [hourStr, minuteStr] = timeString.split(':');
          let hour = parseInt(hourStr, 10);
          const ampm = hour >= 12 ? 'PM' : 'AM';
          hour = hour % 12;
          hour = hour ? hour : 12; // the hour '0' should be '12'
          const formattedTime = `${hour}:${minuteStr}`;

          return (
            <div key={interview.id} className="flex items-center p-4 border border-slate-100 rounded-lg hover:border-[#c1c6d7]/50 hover:bg-[#f0f3ff] transition-colors group">
              <div className="flex flex-col items-center justify-center bg-[#e7eeff] text-[#0058bc] rounded-lg w-14 h-14 shrink-0 mr-4">
                <span className="font-bold text-sm">{formattedTime}</span>
                <span className="text-[10px] font-medium">{ampm}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-800 font-semibold text-sm truncate">
                  {interview.type} Interview: {interview.application?.job?.title || 'Position'}
                </h4>
                <div className="flex items-center text-slate-500 text-sm mt-1">
                  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="truncate">
                    {interview.application?.candidate?.full_name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
