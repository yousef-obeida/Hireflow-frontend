import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getCandidate, getCandidateAnalysis } from '../api/get-candidate';

/**
 * Hook to retrieve a single candidate's details by ID.
 */
export function useCandidate(id: number | string) {
  return useQuery({
    queryKey: queryKeys.candidates.detail(id),
    queryFn: () => getCandidate(id),
    enabled: !!id,
  });
}

/**
 * Hook to retrieve AI-generated CV analysis for a candidate by ID.
 */
export function useCandidateAnalysis(id: number | string) {
  return useQuery({
    queryKey: queryKeys.cv.analysis(id),
    queryFn: () => getCandidateAnalysis(id),
    enabled: !!id,
  });
}

export default useCandidate;
