import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Candidate, CvAnalysis, ApiSuccessResponse } from "@/types";
import type { CandidateFilters } from "@/features/candidates/api/candidates.types";

/** GET /api/candidates */
export const fetchCandidates = async (filters?: CandidateFilters): Promise<Candidate[]> => {
  const response = await api.get<ApiSuccessResponse<Candidate[]>>(ENDPOINTS.candidates.all, {
    params: filters,
  });
  return response.data.data;
};

/** GET /api/candidates/:id */
export const fetchCandidate = async (id: number | string): Promise<Candidate> => {
  const response = await api.get<ApiSuccessResponse<Candidate>>(ENDPOINTS.candidates.details(id));
  return response.data.data;
};

/** GET /api/candidates/:id/analysis */
export const fetchCandidateAnalysis = async (id: number | string): Promise<CvAnalysis> => {
  const response = await api.get<CvAnalysis>(ENDPOINTS.candidates.analysis(id));
  return response.data;
};
