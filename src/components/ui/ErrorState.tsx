import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Retry handler — shows a retry button if provided */
  onRetry?: () => void;
}

/**
 * Reusable inline error state for pages/sections.
 * Use when a React Query request fails.
 */
export const ErrorState = ({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-[#ffdad6] flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6 text-[#ba1a1a]" />
      </div>
      <p className="text-sm text-[#414755] mb-4 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#0058bc] bg-[#e7eeff] rounded-xl hover:bg-[#d4e0ff] transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  );
};
