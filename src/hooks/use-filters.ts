import { useState, useCallback, useMemo } from "react";

/**
 * Generic filter hook that mirrors the backend Filter classes.
 *
 * Each backend filter (JobFilter, CandidateFilter, etc.) accepts
 * query params like `?title=...&status=...&start_date=...&end_date=...`.
 *
 * This hook manages that state on the frontend and produces a
 * clean params object (empty values stripped) ready to pass to
 * React Query / service functions.
 *
 * @example
 * ```tsx
 * const { filters, setFilter, resetFilters, activeFilterCount } = useFilters<JobFilters>({
 *   title: "",
 *   status: undefined,
 * });
 *
 * // Pass `filters` directly to your service / useQuery:
 * const { data } = useQuery({
 *   queryKey: queryKeys.jobs.list(filters),
 *   queryFn: () => fetchJobs(filters),
 * });
 * ```
 */
export function useFilters<T extends Record<string, unknown>>(defaults: T) {
  const [filters, setFilters] = useState<T>(defaults);

  /** Set a single filter field */
  const setFilter = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  /** Reset all filters to defaults */
  const resetFilters = useCallback(() => {
    setFilters(defaults);
  }, [defaults]);

  /** How many filters are actively set (non-empty) */
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== undefined && v !== null && v !== "").length;
  }, [filters]);

  /**
   * Cleaned params object with empty/undefined values removed.
   * Ready to pass as `params` to axios.
   */
  const cleanParams = useMemo(() => {
    const cleaned: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== "") {
        cleaned[key] = value;
      }
    }
    return cleaned as Partial<T>;
  }, [filters]);

  return {
    filters,
    cleanParams,
    setFilter,
    setFilters,
    resetFilters,
    activeFilterCount,
  } as const;
}
