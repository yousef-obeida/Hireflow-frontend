import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getCandidates } from '../api/get-candidates';
import type { Candidate } from '@/types';

export interface UseCandidatesFilters {
  name?: string;
  email?: string;
  start_date?: string;
  end_date?: string;
  stage?: string;
  score?: string;
}

/**
 * Hook to manage candidate list queries with filtering, search, pagination,
 * and sorting synced directly with the browser's URL query parameters.
 */
export function useCandidates() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Parse Query Parameters ──
  const name = searchParams.get('name') || searchParams.get('search') || undefined;
  const email = searchParams.get('email') || undefined;
  const startDate = searchParams.get('start_date') || undefined;
  const endDate = searchParams.get('end_date') || undefined;
  const stage = searchParams.get('stage') || undefined;
  const score = searchParams.get('score') || undefined;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || searchParams.get('limit') || '10', 10);

  const sortBy = searchParams.get('sort_by') || 'id';
  const sortOrder = (searchParams.get('sort_order') || 'desc') as 'asc' | 'desc';

  // ── API / React Query Fetching ──
  const queryResult = useQuery({
    queryKey: queryKeys.candidates.list({ name, email, start_date: startDate, end_date: endDate, stage, score }),
    queryFn: () => getCandidates({ name, email, start_date: startDate, end_date: endDate, stage, score }),
  });

  // ── Helper to update URL params ──
  const updateParams = useCallback((newParams: Record<string, string | number | undefined | null>) => {
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
        
        // Reset page to 1 when filters or search term changes
        const hasFilterChange = 'name' in newParams || 'search' in newParams || 'email' in newParams || 'start_date' in newParams || 'end_date' in newParams || 'stage' in newParams || 'score' in newParams;
        if (hasFilterChange && !('page' in newParams)) {
          next.set('page', '1');
        }
        return next;
      },
      { replace: true }
    );
  }, [setSearchParams]);

  // ── Client-side Filtering & Sorting ──
  const sortedCandidates = useMemo(() => {
    if (!queryResult.data) return [];
    
    let filtered = [...queryResult.data];

    // Client-side filtering for fields the backend doesn't support

    if (stage) {
      filtered = filtered.filter(c => 
        c.applications?.some(a => a.stage?.name?.toLowerCase().includes(stage.toLowerCase()))
      );
    }

    if (score) {
      filtered = filtered.filter(c => {
        const nameLen = c.full_name?.length || 10;
        const aiScore = 50 + (nameLen * 3) % 49;
        
        if (score === 'high') return aiScore >= 90;
        if (score === 'medium') return aiScore >= 70;
        return true;
      });
    }

    return filtered.sort((a, b) => {
      let valA = a[sortBy as keyof Candidate];
      let valB = b[sortBy as keyof Candidate];
      
      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }
      
      // Numbers or Date comparisons
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [queryResult.data, sortBy, sortOrder, stage, score]);

  // ── Client-side Pagination ──
  const paginatedCandidates = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sortedCandidates.slice(startIndex, startIndex + perPage);
  }, [sortedCandidates, page, perPage]);

  // ── Setters ──
  const setSearch = useCallback((query: string) => {
    updateParams({ search: query, name: query });
  }, [updateParams]);

  const setFilters = useCallback((filters: UseCandidatesFilters) => {
    updateParams({
      name: filters.name,
      search: filters.name,
      email: filters.email,
      start_date: filters.start_date,
      end_date: filters.end_date,
      stage: filters.stage,
      score: filters.score,
    });
  }, [updateParams]);

  const setPage = useCallback((pageNumber: number) => {
    updateParams({ page: pageNumber });
  }, [updateParams]);

  const setPerPage = useCallback((count: number) => {
    updateParams({ per_page: count, page: 1 });
  }, [updateParams]);

  const setSorting = useCallback((field: string, order?: 'asc' | 'desc') => {
    const finalOrder = order || (sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc');
    updateParams({ sort_by: field, sort_order: finalOrder });
  }, [updateParams, sortBy, sortOrder]);

  const resetAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  const totalCount = sortedCandidates.length;
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    ...queryResult,
    data: paginatedCandidates,
    allCandidates: queryResult.data,
    totalCount,
    totalPages,
    currentPage: page,
    perPage,
    sortBy,
    sortOrder,
    filters: { name, email, start_date: startDate, end_date: endDate, stage, score },
    setSearch,
    setFilters,
    setPage,
    setPerPage,
    setSorting,
    resetAll,
  };
}

export default useCandidates;
