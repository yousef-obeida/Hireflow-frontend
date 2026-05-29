import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { User, ApiSuccessResponse } from '@/types';

/* ── Payload type (matches backend StoreUserRequest rules) ─────────── */
export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'hr';
}

/**
 * POST /api/users
 *
 * Creates a new user.
 * Payload shape matches the backend StoreUserRequest validation.
 */
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post<ApiSuccessResponse<User>>(ENDPOINTS.users.create, data);
  return response.data.data;
};
