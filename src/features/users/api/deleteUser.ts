import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { ApiSuccessResponse, User } from '@/types';

/**
 * DELETE /api/users/:id
 *
 * Deletes a user entirely.
 */
export const deleteUser = async (id: number | string): Promise<User> => {
  const response = await api.delete<ApiSuccessResponse<User>>(ENDPOINTS.users.delete(id));
  return response.data.data;
};
