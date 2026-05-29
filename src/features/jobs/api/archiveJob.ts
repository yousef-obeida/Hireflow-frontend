import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { ApiSuccessResponse, Job } from '@/types';

/**
 * DELETE /api/jobs/:id
 *
 * Deletes a job posting entirely.
 */
export const archiveJob = async (id: number | string): Promise<Job> => {
  const response = await api.delete<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.delete(id));
  return response.data.data;
};
