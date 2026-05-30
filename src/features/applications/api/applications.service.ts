import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Application, ApiSuccessResponse } from "@/types";

/* ── Types ────────────────────────────────────────────────────────── */

export interface AvailableJob {
  id: number;
  title: string;
}

export interface ApplicationFormData {
  available_jobs: AvailableJob[];
  fields: Array<{
    name: string;
    type: string;
    label: string;
    required: boolean;
    options?: { id: number; title: string }[];
    accept?: string;
  }>;
}

/* ── Queries ──────────────────────────────────────────────────────── */

/** GET /api/apply — form data with available open jobs */
export const fetchApplicationForm = async (): Promise<ApplicationFormData> => {
  const response =
    await api.get<ApiSuccessResponse<ApplicationFormData>>(ENDPOINTS.Public.details);
  return response.data.data;
};

/**
 * GET /api/available-jobs — public list of open positions.
 * Backend: Job::where('status','open')->select('id','title')->get()
 * Returns: [{ id: 1, title: "Software Engineer" }, …]
 */
export const fetchAvailableJobs = async (): Promise<AvailableJob[]> => {
  const response = await api.get<ApiSuccessResponse<AvailableJob[]>>(
    ENDPOINTS.Public.all,
  );
  return response.data.data;
};

/* ── Mutations ────────────────────────────────────────────────────── */

/** POST /api/apply/:jobId — submit with multipart/form-data (CV upload) */
export const submitApplication = async (
  jobId: number | string,
  data: FormData,
): Promise<Application> => {
  const response = await api.post<ApiSuccessResponse<Application>>(
    ENDPOINTS.Public.create(jobId),
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data.data;
};
