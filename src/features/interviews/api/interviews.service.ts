import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Interview, ApiSuccessResponse } from "@/types";
import type { InterviewFilters } from "@/features/interviews/api/interviews.types";

/** GET /api/interviews */
export const fetchInterviews = async (filters?: InterviewFilters): Promise<Interview[]> => {
  const response = await api.get<ApiSuccessResponse<Interview[]>>(ENDPOINTS.interviews.all, {
    params: filters,
  });
  return response.data.data;
};

/** GET /api/interviews/:id */
export const fetchInterview = async (id: number | string): Promise<Interview> => {
  const response = await api.get<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.details(id));
  return response.data.data;
};

/** POST /api/interviews */
export const createInterview = async (data: CreateInterviewPayload): Promise<Interview> => {
  const response = await api.post<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.create, data);
  return response.data.data;
};

/** PUT /api/interviews/:id */
export const updateInterview = async (id: number | string, data: UpdateInterviewPayload): Promise<Interview> => {
  const response = await api.put<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.schedule(id), data);
  return response.data.data;
};

/** DELETE /api/interviews/:id — marks as cancelled on backend */
export const cancelInterview = async (id: number | string): Promise<void> => {
  await api.delete(ENDPOINTS.interviews.details(id));
};

/* ── Payload types (match backend Form Requests) ───────────────────── */

export interface CreateInterviewPayload {
  application_id: number;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm
  interviewer: string;
  type: string;
}

export type UpdateInterviewPayload = Partial<Omit<CreateInterviewPayload, 'application_id'>>;
