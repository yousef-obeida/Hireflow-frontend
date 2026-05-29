import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { ApiSuccessResponse, Job } from '@/types';

/**
 * PUT /api/jobs/:id
 *
 * "Archives" a job posting by setting its status to "closed".
 * This allows it to appear in the closed jobs filter instead of being hard-deleted.
 */
export const archiveJob = async (id: number | string): Promise<Job> => {
  const response = await api.put<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.update(id), { status: 'closed' });
  return response.data.data;
};
