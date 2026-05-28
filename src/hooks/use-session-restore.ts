import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { fetchProfile } from "@/services/auth.service";

/**
 * On app boot, if a token exists in the store, fetch the latest user
 * from GET /api/profile and refresh the Zustand store.
 *
 * If the token is invalid (401), the interceptor will call logout()
 * automatically and redirect to /login.
 */
export const useSessionRestore = () => {
  const token = useAuthStore((s) => s.token);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);
  const [isLoading, setIsLoading] = useState(!!token);

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    const restore = async () => {
      try {
        const user = await fetchProfile();
        if (!cancelled) {
          setUser(user);
        }
      } catch {
        // 401 is handled by the interceptor (auto-logout).
        // Any other error: still clear loading state.
        if (!cancelled) {
          logout();
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    restore();

    return () => {
      cancelled = true;
    };
  }, [token, setUser, logout]);

  return { isLoading };
};
