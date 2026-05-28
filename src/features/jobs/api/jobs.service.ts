import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Job, ApiSuccessResponse } from "@/types";
import type { JobFilters } from "@/features/jobs/api/jobs.types";

/** GET /api/jobs */
export const fetchJobs = async (filters?: JobFilters): Promise<Job[]> => {
  const response = await api.get<ApiSuccessResponse<Job[]>>(ENDPOINTS.jobs.all, {
    params: filters,
  });
  return response.data.data;
};

/** GET /api/jobs/:id */
export const fetchJob = async (id: number | string): Promise<Job> => {
  const response = await api.get<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.details(id));
  return response.data.data;
};

/** POST /api/jobs */
export const createJob = async (data: CreateJobPayload): Promise<Job> => {
  const response = await api.post<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.create, data);
  return response.data.data;
};

/** PUT /api/jobs/:id */
export const updateJob = async (id: number | string, data: UpdateJobPayload): Promise<Job> => {
  const response = await api.put<ApiSuccessResponse<Job>>(ENDPOINTS.jobs.update(id), data);
  return response.data.data;
};

/** DELETE /api/jobs/:id */
export const deleteJob = async (id: number | string): Promise<void> => {
  await api.delete(ENDPOINTS.jobs.delete(id));
};

/* ── Payload types (match backend Form Requests) ───────────────────── */

export interface CreateJobPayload {
  title: string;
  description: string;
  requirments: string;           // backend typo preserved
  status: 'open' | 'closed';
  Location: 'onsite' | 'remote' | 'hybrid';  // backend expects capital L
  salary?: number | null;
}

export type UpdateJobPayload = Partial<CreateJobPayload>;
