import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { User, ApiSuccessResponse } from '@/types';

/* ── Filter params accepted by the backend ────────────────────────── */
export interface GetUsersFilters {
  name?: string;
  role?: 'admin' | 'hr';
}

/**
 * GET /api/users
 *
 * Fetches all users from the backend with optional filters.
 */
export const getUsers = async (filters?: GetUsersFilters): Promise<User[]> => {
  const response = await api.get<ApiSuccessResponse<User[]>>(ENDPOINTS.users.all, {
    params: filters,
  });
  return response.data.data;
};
