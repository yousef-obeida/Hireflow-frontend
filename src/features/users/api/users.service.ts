import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { User, ApiSuccessResponse } from "@/types";
import type { UserFilters } from "@/features/users/api/users.types";

/** GET /api/users */
export const fetchUsers = async (filters?: UserFilters): Promise<User[]> => {
  const response = await api.get<ApiSuccessResponse<User[]>>(ENDPOINTS.users.all, {
    params: filters,
  });
  return response.data.data;
};

/** GET /api/users/:id */
export const fetchUser = async (id: number | string): Promise<User> => {
  const response = await api.get<ApiSuccessResponse<User>>(ENDPOINTS.users.details(id));
  return response.data.data;
};

/** POST /api/users */
export const createUser = async (data: CreateUserPayload): Promise<User> => {
  const response = await api.post<ApiSuccessResponse<User>>(ENDPOINTS.users.create, data);
  return response.data.data;
};

/** PUT /api/users/:id */
export const updateUser = async (id: number | string, data: UpdateUserPayload): Promise<User> => {
  const response = await api.put<ApiSuccessResponse<User>>(ENDPOINTS.users.update(id), data);
  return response.data.data;
};

/** DELETE /api/users/:id */
export const deleteUser = async (id: number | string): Promise<void> => {
  await api.delete(ENDPOINTS.users.delete(id));
};

/* ── Payload types (match backend Form Requests) ───────────────────── */

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'hr';
}

export type UpdateUserPayload = Partial<CreateUserPayload>;
