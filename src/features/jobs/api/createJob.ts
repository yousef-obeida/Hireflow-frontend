import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Job, ApiSuccessResponse } from '@/types';

/* ── Payload type (matches backend StoreJobRequest rules) ─────────── */
export interface CreateJobPayload {
  title: string;
  description: string;
  requirments: string;                            // backend typo preserved
  status: 'open' | 'closed';
  Location: 'onsite' | 'remote' | 'hybrid';      // backend expects capital L
  salary?: number | null;
}

/**
 * POST /api/jobs
 *
 * Creates a new job posting.
 * Payload shape matches the backend StoreJobRequest validation.
 */
export const createJob = async (data: CreateJobPayload): Promise<Job> => {
  const response = await api.post<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.create, data);
  return response.data.data;
};
