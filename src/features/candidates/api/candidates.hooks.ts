import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import {
  fetchCandidates,
  fetchCandidate,
  fetchCandidateAnalysis,
} from "@/features/candidates/api/candidates.service";
import type { CandidateFilters } from "@/features/candidates/api/candidates.types";

/* ── Queries ───────────────────────────────────────────────────────── */

/**
 * GET /api/candidates — list with optional filters.
 * Backend: CandidateController@index with CandidateFilter.
 * Candidates are read-only on the admin side (created via public apply form).
 */
export function useCandidates(filters?: CandidateFilters) {
  return useQuery({
    queryKey: queryKeys.candidates.list(filters ?? {}),
    queryFn: () => fetchCandidates(filters),
  });
}

/** GET /api/candidates/:id */
export function useCandidate(id: number | string) {
  return useQuery({
    queryKey: queryKeys.candidates.detail(id),
    queryFn: () => fetchCandidate(id),
    enabled: !!id,
  });
}

/** GET /api/candidates/:id/analysis — AI-generated CV analysis */
export function useCandidateAnalysis(id: number | string) {
  return useQuery({
    queryKey: queryKeys.cv.analysis(id),
    queryFn: () => fetchCandidateAnalysis(id),
    enabled: !!id,
  });
}
