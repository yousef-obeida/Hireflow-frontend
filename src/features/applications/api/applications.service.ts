import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Application, ApiSuccessResponse } from "@/types";

/** GET /api/apply — form data with available open jobs */
export const fetchApplicationForm = async () => {
  const response = await api.get<ApiSuccessResponse<{
    available_jobs: { id: number; title: string }[];
    fields: Array<{
      name: string;
      type: string;
      label: string;
      required: boolean;
      options?: { id: number; title: string }[];
      accept?: string;
    }>;
  }>>(ENDPOINTS.Public.details);
  return response.data.data;
};

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
