import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { User } from "@/types";

/* ------------------------------------------------------------------ */
/*  Request / Response shapes                                          */
/* ------------------------------------------------------------------ */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type ProfileResponse = User;

/* ------------------------------------------------------------------ */
/*  Service functions                                                   */
/* ------------------------------------------------------------------ */

/** POST /api/login */
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(ENDPOINTS.auth.login, data);
  return response.data;
};

/** GET /api/profile — fetch the authenticated user */
export const fetchProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>(ENDPOINTS.auth.me);
  return response.data;
};
