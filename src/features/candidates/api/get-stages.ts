import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Stage, ApiSuccessResponse } from '@/types';

/**
 * Fetches all pipeline stages from the backend.
 * GET /stages
 */
export const getStages = async (): Promise<Stage[]> => {
  const response = await api.get<ApiSuccessResponse<Stage[]>>(ENDPOINTS.stages.all);
  return response.data.data;
};
