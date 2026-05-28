import api from "./axios";
import { useAuthStore } from "@/store/auth-store";

// ── Request: attach Bearer token ────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ── Response: handle 401 by logging out ─────────────────────────────
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);