import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { User, ApiSuccessResponse } from '@/types';

/* ── Payload type (matches backend UpdateUserRequest — all optional) ── */
export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'hr';
}

export interface UpdateUserRequest {
  id: number | string;
  data: UpdateUserPayload;
}

/**
 * PUT /api/users/:id
 *
 * Updates an existing user.
 * Payload shape matches the backend UpdateUserRequest validation (all fields optional).
 */
export const updateUser = async (id: number | string, data: UpdateUserPayload): Promise<User> => {
  const response = await api.put<ApiSuccessResponse<User>>(ENDPOINTS.users.update(id), data);
  return response.data.data;
};
