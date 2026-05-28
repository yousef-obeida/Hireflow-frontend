import { useState, useEffect } from "react";

/**
 * Debounces a value by the given delay (ms).
 * Useful for search inputs — prevents firing an API call on every keystroke.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState("");
 * const debouncedSearch = useDebounce(search, 300);
 *
 * // Pass debouncedSearch to useFilters / React Query
 * const { data } = useJobs({ title: debouncedSearch });
 * ```
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
