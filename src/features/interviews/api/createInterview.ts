import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Interview, ApiSuccessResponse } from '@/types';

/* ── Payload type (matches backend StoreInterviewRequest rules) ─────── */
export interface CreateInterviewPayload {
  application_id: number;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:mm
  interviewer: string;
  type: string;
}

/**
 * POST /api/interviews
 *
 * Creates a new interview. The backend automatically:
 *  - Sets status to 'scheduled'
 *  - Sends an email invitation to the candidate
 *
 * Payload shape matches the backend StoreInterviewRequest validation.
 */
export const createInterview = async (data: CreateInterviewPayload): Promise<Interview> => {
  const response = await api.post<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.create, data);
  return response.data.data;
};
