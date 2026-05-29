import React from 'react';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import type { User } from '@/types';

interface DeleteUserDialogProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** The user to delete */
  user: User | null;
  /** Called when the user confirms deletion */
  onConfirm: () => void;
  /** Show loading state */
  loading?: boolean;
}

/**
 * Delete confirmation dialog for a specific user.
 * Uses the global ConfirmDialog component with danger variant.
 */
export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  onClose,
  user,
  onConfirm,
  loading = false,
}) => {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="Delete this user?"
      description={
        user
          ? `"${user.name}" will be permanently removed from the system. This action cannot be undone.`
          : 'This user will be permanently removed from the system.'
      }
      confirmLabel="Delete User"
      cancelLabel="Cancel"
      variant="danger"
      loading={loading}
      id="delete-user-dialog"
    />
  );
};
