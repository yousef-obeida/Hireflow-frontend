import { useDashboardData } from '../hooks/useDashboardData';
import { StatCard } from '../components/StatCard';
import { HiringVelocityChart } from '../components/HiringVelocityChart';
import { TodaySchedule } from '../components/TodaySchedule';
import { AiInsights } from '../components/AiInsights';
import { Briefcase, Users, UserX, UserCheck, Calendar, Plus } from 'lucide-react';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';

export const DashboardOverview = () => {
  const { data, isLoading, isError, error, refetch } = useDashboardData();

  if (isLoading) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <PageSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8">
        <ErrorState 
          message={(error as Error)?.message || "An unknown error occurred"} 
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl !font-bold !text-black">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Here is what's happening with your hiring pipeline today.</p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Open Jobs" 
          value={data.total_jobs} 
          icon={<Briefcase className="w-6 h-6" />}
        />
        <StatCard 
          title="Total Candidates" 
          value={data.total_candidates.toLocaleString()} 
          icon={<Users className="w-6 h-6" />}
        />
        <StatCard 
          title="Total Rejected" 
          value={data.rejected_count.toLocaleString()} 
          icon={<UserX className="w-6 h-6" />}
        />
        <StatCard 
          title="Total Hired" 
          value={data.hired_count.toLocaleString()} 
          icon={<UserCheck className="w-6 h-6" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-96">
            <HiringVelocityChart data={data.hiring_velocity} />
          </div>
          <TodaySchedule interviews={data.today_interviews} />
        </div>

        {/* Right Column (1/3 width on large screens) */}
        <div className="space-y-6">
          <AiInsights insights={data.ai_insights} />
        </div>
      </div>
    </div>
  );
};
