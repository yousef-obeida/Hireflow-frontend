import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Candidate, CvAnalysis, ApiSuccessResponse } from '@/types';

/**
 * Fetches details of a single candidate by ID.
 */
export const getCandidate = async (id: number | string): Promise<Candidate> => {
  const response = await api.get<ApiSuccessResponse<Candidate>>(ENDPOINTS.candidates.details(id));
  return response.data.data;
};

/**
 * Fetches the AI-generated CV analysis for a single candidate by ID.
 */
export const getCandidateAnalysis = async (id: number | string): Promise<CvAnalysis> => {
  const response = await api.get<ApiSuccessResponse<CvAnalysis>>(ENDPOINTS.candidates.analysis(id));
  return response.data.data;
};
