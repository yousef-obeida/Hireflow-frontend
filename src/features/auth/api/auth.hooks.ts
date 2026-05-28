import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth.store";
import api from "@/api/client";
import { ENDPOINTS } from "@/api/endpoints";

export { useLogin } from "../hooks/useLogin";

/* ── Mutations ─────────────────────────────────────────────────────── */

/** POST /api/logout */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post(ENDPOINTS.auth.logout);
    },
    onSuccess: () => {
      logout();
      qc.clear(); // Clear all cached data on logout
      toast.success("You have been logged out.");
    },
    onError: () => {
      // Even if the server call fails, log out locally
      logout();
      qc.clear();
    },
  });
}
