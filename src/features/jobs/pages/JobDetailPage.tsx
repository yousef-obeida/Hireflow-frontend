import { useParams, useNavigate } from 'react-router-dom';
import { useJob } from '../hooks/useJob';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  ArrowLeft,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Briefcase,
  CheckCircle2,
  XCircle,
  ClipboardList,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { JobStatusBadge } from '../components/JobStatusBadge';
import { JobDetailSkeleton } from '../components/JobDetailSkeleton';
import { JobInfoCard } from '../components/JobInfoCard';
import { JobStatCard } from '../components/JobStatCard';
import { JobApplicantRow } from '../components/JobApplicantRow';
import { ErrorState } from '@/components/ui/ErrorState';

/* ─── Helper ──────────────────────────────────────────────────────── */

/** Derive department from job title keywords (matches JobsTableRow) */
function getDepartment(title: string): string {
  const lower = title.toLowerCase();
  if (['frontend', 'backend', 'engineer', 'developer', 'devops'].some((k) => lower.includes(k)))
    return 'Engineering';
  if (['design', 'ux', 'ui'].some((k) => lower.includes(k))) return 'Design';
  if (['product', 'manager'].some((k) => lower.includes(k))) return 'Product';
  if (['hr', 'people', 'recruit'].some((k) => lower.includes(k))) return 'People Ops';
  if (['market', 'growth', 'seo'].some((k) => lower.includes(k))) return 'Growth';
  if (['data', 'analyst', 'scientist'].some((k) => lower.includes(k))) return 'Data';
  if (['sales', 'account'].some((k) => lower.includes(k))) return 'Sales';
  return 'General';
}

/** Format salary for display */
function formatSalary(salary: number | null): string {
  if (!salary) return 'Not specified';
  return `$${salary.toLocaleString('en-US')}/yr`;
}

/** Location label */
function formatLocation(location: string): string {
  const map: Record<string, string> = {
    onsite: 'Onsite',
    remote: 'Remote',
    hybrid: 'Hybrid',
  };
  return map[location] ?? location;
}

