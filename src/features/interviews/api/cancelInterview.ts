import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Interview, ApiSuccessResponse } from '@/types';

/**
 * DELETE /api/interviews/:id
 *
 * Cancels an interview (backend marks status as 'cancelled', keeps the record).
 */
export const cancelInterview = async (id: number | string): Promise<Interview> => {
  const response = await api.delete<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.details(id));
  return response.data.data;
};
