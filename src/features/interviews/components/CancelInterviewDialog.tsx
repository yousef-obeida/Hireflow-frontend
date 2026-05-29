import React from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import type { Interview } from '@/types';

interface CancelInterviewDialogProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** The interview to cancel */
  interview: Interview | null;
  /** Called when the user confirms cancellation */
  onConfirm: () => void;
  /** Show loading state */
  loading?: boolean;
}

/**
 * Cancel confirmation dialog for a specific interview.
 * Uses the global ConfirmDialog component with danger variant.
 */
export const CancelInterviewDialog: React.FC<CancelInterviewDialogProps> = ({
  open,
  onClose,
  interview,
  onConfirm,
  loading = false,
}) => {
  const candidateName = interview?.application?.candidate?.full_name ?? 'this candidate';

  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete this interview?"
      description={
        interview
          ? `The interview with ${candidateName} on ${interview.date} will be permanently deleted.`
          : 'This interview will be permanently deleted.'
      }
      confirmLabel="Delete Interview"
      cancelLabel="Keep Scheduled"
      variant="danger"
      loading={loading}
      id="cancel-interview-dialog"
    />
  );
};
