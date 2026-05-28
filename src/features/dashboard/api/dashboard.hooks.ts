import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/query-keys";
import { fetchDashboardStats } from "@/features/dashboard/api/dashboard.service";

/**
 * GET /api/dashboard — aggregate stats.
 * Backend: DashboardController@index (role:admin,hr).
 *
 * Returns: total_jobs, total_candidates, hired_count, rejected_count, interview_count
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats,
    queryFn: fetchDashboardStats,
    // Dashboard stats can be slightly stale — 30 seconds
    staleTime: 30 * 1000,
  });
}
