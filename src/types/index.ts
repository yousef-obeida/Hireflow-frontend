/* ------------------------------------------------------------------ */
/*  Types matching backend API Resources                               */
/* ------------------------------------------------------------------ */

export type BadgeVariant = 'applied' | 'interview' | 'hired' | 'rejected' | 'draft';
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export type UserRole = 'admin' | 'hr';
export type JobStatus = 'open' | 'closed';
export type JobLocation = 'onsite' | 'remote' | 'hybrid';
export type ApplicationStatus = 'active' | 'hired' | 'rejected';
export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled';

/* ── User (UserResource) ───────────────────────────────────────────── */
export interface User {
  id: number;
  user_id?: number;
  name: string;
  email: string;
  role: UserRole;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

/* ── Job (JobResource) ─────────────────────────────────────────────── */
export interface Job {
  id: number;
  title: string;
  description: string;
  requirments: string;        // backend typo preserved
  status: JobStatus;
  location: JobLocation;
  salary: number | null;
  applications?: Application[];
  created_at?: string;
  updated_at?: string;
}

/* ── Candidate (CandidateResource) ─────────────────────────────────── */
export interface Candidate {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  cv_path: string | null;
  applications?: Application[];
  created_at?: string;
  updated_at?: string;
}

/* ── Stage ─────────────────────────────────────────────────────────── */
export interface Stage {
  id: number;
  name: string;
  order: number;
  applications?: Application[];
}

/* ── Application (ApplicationResource) ─────────────────────────────── */
export interface Application {
  id: number;
  candidate_id: number;
  job_post_id: number;
  stage_id: number;
  status: ApplicationStatus;
  applied_at?: string;
  candidate?: Candidate;
  job?: Job;
  stage?: Pick<Stage, 'id' | 'name' | 'order'>;
  interviews?: Interview[];
  created_at?: string;
  updated_at?: string;
}

/* ── Interview (InterviewResource) ─────────────────────────────────── */
export interface Interview {
  id: number;
  application_id: number;
  date: string;
  time: string;
  interviewer: string;
  type: string;
  status: InterviewStatus;
  application?: Application;
  created_at?: string;
  updated_at?: string;
}

/* ── CV Analysis (CvAnalysisResource) ──────────────────────────────── */
export interface CvAnalysis {
  summary: string;
  skills: string[];
  experience_years: number;
  score: number;
  recommendation: string;
}

/* ── Dashboard stats (DashboardController) ─────────────────────────── */
export interface DashboardStats {
  total_jobs: number;
  total_candidates: number;
  hired_count: number;
  rejected_count: number;
  interview_count: number;
}

/* ── API envelope ──────────────────────────────────────────────────── */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}

/* ── Design-system types (existing, kept for App.tsx) ──────────────── */
export interface DesignCandidate {
  id: string;
  name: string;
  initials?: string;
  role: string;
  experience: string;
  avatarUrl?: string;
  score: number;
  status: string;
  stage: BadgeVariant;
  source: string;
}

export interface FormValues {
  fullName: string;
  jobLevel: 'Senior Software Engineer' | 'Lead Product Designer' | 'Staff Data Scientist';
  privateNote: string;
  agreeToPolicy: boolean;
}
