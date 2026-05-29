import React from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import type { Job } from '@/types';

interface ArchiveJobDialogProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** The job to archive */
  job: Job | null;
  /** Called when the user confirms archival */
  onConfirm: () => void;
  /** Show loading state */
  loading?: boolean;
}

/**
 * Archive confirmation dialog for a specific job posting.
 * Uses the global ConfirmDialog component with danger variant.
 */
export const ArchiveJobDialog: React.FC<ArchiveJobDialogProps> = ({
  open,
  onClose,
  job,
  onConfirm,
  loading = false,
}) => {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Close this job?"
      description={
        job
          ? `"${job.title}" will be closed and moved to your closed listings. You can still view it later.`
          : 'This job will be closed and moved to your closed listings.'
      }
      confirmLabel="Close Job"
      cancelLabel="Keep Open"
      variant="danger"
      loading={loading}
      id="archive-job-dialog"
    />
  );
};
