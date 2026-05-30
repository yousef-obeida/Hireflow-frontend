export interface HiringVelocityData {
  month: string;
  hires: number;
}

export interface AiInsight {
  id: number;
  type: 'warning' | 'success' | 'info';
  message: string;
  action_link?: string;
}

export interface RecentActivity {
  id: number;
  type: 'offer_accepted' | 'interview_feedback' | 'job_posted' | string;
  title: string;
  description: string;
  time: string;
}

export interface TodayInterview {
  id: number;
  application_id: number;
  date: string;
  time: string;
  interviewer: string;
  type: string;
  application: {
    id: number;
    candidate_id: number;
    job_id: number;
    candidate: {
      id: number;
      full_name: string;
    };
    job: {
      id: number;
      title: string;
    };
  };
}

export interface DashboardData {
  total_jobs: number;
  total_candidates: number;
  hired_count: number;
  rejected_count: number;
  interview_count: number;
  today_interviews: TodayInterview[];
  hiring_velocity: HiringVelocityData[];
  ai_insights: AiInsight[];
}
