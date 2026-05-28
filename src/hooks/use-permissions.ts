import { useMemo } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { ROLE_PERMISSIONS, type Permission } from "@/config/permissions";

/**
 * Returns permission utilities for the currently authenticated user.
 *
 * Permissions are resolved from the user's role using the
 * ROLE_PERMISSIONS map defined in `config/permissions.ts`, which
 * mirrors the backend middleware `role:admin,hr`.
 */
export function usePermissions() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? null;

  const permissions = useMemo<Permission[]>(() => {
    if (!role) return [];

    const roleKey = role.toUpperCase();
    return ROLE_PERMISSIONS[roleKey] ?? [];
  }, [role]);

  /** Check if the user has a specific permission */
  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  /** Check if the user has ANY of the given permissions */
  const hasAnyPermission = (perms: Permission[]): boolean => {
    return perms.some((p) => permissions.includes(p));
  };

  /** Check if the user has ALL of the given permissions */
  const hasAllPermissions = (perms: Permission[]): boolean => {
    return perms.every((p) => permissions.includes(p));
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    role: user?.role ?? null,
    isAdmin: user?.role === "admin",
    isHR: user?.role === "hr",
  } as const;
}
