import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Interview, ApiSuccessResponse } from '@/types';

/* ── Filter params accepted by the backend InterviewFilter class ───── */
export interface GetInterviewsFilters {
  interviewer?: string;
  start_date?: string;  // YYYY-MM-DD — backend: whereDate('date', '>=', ...)
  end_date?: string;    // YYYY-MM-DD — backend: whereDate('date', '<=', ...)
}

/**
 * GET /api/interviews
 *
 * Fetches all interviews from the backend with optional filters.
 * Backend supports filtering by status (exact), interviewer (LIKE),
 * and date range (start_date / end_date).
 *
 * The backend eager-loads the `application` relationship.
 */
export const getInterviews = async (filters?: GetInterviewsFilters): Promise<Interview[]> => {
  const response = await api.get<ApiSuccessResponse<Interview[]>>(ENDPOINTS.interviews.all, {
    params: filters,
  });
  return response.data.data;
};
