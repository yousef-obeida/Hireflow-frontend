import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Job, ApiSuccessResponse } from '@/types';
import type { CreateJobPayload } from './createJob';

/* ── Payload type (matches backend UpdateJobRequest — all optional) ── */
export type UpdateJobPayload = Partial<CreateJobPayload>;

export interface UpdateJobRequest {
  id: number | string;
  data: UpdateJobPayload;
}

/**
 * PUT /api/jobs/:id
 *
 * Updates an existing job posting.
 * Payload shape matches the backend UpdateJobRequest validation (all fields optional).
 */
export const updateJob = async (id: number | string, data: UpdateJobPayload): Promise<Job> => {
  const response = await api.put<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.update(id), data);
  return response.data.data;
};
