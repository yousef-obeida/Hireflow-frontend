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
  const response = await api.get<ApiSuccessResponse<any[]>>(ENDPOINTS.users.all, {
    params: filters,
  });
  
  // The backend might return 'user_id' instead of 'id', so we map it to ensure the frontend works.
  return response.data.data.map(user => ({
    ...user,
    id: user.id ?? user.user_id,
  })) as User[];
};
