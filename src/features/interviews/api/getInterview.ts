import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Interview, ApiSuccessResponse } from '@/types';

/**
 * GET /api/interviews/:id
 *
 * Fetches a single interview by its ID.
 * Backend eager-loads the `application` relationship.
 */
export const getInterview = async (id: number | string): Promise<Interview> => {
  const response = await api.get<ApiSuccessResponse<Interview>>(ENDPOINTS.interviews.details(id));
  return response.data.data;
};
