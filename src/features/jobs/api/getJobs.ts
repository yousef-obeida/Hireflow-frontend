import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Job, ApiSuccessResponse } from '@/types';

/* ── Filter params accepted by the backend JobFilter class ────────── */
export interface GetJobsFilters {
  title?: string;
  status?: 'open' | 'closed';
  start_date?: string;
  end_date?: string;
}

/**
 * GET /api/jobs
 *
 * Fetches all job postings from the backend with optional filters.
 * Backend supports filtering by title (LIKE), status (exact), and date range.
 */
export const getJobs = async (filters?: GetJobsFilters): Promise<Job[]> => {
  const response = await api.get<ApiSuccessResponse<Job[]>>(ENDPOINTS.jobs.all, {
    params: filters,
  });
  return response.data.data;
};
