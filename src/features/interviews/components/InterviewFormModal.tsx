import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/button';
import { createInterviewSchema } from '../schemas/interview.schema';
import type { CreateInterviewFormValues } from '../schemas/interview.schema';
import type { Interview } from '@/types';


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
