/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { LoginRequest, LoginResponse } from '@/features/auth/types/auth.types';

/**
 * Sends a POST request to log in the user and return their token and profile.
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(ENDPOINTS.auth.login, data);
  return response.data;
};