/* ─── Main Page Component ─────────────────────────────────────────── */

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: job, isLoading, isError, refetch } = useJob(id ?? '');

  if (isLoading) return <JobDetailSkeleton />;

  if (isError || !job) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <button
          onClick={() => navigate('/jobs')}
          className="inline-flex items-center gap-2 text-sm text-[#0058bc] font-semibold hover:underline w-fit group mb-6"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </button>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <ErrorState
            message="Failed to load job details. The job may have been removed."
            onRetry={() => refetch()}
          />
        </div>
      </div>
    );
  }

  // ── Derived values ────────────────────────────────────────────────
  const department = getDepartment(job.title);
  const applications = job.applications ?? [];
  const applicantCount = applications.length;
  const hiredCount = applications.filter((a) => a.status === 'hired').length;
  const rejectedCount = applications.filter((a) => a.status === 'rejected').length;
  const activeCount = applications.filter((a) => a.status === 'active').length;
  const jobIdStr = `#JOB-${String(job.created_at ? new Date(job.created_at).getFullYear() : 2024)}-${String(job.id).padStart(3, '0')}`;
  const createdDate = job.created_at ? format(new Date(job.created_at), 'MMM d, yyyy') : 'N/A';
  const updatedDate = job.updated_at ? format(new Date(job.updated_at), 'MMM d, yyyy') : 'N/A';

  return (
    <div id="job-detail-page" className="flex flex-col gap-6 p-6 max-w-[1200px] mx-auto">
      {/* ── Back Navigation ──────────────────────────────────────── */}
      <button
        onClick={() => navigate('/jobs')}
        className="inline-flex items-center gap-2 text-sm text-[#0058bc] font-semibold hover:underline w-fit group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Jobs
      </button>

      {/* ── Job Header ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl !text-black tracking-tight" style={{ fontWeight: 'bold' }}>{job.title}</h1>
            <JobStatusBadge status={job.status} />
          </div>
          <p className="text-xs text-[#9ca3af] font-medium tracking-wide mb-2">
            {jobIdStr}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
              <Briefcase className="w-3 h-3" />
              {department}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
              <MapPin className="w-3 h-3" />
              {formatLocation(job.location)}
            </span>
            {job.salary && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
                <DollarSign className="w-3 h-3" />
                {formatSalary(job.salary)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
              <Calendar className="w-3 h-3" />
              Posted {createdDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="px-4 py-2.5 text-sm gap-1.5"
            onClick={() => navigate(`/jobs?editing=${job.id}`)}
          >
            <Pencil className="w-4 h-4" />
            Edit Job
          </Button>
        </div>
      </motion.div>

      {/* ── Stat Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <JobStatCard
          label="Total Applicants"
          value={applicantCount}
          icon={Users}
          color="#0058bc"
          bgColor="#f0f3ff"
          delay={0.1}
        />
        <JobStatCard
          label="Active"
          value={activeCount}
          icon={ClipboardList}
          color="#d97706"
          bgColor="#fffbeb"
          delay={0.15}
        />
        <JobStatCard
          label="Hired"
          value={hiredCount}
          icon={CheckCircle2}
          color="#15803d"
          bgColor="#f0fdf4"
          delay={0.2}
        />
        <JobStatCard
          label="Rejected"
          value={rejectedCount}
          icon={XCircle}
          color="#ba1a1a"
          bgColor="#fef2f2"
          delay={0.25}
        />
      </div>

      {/* ── Content Grid: Description + Details ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Description */}
        <JobInfoCard className="lg:col-span-2" delay={0.15}>
          <h2 className="text-lg font-bold !text-black tracking-tight mb-4">
            Job Description
          </h2>
          <div className="text-sm text-[#414755] leading-relaxed whitespace-pre-line">
            {job.description || 'No description provided.'}
          </div>
        </JobInfoCard>

        {/* Job Details Sidebar */}
        <JobInfoCard delay={0.2}>
          <h2 className="text-lg font-bold !text-black tracking-tight mb-5">
            Job Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Status</span>
              <JobStatusBadge status={job.status} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Location</span>
              <span className="text-sm font-semibold text-[#111c2d]">{formatLocation(job.location)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Department</span>
              <span className="text-sm font-semibold text-[#111c2d]">{department}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Salary</span>
              <span className="text-sm font-semibold text-[#111c2d]">{formatSalary(job.salary)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Posted</span>
              <span className="text-sm font-semibold text-[#111c2d]">{createdDate}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-[#717786] font-semibold uppercase tracking-wider">Updated</span>
              <span className="text-sm font-semibold text-[#111c2d]">{updatedDate}</span>
            </div>
          </div>
        </JobInfoCard>
      </div>

      {/* ── Requirements ─────────────────────────────────────────── */}
      <JobInfoCard delay={0.25}>
        <h2 className="text-lg font-bold !text-black tracking-tight mb-4">
          Requirements
        </h2>
        <div className="text-sm text-[#414755] leading-relaxed whitespace-pre-line">
          {job.requirments || 'No requirements specified.'}
        </div>
      </JobInfoCard>

      {/* ── Applicants Table ──────────────────────────────────────── */}
      <JobInfoCard delay={0.3}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold !text-black tracking-tight">
            Applicants
          </h2>
          {applicantCount > 0 && (
            <span className="text-xs text-[#717786] font-semibold bg-[#f0f3ff] px-3 py-1 rounded-full">
              {applicantCount} total
            </span>
          )}
        </div>

        {applicantCount === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-[#e7eeff] flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-[#0058bc]" />
            </div>
            <p className="text-sm text-[#717786] font-medium">No applicants yet</p>
            <p className="text-xs text-[#9ca3af] mt-1">
              Applicants will appear here once candidates apply for this position.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead className="bg-[#fafafa]">
                <tr>
                  <th className="px-5 py-3 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
                    Candidate
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
                    Stage
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">
                    Status
                  </th>
                  <th className="px-5 py-3 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">
                    Applied
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <JobApplicantRow key={app.id} application={app} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </JobInfoCard>
    </div>
  );
}
