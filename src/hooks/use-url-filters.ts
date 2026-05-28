import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * URL-synced filter hook. Works exactly like `useFilters<T>` but
 * persists filter state in the URL search params, making views
 * bookmarkable and shareable.
 *
 * Falls back to `defaults` for any param not present in the URL.
 *
 * @example
 * ```tsx
 * const { filters, setFilter, resetFilters, activeFilterCount } = useUrlFilters<JobFilters>({
 *   title: "",
 *   status: undefined,
 * });
 *
 * // URL becomes: ?title=developer&status=open
 * // Pass `filters` directly to your React Query hook:
 * const { data } = useJobs(filters);
 * ```
 */
export function useUrlFilters<T extends Record<string, string | undefined>>(defaults: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  /** Current filters — merge URL params over defaults */
  const filters = useMemo(() => {
    const current = { ...defaults };
    for (const key of Object.keys(defaults)) {
      const urlValue = searchParams.get(key);
      if (urlValue !== null && urlValue !== "") {
        (current as Record<string, string | undefined>)[key] = urlValue;
      }
    }
    return current;
  }, [searchParams, defaults]);

  /** Set a single filter — updates the URL */
  const setFilter = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const strValue = value as string | undefined;
          if (strValue === undefined || strValue === null || strValue === "") {
            next.delete(key as string);
          } else {
            next.set(key as string, strValue);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  /** Reset all filters to defaults — clears relevant URL params */
  const resetFilters = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const key of Object.keys(defaults)) {
          next.delete(key);
        }
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams, defaults]);

  /** How many filters are actively set (non-empty) */
  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).filter(
      ([, v]) => v !== undefined && v !== null && v !== "" && v !== (defaults as Record<string, unknown>)[Object.keys(defaults).find((k) => (defaults as Record<string, unknown>)[k] === v) ?? ""],
    ).length;
  }, [filters, defaults]);

  /**
   * Cleaned params object with empty/undefined values removed.
   * Ready to pass as filter arg to React Query hooks.
   */
  const cleanParams = useMemo(() => {
    const cleaned: Record<string, string> = {};
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
    resetFilters,
    activeFilterCount,
  } as const;
}
