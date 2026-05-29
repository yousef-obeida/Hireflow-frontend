import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  /** Controls visibility */
  open: boolean;
  /** Called when dismissed (cancel / backdrop / Escape) */
  onClose: () => void;
  /** Called when the user confirms the action */
  onConfirm: () => void;
  /** Dialog title */
  title: string;
  /** Description / warning body text */
  description: string;
  /** Text for the confirm button. Defaults to "Confirm" */
  confirmLabel?: string;
  /** Text for the cancel button. Defaults to "Cancel" */
  cancelLabel?: string;
  /** Visual variant — "danger" uses red styling, "info" uses blue */
  variant?: 'danger' | 'info';
  /** Show a loading spinner on the confirm button */
  loading?: boolean;
  /** Unique id */
  id?: string;
}

/**
 * Reusable confirmation dialog built on top of the Modal component.
 * Use for destructive actions (archive, delete) or confirmations.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
  id,
}) => {
  const isDanger = variant === 'danger';

  return (
    <Modal open={open} onClose={onClose} title="" size="sm" id={id}>
      <div className="flex flex-col items-center text-center py-2">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 mt-[-16px] ${
            isDanger ? 'bg-[#ffdad6]' : 'bg-[#e7eeff]'
          }`}
        >
          <AlertTriangle
            className={`w-7 h-7 ${isDanger ? 'text-[#ba1a1a]' : 'text-[#0058bc]'}`}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#111c2d] mb-1.5" style={{ margin: '0 0 6px 0' }}>
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#717786] max-w-sm leading-relaxed mb-6">{description}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 w-full justify-center">
          <Button
            variant="outline"
            className="px-5 py-2.5 text-sm min-w-[100px]"
            onClick={onClose}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-colors min-w-[100px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
              isDanger
                ? 'bg-[#ba1a1a] text-white hover:bg-[#a01616]'
                : 'bg-[#0058bc] text-white hover:bg-[#0070eb]'
            }`}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
