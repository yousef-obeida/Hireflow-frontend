interface LoadingSpinnerProps {
  /** Text shown below the spinner. Defaults to "Loading…" */
  label?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** If true, takes full viewport height. Default: false */
  fullPage?: boolean;
}

const sizeMap = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

/**
 * Reusable loading spinner with optional label.
 * Used as default loading state for React Query pages.
 */
export const LoadingSpinner = ({
  label = "Loading…",
  size = "md",
  fullPage = false,
}: LoadingSpinnerProps) => {
  const containerClass = fullPage
    ? "min-h-screen flex items-center justify-center bg-[#f9f9ff]"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-3">
        <div
          className={`${sizeMap[size]} border-[#0058bc] border-t-transparent rounded-full animate-spin`}
        />
        {label && (
          <span className="text-sm text-[#414755] font-medium">{label}</span>
        )}
      </div>
    </div>
  );
};
