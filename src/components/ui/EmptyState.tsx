import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  /** Heading text */
  title?: string;
  /** Description text */
  description?: string;
  /** Optional icon override */
  icon?: ReactNode;
  /** Optional action button (e.g., "Add Job") */
  action?: ReactNode;
}

/**
 * Reusable empty state for when a list or table has no data.
 * Matches the HireFlow design system with a calm, informative aesthetic.
 */
export const EmptyState = ({
  title = "No data found",
  description = "There are no items to display right now.",
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-[#e7eeff] flex items-center justify-center mb-4">
        {icon ?? <Inbox className="w-7 h-7 text-[#0058bc]" />}
      </div>
      <h3 className="text-base font-semibold text-[#111c2d] mb-1">{title}</h3>
      <p className="text-sm text-[#70778b] mb-4 max-w-xs">{description}</p>
      {action}
    </div>
  );
};
