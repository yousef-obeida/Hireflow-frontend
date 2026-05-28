import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { DashboardStats, ApiSuccessResponse } from "@/types";

/** GET /api/dashboard */
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<ApiSuccessResponse<DashboardStats>>(ENDPOINTS.dashboard.stats);
  return response.data.data;
};
