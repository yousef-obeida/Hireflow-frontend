import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getUsers } from '../api/getUsers';
import type { GetUsersFilters } from '../api/getUsers';
import type { User } from '@/types';

/**
 * Hook to manage user listings with filtering, search, pagination,
 * and sorting — all synced with the browser's URL query parameters.
 *
 * Follows the same architecture as useJobs.
 */
export function useUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Parse Query Parameters ──────────────────────────────────────
  const name = searchParams.get('name') || searchParams.get('search') || undefined;
  const role = (searchParams.get('role') as GetUsersFilters['role']) || undefined;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  const sortBy = searchParams.get('sort_by') || 'id';
  const sortOrder = (searchParams.get('sort_order') || 'desc') as 'asc' | 'desc';

  // ── Build filter payload ────────────────────────────────────────
  const apiFilters: GetUsersFilters = { name, role };

  // ── React Query ─────────────────────────────────────────────────
  const queryResult = useQuery({
    queryKey: queryKeys.users.list(apiFilters),
    queryFn: () => getUsers(apiFilters),
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
            'name' in newParams ||
            'search' in newParams ||
            'role' in newParams;

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
  const sortedUsers = useMemo(() => {
    if (!queryResult.data) return [];

    return [...queryResult.data].sort((a, b) => {
      let valA = a[sortBy as keyof User];
      let valB = b[sortBy as keyof User];

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
  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sortedUsers.slice(startIndex, startIndex + perPage);
  }, [sortedUsers, page, perPage]);

  // ── Setter helpers ──────────────────────────────────────────────
  const setSearch = useCallback(
    (query: string) => updateParams({ search: query, name: query }),
    [updateParams],
  );

  const setFilters = useCallback(
    (filters: GetUsersFilters) => {
      updateParams({
        name: filters.name,
        search: filters.name,
        role: filters.role,
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
  const totalCount = sortedUsers.length;
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    ...queryResult,
    data: paginatedUsers,
    allUsers: queryResult.data,
    totalCount,
    totalPages,
    currentPage: page,
    perPage,
    sortBy,
    sortOrder,
    filters: { name, role },
    setSearch,
    setFilters,
    setPage,
    setPerPage,
    setSorting,
    resetAll,
  };
}

export default useUsers;
