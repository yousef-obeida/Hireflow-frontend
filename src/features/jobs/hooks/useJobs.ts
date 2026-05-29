import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getJobs } from '../api/getJobs';
import type { GetJobsFilters } from '../api/getJobs';
import type { Job } from '@/types';

/**
 * Hook to manage job listings with filtering, search, pagination,
 * and sorting — all synced with the browser's URL query parameters.
 *
 * Follows the same architecture as useCandidates.
 */
export function useJobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Parse Query Parameters ──────────────────────────────────────
  const title = searchParams.get('title') || searchParams.get('search') || undefined;
  const status = (searchParams.get('status') as GetJobsFilters['status']) || undefined;
  const startDate = searchParams.get('start_date') || undefined;
  const endDate = searchParams.get('end_date') || undefined;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  const sortBy = searchParams.get('sort_by') || 'id';
  const sortOrder = (searchParams.get('sort_order') || 'desc') as 'asc' | 'desc';

  // ── Build filter payload ────────────────────────────────────────
  const apiFilters: GetJobsFilters = { title, status, start_date: startDate, end_date: endDate };

  // ── React Query ─────────────────────────────────────────────────
  const queryResult = useQuery({
    queryKey: queryKeys.jobs.list(apiFilters),
    queryFn: () => getJobs(apiFilters),
  });

  // ── Helper to update URL params ─────────────────────────────────
  const updateParams = useCallback(
    (newParams: Record<string, string | number | undefined | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);

          Object.entries(newParams).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });

          // Reset page to 1 when filters change
          const isFilterChange =
            'title' in newParams ||
            'search' in newParams ||
            'status' in newParams ||
            'start_date' in newParams ||
            'end_date' in newParams;

          if (isFilterChange && !('page' in newParams)) {
            next.set('page', '1');
          }

          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // ── Client-side sorting ─────────────────────────────────────────
  const sortedJobs = useMemo(() => {
    if (!queryResult.data) return [];

    return [...queryResult.data].sort((a, b) => {
      let valA = a[sortBy as keyof Job];
      let valB = b[sortBy as keyof Job];

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [queryResult.data, sortBy, sortOrder]);

  // ── Client-side pagination ──────────────────────────────────────
  const paginatedJobs = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sortedJobs.slice(startIndex, startIndex + perPage);
  }, [sortedJobs, page, perPage]);

  // ── Setter helpers ──────────────────────────────────────────────
  const setSearch = useCallback(
    (query: string) => updateParams({ search: query, title: query }),
    [updateParams],
  );

  const setFilters = useCallback(
    (filters: GetJobsFilters) => {
      updateParams({
        title: filters.title,
        search: filters.title,
        status: filters.status,
        start_date: filters.start_date,
        end_date: filters.end_date,
      });
    },
    [updateParams],
  );

  const setPage = useCallback(
    (pageNumber: number) => updateParams({ page: pageNumber }),
    [updateParams],
  );

  const setPerPage = useCallback(
    (count: number) => updateParams({ per_page: count, page: 1 }),
    [updateParams],
  );

  const setSorting = useCallback(
    (field: string, order?: 'asc' | 'desc') => {
      const finalOrder = order || (sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
      updateParams({ sort_by: field, sort_order: finalOrder });
    },
    [updateParams, sortBy, sortOrder],
  );

  const resetAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // ── Derived values ──────────────────────────────────────────────
  const totalCount = sortedJobs.length;
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    ...queryResult,
    data: paginatedJobs,
    allJobs: queryResult.data,
    totalCount,
    totalPages,
    currentPage: page,
    perPage,
    sortBy,
    sortOrder,
    filters: { title, status, start_date: startDate, end_date: endDate },
    setSearch,
    setFilters,
    setPage,
    setPerPage,
    setSorting,
    resetAll,
  };
}

export default useJobs;
