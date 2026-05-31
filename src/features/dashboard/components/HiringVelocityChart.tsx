import type { HiringVelocityData } from '../types';
import { MoreHorizontal } from 'lucide-react';
import { subMonths, format } from 'date-fns';

interface HiringVelocityChartProps {
  data: HiringVelocityData[];
}

export const HiringVelocityChart = ({ data }: HiringVelocityChartProps) => {
  // Deduplicate data by month in case the backend returns duplicate rows due to a join bug
  const aggregatedData = data.reduce((acc, curr) => {
    const existing = acc.find(item => item.month === curr.month);
    if (existing) {
      // If there's a duplicate, we take the max instead of summing
      existing.hires = Math.max(existing.hires, curr.hires);
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as HiringVelocityData[]);

  // Generate the last 6 months (e.g., Dec, Jan, Feb, Mar, Apr, May)
  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    return format(subMonths(new Date(), 5 - i), 'MMM');
  });

  // Fill in any missing months with 0 hires
  const chartData = last6Months.map(month => {
    const found = aggregatedData.find(d => d.month === month);
    return found ? found : { month, hires: 0 };
  });

  // Find max value to scale the bars
  const maxHires = Math.max(...chartData.map(d => d.hires), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Hiring Velocity</h3>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 flex items-end justify-between space-x-2 mt-4 pb-6 relative">
        {chartData.map((item, index) => {
          const heightPercentage = (item.hires / maxHires) * 100;
          const minHeight = item.hires === 0 ? '4px' : `${heightPercentage}%`;
          const opacity = item.hires === 0 ? 0.1 : 0.5 + (heightPercentage / 200);

          return (
            <div key={index} className="flex flex-col items-center flex-1 group relative h-full justify-end">
              <div 
                className="w-full bg-[#0058bc] rounded-t-sm transition-all duration-300 ease-in-out group-hover:bg-[#0070eb] relative"
                style={{ height: minHeight, opacity }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  {item.hires} Hires
                </div>
              </div>
              {/* X-Axis Label */}
              <div className="absolute -bottom-6 text-xs text-slate-400 font-medium w-full text-center">
                {item.month}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
