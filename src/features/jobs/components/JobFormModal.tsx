import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { createJobSchema } from '../schemas/job.schema';
import type { CreateJobFormValues } from '../schemas/job.schema';
import type { Job } from '@/types';

interface JobFormModalProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** "create" for a new job, "edit" for updating an existing one */
  mode: 'create' | 'edit';
  /** The job to edit (only relevant when mode === 'edit') */
  job?: Job | null;
  /** Called with validated form data on submit */
  onSubmit: (data: CreateJobFormValues) => void;
  /** Show loading state on submit button */
  loading?: boolean;
}

/**
 * Create / Edit job form modal.
 *
 * Uses the createJobSchema (Zod) for validation and react-hook-form
 * for form state. Matches the screenshot layout with two-column
 * sections: JOB DETAILS (left) and SETTINGS (right).
 */
export const JobFormModal: React.FC<JobFormModalProps> = ({
  open,
  onClose,
  mode,
  job,
  onSubmit,
  loading = false,
}) => {

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobSchema) as unknown as Resolver<CreateJobFormValues>,
    defaultValues: {
      title: '',
      description: '',
      requirments: '',
      status: 'open',
      Location: 'onsite',
      salary: null,
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (open && mode === 'edit' && job) {
      reset({
        title: job.title,
        description: job.description,
        requirments: job.requirments,
        status: job.status,
        Location: job.location as CreateJobFormValues['Location'],
        salary: job.salary ?? null,
      });
    } else if (open && mode === 'create') {
      reset({
        title: '',
        description: '',
        requirments: '',
        status: 'open',
        Location: 'onsite',
        salary: null,
      });
    }
  }, [open, mode, job, reset]);
  const currentStatus = useWatch({
    control,
    name: 'status',
  });
  const isPublic = currentStatus === 'open';

  const isCreate = mode === 'create';
  const title = isCreate ? 'Create New Job' : 'Edit Job';
  const subtitle = isCreate
    ? 'Post a new opening to your talent network'
    : `Editing "${job?.title ?? 'Job'}"`;

  const handleFormSubmit = handleSubmit((data: CreateJobFormValues) => {
    onSubmit(data);
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="xl"
      id="job-form-modal"
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
            {isCreate ? 'Publish Job' : 'Save Changes'}
          </button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* ── Two-column layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {/* ── Left: JOB DETAILS ──────────────────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              Job Details
            </p>

            <Input
              id="job-title"
              label="Job Title"
              placeholder="e.g. Senior Product Designer"
              error={errors.title?.message}
              {...register('title')}
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                id="job-location"
                label="Location"
                error={errors.Location?.message}
                options={[
                  { value: 'onsite', label: 'Onsite' },
                  { value: 'remote', label: 'Remote' },
                  { value: 'hybrid', label: 'Hybrid' },
                ]}
                {...register('Location')}
              />
              <Select
                id="job-status"
                label="Status"
                error={errors.status?.message}
                options={[
                  { value: 'open', label: 'Open' },
                  { value: 'closed', label: 'Closed' },
                ]}
                {...register('status')}
              />
            </div>

            <Input
              id="job-salary"
              label="Salary (Annual)"
              placeholder="e.g. 85000"
              type="number"
              error={errors.salary?.message}
              {...register('salary')}
            />
          </div>

          {/* ── Right: DESCRIPTION + SETTINGS ──────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              Description &amp; Requirements
            </p>

            <Textarea
              id="job-description"
              label="Job Description"
              placeholder="Describe the role, responsibilities, and what makes it exciting..."
              rows={3}
              error={errors.description?.message}
              {...register('description')}
            />

            <Textarea
              id="job-requirements"
              label="Requirements"
              placeholder="List required skills, experience, and qualifications..."
              rows={3}
              error={errors.requirments?.message}
              {...register('requirments')}
            />

            {/* Settings section */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase mb-4">
                Settings
              </p>
              <div className="bg-[#f9f9ff] border border-[#e2e8f0] rounded-xl px-4 py-3.5">
                <Toggle
                  id="job-public-toggle"
                  checked={isPublic}
                  onChange={(checked) => setValue('status', checked ? 'open' : 'closed', { shouldValidate: true })}
                  label="Public Visibility"
                  description="Show this job on your public career page"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
