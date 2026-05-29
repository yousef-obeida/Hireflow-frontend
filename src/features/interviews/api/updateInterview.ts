import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Interview, ApiSuccessResponse } from '@/types';

/* ── Payload type (matches backend UpdateInterviewRequest — all optional) ── */
export interface UpdateInterviewPayload {
  date?: string;
  time?: string;
  interviewer?: string;
  type?: string;
}

export interface UpdateInterviewRequest {
  id: number | string;
  data: UpdateInterviewPayload;
}

/**
 * PUT /api/interviews/:id
 *
 * Updates an existing interview.
 * Payload shape matches the backend UpdateInterviewRequest validation (all fields optional).
 */
export const updateInterview = async (id: number | string, data: UpdateInterviewPayload): Promise<Interview> => {
  const response = await api.put<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.schedule(id), data);
  return response.data.data;
};
