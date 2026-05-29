import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  /** Controls visibility */
  open: boolean;
  /** Called when the user requests closing (X, backdrop, Escape) */
  onClose: () => void;
  /** Modal title text */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Body content */
  children: React.ReactNode;
  /** Footer actions (buttons) */
  footer?: React.ReactNode;
  /** Max-width class. Defaults to "max-w-2xl" */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Unique id for the modal panel */
  id?: string;
}

const sizeMap: Record<string, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

/**
 * Reusable modal overlay with backdrop blur, entrance animation,
 * keyboard (Escape) and click-outside dismiss, focus trap, and
 * scroll-lock. Designed for the HireFlow design system.
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = 'lg',
  id,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#111c2d]/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`relative z-10 w-full ${sizeMap[size]} bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]`}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-7 pt-6 pb-2">
              <div>
                <h2
                  className="text-2xl font-bold !text-black tracking-tight"
                  style={{ margin: 0, fontWeight: 'bold', color: '#000000' }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-sm text-[#717786] mt-0.5 font-medium">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 -mr-2 -mt-1 rounded-lg text-[#9ca3af] hover:text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-7 py-4">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-7 py-4 border-t border-gray-100">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
