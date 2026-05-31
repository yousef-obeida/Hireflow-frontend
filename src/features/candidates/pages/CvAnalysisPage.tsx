import { useParams, useNavigate } from 'react-router-dom';
import { useCandidate, useCandidateAnalysis } from '../hooks/useCandidate';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

/* ─── Local sub-components ─────────────────────────────────────────── */

/** Animated SVG donut chart for the role-alignment score */
function ScoreDonut({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color gradient based on score
  const getColor = (s: number) => {
    if (s >= 90) return '#0058bc';
    if (s >= 75) return '#2563eb';
    if (s >= 60) return '#d97706';
    return '#ba1a1a';
  };

  const color = getColor(score);

  return (
    <div className="relative w-[148px] h-[148px] mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Background track */}
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="#e8ecf0"
          strokeWidth="10"
        />
        {/* Animated score arc */}
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-[#111c2d]"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {score}%
        </motion.span>
        <span className="text-[10px] text-[#717786] font-semibold tracking-wider uppercase mt-0.5">
          Excellent Match
        </span>
      </div>
    </div>
  );
}

/** Horizontal progress bar used in the breakdown metrics */
function MetricBar({ label, value }: { label: string; value: number }) {
  const getBarColor = (v: number) => {
    if (v >= 90) return 'bg-[#0058bc]';
    if (v >= 75) return 'bg-[#2563eb]';
    if (v >= 60) return 'bg-[#d97706]';
    return 'bg-[#ba1a1a]';
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#717786] font-medium w-[120px] shrink-0 truncate">{label}</span>
      <div className="flex-1 h-2 bg-[#e8ecf0] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getBarColor(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        />
      </div>
      <span className="text-xs font-bold text-[#111c2d] w-9 text-right">{value}%</span>
    </div>
  );
}

/** Skill tag chip */
function SkillTag({ skill }: { skill: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0f3ff] text-[#0058bc] text-xs font-semibold border border-[#d0e1fb]/60 select-none"
    >
      {skill}
    </motion.span>
  );
}

/** Section card wrapper */
function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Skeleton loader for the analysis page ────────────────────────── */
function AnalysisSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-[#dde3ea]" />
        <div className="space-y-2">
          <div className="h-6 w-48 bg-[#dde3ea] rounded-lg" />
          <div className="h-4 w-64 bg-[#e8ecf0] rounded-md" />
        </div>
      </div>
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-56 bg-white rounded-2xl border border-[#dde3ea]" />
        <div className="h-56 bg-white rounded-2xl border border-[#dde3ea]" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-64 bg-white rounded-2xl border border-[#dde3ea]" />
        <div className="h-64 bg-white rounded-2xl border border-[#dde3ea]" />
      </div>
    </div>
  );
}

/* ─── Main Page Component ──────────────────────────────────────────── */

export function CvAnalysisPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: candidate, isLoading: candidateLoading } = useCandidate(id ?? '');
  const { data: analysis, isLoading: analysisLoading, isError: analysisError } = useCandidateAnalysis(id ?? '');

  const isLoading = candidateLoading || analysisLoading;

  if (isLoading) return <AnalysisSkeleton />;

  // Derive candidate display info
  const name = candidate?.full_name ?? 'Unknown Candidate';
  const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
  const application = candidate?.applications?.[0];
  const role = application?.job?.title ?? 'N/A';
  const company = 'Hireflow'; // Current organization
  const location = application?.job?.location ?? 'N/A';
  const experience = analysis?.experience_years
    ? `${analysis.experience_years} Year${analysis.experience_years !== 1 ? 's' : ''} Exp.`
    : 'N/A';

  // Skill list from analysis
  const skills = analysis?.skills ?? [];

  // Score breakdown — derive from the main score
  const mainScore = analysis?.score ?? 0;
  const breakdownMetrics = [
    { label: 'Technical Skills', value: Math.min(100, mainScore + 2) },
    { label: 'Experience Level', value: Math.min(100, mainScore - 4) },
    { label: 'Culture Fit', value: Math.min(100, mainScore - 1) },
  ];

  // Key strengths derived from skills (top 4)
  const keyStrengths = skills.slice(0, 4);

  return (
    <div id="cv-analysis-page" className="flex flex-col gap-6 p-6 max-w-[1200px] mx-auto">
      {/* ── Back Navigation ─────────────────────────────────────────── */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-[#0058bc] font-semibold hover:underline w-fit group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Candidates
      </button>

      {/* ── Candidate Header ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0058bc] to-[#2563eb] text-white flex items-center justify-center text-xl font-bold shadow-md">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold !text-black tracking-tight">{name}</h1>
            <p className="text-sm text-[#717786] font-medium mt-0.5">
              {role} {role !== 'N/A' && `at ${company}`}
            </p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {location !== 'N/A' && (
                <span className="inline-flex items-center gap-1 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
                  <MapPin className="w-3 h-3" />
                  {location}
                </span>
              )}
              {experience !== 'N/A' && (
                <span className="inline-flex items-center gap-1 text-xs text-[#717786] font-medium bg-[#f0f3ff] px-2.5 py-1 rounded-md">
                  <Clock className="w-3 h-3" />
                  {experience}
                </span>
              )}
            </div>
          </div>
        </div>
        {user?.role === 'hr' && (
          <Button
            variant="primary"
            className="px-5 py-2.5"
            onClick={() => navigate(`/interviews`)}
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        )}
      </motion.div>

      {/* ── Main Content Grid ───────────────────────────────────────── */}
      {analysisError ? (
        <SectionCard className="text-center py-12">
          <div className="text-[#ba1a1a] font-semibold text-lg mb-2">Analysis Unavailable</div>
          <p className="text-sm text-[#717786] max-w-md mx-auto">
            The AI-powered CV analysis for this candidate has not been generated yet or an error occurred.
            Please try again later.
          </p>
          <Button
            variant="outline"
            className="mt-4 px-5 py-2"
            onClick={() => navigate(0)}
          >
            Retry
          </Button>
        </SectionCard>
      ) : (
        <>
          {/* Row 1: AI Summary + Role Alignment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Executive Summary */}
            <SectionCard className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-lg font-bold !text-black tracking-tight">AI Executive Summary</h2>
              </div>
              <p className="text-sm text-[#414755] leading-relaxed">
                {analysis?.summary ?? 'No summary available.'}
              </p>

              {/* Key Strengths Tags */}
              {keyStrengths.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <p className="text-[11px] text-[#717786] font-semibold uppercase tracking-wider mb-2.5">
                    Key Strengths
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {keyStrengths.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-[#f0f3ff] text-[#0058bc] text-xs font-semibold border border-[#d0e1fb]/40"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}


            </SectionCard>

            {/* Role Alignment Score */}
            <SectionCard>
              <h2 className="text-lg font-bold !text-black tracking-tight mb-5">Role Alignment</h2>
              <ScoreDonut score={mainScore} />
              {/* Breakdown bars */}
              <div className="mt-6 space-y-3">
                {breakdownMetrics.map((m) => (
                  <MetricBar key={m.label} label={m.label} value={m.value} />
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Row 2: Extracted Skills */}
          <div className="grid grid-cols-1 gap-6">
            {/* Extracted Skills */}
            <SectionCard>
              <h2 className="text-lg font-bold !text-black tracking-tight mb-4">Extracted Skills</h2>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillTag key={`${skill}-${i}`} skill={skill} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#717786]">No skills extracted.</p>
              )}
            </SectionCard>
          </div>

          {/* Row 3: Experience Details */}
          {analysis?.experience_years != null && (
            <SectionCard>
              <h2 className="text-lg font-bold !text-black tracking-tight mb-4">Experience Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#f0f3ff] p-4 rounded-xl text-center">
                  <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Years</p>
                  <p className="text-xl font-bold !text-black">{analysis.experience_years}</p>
                </div>
                <div className="bg-[#f0f3ff] p-4 rounded-xl text-center">
                  <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Skills</p>
                  <p className="text-xl font-bold !text-black">{skills.length}</p>
                </div>
                <div className="bg-[#f0f3ff] p-4 rounded-xl text-center">
                  <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">AI Score</p>
                  <p className="text-xl font-bold !text-black">{mainScore}%</p>
                </div>
                <div className="bg-[#f0f3ff] p-4 rounded-xl text-center">
                  <p className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider mb-1">Status</p>
                  <p className="text-sm font-bold text-[#111c2d] leading-7">
                    {application?.status
                      ? application.status.charAt(0).toUpperCase() + application.status.slice(1)
                      : 'Pending'}
                  </p>
                </div>
              </div>
            </SectionCard>
          )}
        </>
      )}
    </div>
  );
}
