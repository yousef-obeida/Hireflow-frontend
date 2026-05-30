import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getInterviews } from '../api/getInterviews';
import type { GetInterviewsFilters } from '../api/getInterviews';
import { getCandidates } from '@/features/candidates/api/get-candidates';
import type { Interview, Application, Candidate } from '@/types';

/**
 * Hook to manage interview listings with filtering, search, pagination,
 * and sorting — all synced with the browser's URL query parameters.
 *
 * Follows the same architecture as useJobs.
 *
 * Because the backend's GET /interviews does not always include the nested
 * application.candidate / application.job relations, this hook also fetches
 * candidates (who carry their applications array) and merges the candidate
 * and job data into each interview so the table can display real names.
 *
 * Filters are sent directly to the backend (InterviewFilter class supports:
 *   - status: exact match
 *   - interviewer: LIKE match
 *   - start_date: whereDate('date', '>=', ...)
 *   - end_date: whereDate('date', '<=', ...)
 * )
 *
 * Search is handled client-side against candidate name, job title,
 * interviewer, and type fields.
 */
export function useInterviewsList() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Parse Query Parameters ──────────────────────────────────────
  const interviewer = searchParams.get('interviewer') || undefined;
  const startDate = searchParams.get('start_date') || undefined;
  const endDate = searchParams.get('end_date') || undefined;
  const search = searchParams.get('search') || undefined;

  const page = parseInt(searchParams.get('page') || '1', 10);
  const perPage = parseInt(searchParams.get('per_page') || '10', 10);

  const sortBy = searchParams.get('sort_by') || 'date';
  const sortOrder = (searchParams.get('sort_order') || 'desc') as 'asc' | 'desc';


  // ── Build filter payload sent to the backend ────────────────────
  const apiFilters: GetInterviewsFilters = useMemo(() => {
    const filters: GetInterviewsFilters = {};
    if (interviewer) filters.interviewer = interviewer;
    if (startDate) filters.start_date = startDate;
    if (endDate) filters.end_date = endDate;
    return filters;
  }, [interviewer, startDate, endDate]);

  // ── React Query — interviews from backend
  const queryResult = useQuery({
    queryKey: queryKeys.interviews.list(apiFilters),
    queryFn: () => getInterviews(apiFilters),
  });

  // ── React Query — candidates (to enrich interviews with candidate names)
  const { data: candidates } = useQuery({
    queryKey: queryKeys.candidates.lists(),
    queryFn: () => getCandidates(),
    staleTime: 60_000, // Cache for 1 minute
  });

  // ── Build a lookup map: application_id → { candidate, application }
  const appLookupMap = useMemo(() => {
    const map = new Map<number, { candidate: Candidate; application: Application }>();
    if (!candidates?.length) return map;

    for (const candidate of candidates) {
      if (!candidate.applications?.length) continue;
      for (const app of candidate.applications) {
        map.set(Number(app.id), { candidate, application: app });
      }
    }
    return map;
  }, [candidates]);

  // ── Enrich interviews with candidate/job data from the lookup map
  const enrichedInterviews = useMemo(() => {
    if (!queryResult.data) return [];

    return queryResult.data.map((interview): Interview => {
      // If the backend already provided candidate data, keep it
      if (interview.application?.candidate?.full_name) return interview;

      const lookup = appLookupMap.get(Number(interview.application_id));
      if (!lookup) return interview;

      return {
        ...interview,
        application: {
          ...(interview.application ?? lookup.application),
          candidate: lookup.candidate,
          job: lookup.application.job ?? interview.application?.job,
        },
      };
    });
  }, [queryResult.data, appLookupMap]);

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
            'search' in newParams ||
            'interviewer' in newParams ||
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

  // ── Client-side search filtering (across nested relations) ──────
  const searchFiltered = useMemo(() => {
    if (!enrichedInterviews.length) return [];
    if (!search) return enrichedInterviews;

    const lower = search.toLowerCase();
    return enrichedInterviews.filter((interview: Interview) => {
      const candidateName = interview.application?.candidate?.full_name ?? '';
      const jobTitle = interview.application?.job?.title ?? '';
      const interviewerName = interview.interviewer ?? '';
      const type = interview.type ?? '';

      return (
        candidateName.toLowerCase().includes(lower) ||
        jobTitle.toLowerCase().includes(lower) ||
        interviewerName.toLowerCase().includes(lower) ||
        type.toLowerCase().includes(lower)
      );
    });
  }, [enrichedInterviews, search]);

  // ── Client-side sorting ─────────────────────────────────────────
  const sortedInterviews = useMemo(() => {
    return [...searchFiltered].sort((a, b) => {
      let valA = a[sortBy as keyof Interview];
      let valB = b[sortBy as keyof Interview];

      if (valA === undefined || valA === null) valA = '';
      if (valB === undefined || valB === null) valB = '';

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchFiltered, sortBy, sortOrder]);

  // ── Client-side pagination ──────────────────────────────────────
  const paginatedInterviews = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return sortedInterviews.slice(startIndex, startIndex + perPage);
  }, [sortedInterviews, page, perPage]);

  // ── Setter helpers ──────────────────────────────────────────────
  const setSearch = useCallback(
    (query: string) => updateParams({ search: query }),
    [updateParams],
  );

  const setFilters = useCallback(
    (filters: GetInterviewsFilters) => {
      updateParams({
        interviewer: filters.interviewer,
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

  const resetAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // ── Derived values ──────────────────────────────────────────────
  const totalCount = sortedInterviews.length;
  const totalPages = Math.ceil(totalCount / perPage);

  return {
    ...queryResult,
    data: paginatedInterviews,
    allInterviews: enrichedInterviews,
    totalCount,
    totalPages,
    currentPage: page,
    perPage,
    sortBy,
    sortOrder,
    filters: { interviewer, start_date: startDate, end_date: endDate } as GetInterviewsFilters,
    search: search ?? '',
    setSearch,
    setFilters,
    setPage,
    resetAll,
  };
}

export default useInterviewsList;
