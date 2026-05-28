import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Candidate, ApiSuccessResponse } from '@/types';

export interface GetCandidatesFilters {
  name?: string;
  email?: string;
  start_date?: string;
  end_date?: string;
  stage?: string;
  score?: string;
}

/**
 * Fetches all candidates from the backend with optional filters.
 */
export const getCandidates = async (filters?: GetCandidatesFilters): Promise<Candidate[]> => {
  const response = await api.get<ApiSuccessResponse<Candidate[]>>(ENDPOINTS.candidates.all, {
    params: filters,
  });
  return response.data.data;
};
