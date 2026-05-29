import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { createInterviewSchema } from '../schemas/interview.schema';
import type { CreateInterviewFormValues } from '../schemas/interview.schema';
import type { Interview } from '@/types';
import { getCandidates } from '@/features/candidates/api/get-candidates';
import { queryKeys } from '@/api/query-keys';
import { User, Briefcase, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface InterviewFormModalProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** "create" for a new interview, "edit" for updating an existing one */
  mode: 'create' | 'edit';
  /** The interview to edit (only relevant when mode === 'edit') */
  interview?: Interview | null;
  /** Called with validated form data on submit */
  onSubmit: (data: CreateInterviewFormValues) => void;
  /** Show loading state on submit button */
  loading?: boolean;
}

/**
 * Create / Edit interview form modal.
 *
 * Uses the createInterviewSchema (Zod) for validation and react-hook-form
 * for form state. Matches the JobFormModal layout with two-column
 * sections: INTERVIEW DETAILS (left) and SCHEDULING (right).
 *
 * When creating an interview, entering an application ID will look up the
 * candidate name and job title to display below the input field.
 */
export const InterviewFormModal: React.FC<InterviewFormModalProps> = ({
  open,
  onClose,
  mode,
  interview,
  onSubmit,
  loading = false,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateInterviewFormValues>({
    resolver: zodResolver(createInterviewSchema) as unknown as Resolver<CreateInterviewFormValues>,
    defaultValues: {
      application_id: 0,
      date: '',
      time: '',
      interviewer: '',
      type: '',
    },
  });

  // Watch the application_id field to look up candidate info
  const watchedApplicationId = watch('application_id');

  // Fetch candidates (with their applications) when the modal is open
  const { data: candidates, isLoading: isCandidatesLoading } = useQuery({
    queryKey: queryKeys.candidates.lists(),
    queryFn: () => getCandidates(),
    enabled: open, // Only fetch when modal is open
    staleTime: 30_000, // Cache for 30 seconds to avoid refetches
  });

  // Look up candidate info from the application_id
  const applicationLookup = useMemo(() => {
    const appId = Number(watchedApplicationId);
    if (!appId || !candidates?.length) return null;

    for (const candidate of candidates) {
      const matchingApp = candidate.applications?.find((app) => app.id === appId);
      if (matchingApp) {
        return {
          candidateName: candidate.full_name,
          candidateEmail: candidate.email,
          jobTitle: matchingApp.job?.title ?? null,
          status: matchingApp.status,
        };
      }
    }

    return undefined; // Means no match found (vs null = no input yet)
  }, [watchedApplicationId, candidates]);

  // Populate form when editing
  useEffect(() => {
    if (open && mode === 'edit' && interview) {
      reset({
        application_id: interview.application_id,
        date: interview.date,
        time: interview.time,
        interviewer: interview.interviewer,
        type: interview.type,
      });
    } else if (open && mode === 'create') {
      reset({
        application_id: 0,
        date: '',
        time: '',
        interviewer: '',
        type: '',
      });
    }
  }, [open, mode, interview, reset]);

  const isCreate = mode === 'create';
  const title = isCreate ? 'Schedule Interview' : 'Edit Interview';
  const subtitle = isCreate
    ? 'Schedule a new candidate interview session'
    : `Editing interview #${interview?.id ?? ''}`;

  const handleFormSubmit = handleSubmit((data: CreateInterviewFormValues) => {
    onSubmit(data);
  });

  // Render the candidate lookup result card
  const renderCandidateLookup = () => {
    const appId = Number(watchedApplicationId);

    // Don't show anything if no application ID entered
    if (!appId || appId <= 0) return null;

    // Loading candidates
    if (isCandidatesLoading) {
      return (
        <div className="flex items-center gap-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 animate-pulse">
          <Loader2 className="w-4 h-4 text-[#717786] animate-spin" />
          <span className="text-sm text-[#717786]">Looking up candidate…</span>
        </div>
      );
    }

    // Found a match
    if (applicationLookup) {
      return (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-4 py-3 space-y-1.5">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#15803d]" />
            <span className="text-xs font-semibold text-[#15803d] uppercase tracking-wide">
              Candidate Found
            </span>
          </div>
          <div className="flex items-center gap-2.5 mt-1">
            <div className="w-8 h-8 rounded-full bg-[#e7eeff] flex items-center justify-center">
              <User className="w-4 h-4 text-[#0058bc]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111c2d]">
                {applicationLookup.candidateName}
              </p>
              <p className="text-[11px] text-[#717786]">
                {applicationLookup.candidateEmail}
              </p>
            </div>
          </div>
          {applicationLookup.jobTitle && (
            <div className="flex items-center gap-2 mt-1 pt-1.5 border-t border-[#bbf7d0]/50">
              <Briefcase className="w-3.5 h-3.5 text-[#717786]" />
              <span className="text-xs text-[#414755]">
                Applied for: <span className="font-medium">{applicationLookup.jobTitle}</span>
              </span>
            </div>
          )}
        </div>
      );
    }

    // No match found (applicationLookup === undefined)
    if (applicationLookup === undefined) {
      return (
        <div className="flex items-center gap-2.5 bg-[#fef2f2] border border-[#fecaca] rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 text-[#dc2626]" />
          <span className="text-sm text-[#dc2626]">
            No application found with ID <span className="font-semibold">{appId}</span>
          </span>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="xl"
      id="interview-form-modal"
      footer={
        <>
          <Button
            variant="ghost"
            className="px-5 py-2.5 text-sm"
            onClick={onClose}
            disabled={loading}
          >
            Discard
          </Button>
          <button
            onClick={handleFormSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#0058bc] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0070eb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {isCreate ? 'Schedule Interview' : 'Save Changes'}
          </button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* ── Two-column layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {/* ── Left: INTERVIEW DETAILS ──────────────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              Interview Details
            </p>

            <Input
              id="interview-application-id"
              label="Application ID"
              placeholder="e.g. 42"
              type="number"
              error={errors.application_id?.message}
              {...register('application_id')}
              disabled={mode === 'edit'}
            />

            {/* Candidate name lookup card */}
            {renderCandidateLookup()}

            <Select
              id="interview-type"
              label="Interview Type"
              error={errors.type?.message}
              options={[
                { value: '', label: 'Select type...' },
                { value: 'Technical', label: 'Technical' },
                { value: 'HR', label: 'HR' },
                { value: 'Cultural', label: 'Cultural Fit' },
                { value: 'Panel', label: 'Panel' },
                { value: 'Phone Screen', label: 'Phone Screen' },
                { value: 'Final', label: 'Final Round' },
              ]}
              {...register('type')}
            />

            <Input
              id="interview-interviewer"
              label="Interviewer"
              placeholder="e.g. John Smith"
              error={errors.interviewer?.message}
              {...register('interviewer')}
            />


          </div>

          {/* ── Right: SCHEDULING ──────────────────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              Scheduling
            </p>

            <Input
              id="interview-date"
              label="Interview Date"
              type="date"
              error={errors.date?.message}
              {...register('date')}
            />

            <Input
              id="interview-time"
              label="Interview Time"
              type="time"
              error={errors.time?.message}
              {...register('time')}
            />

            {/* Info card */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase mb-4">
                Notification
              </p>
              <div className="bg-[#f9f9ff] border border-[#e2e8f0] rounded-xl px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e7eeff] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#0058bc]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#111c2d]">Email Invitation</p>
                    <p className="text-xs text-[#717786] mt-0.5">
                      An email invitation will be automatically sent to the candidate upon scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
