import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { User, LoginResponse, LoginRequest } from "@/features/auth/types/auth.types";

/* ------------------------------------------------------------------ */
/*  Request / Response shapes                                          */
/* ------------------------------------------------------------------ */

export type { LoginRequest };

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
