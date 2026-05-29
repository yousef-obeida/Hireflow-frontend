import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Job, ApiSuccessResponse } from '@/types';

/**
 * GET /api/jobs/:id
 *
 * Fetches a single job posting by its ID.
 */
export const getJob = async (id: number | string): Promise<Job> => {
  const response = await api.get<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.details(id));
  return response.data.data;
};
