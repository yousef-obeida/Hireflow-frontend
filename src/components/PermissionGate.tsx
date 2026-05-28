import type { ReactNode } from "react";
import { usePermissions } from "@/hooks/use-permissions";
import type { Permission } from "@/config/permissions";

interface PermissionGateProps {
  /** One or more permissions required. User needs ANY of them by default. */
  permissions: Permission[];
  /** If true, user must have ALL permissions instead of ANY. */
  requireAll?: boolean;
  /** Content shown when user lacks permission. Defaults to nothing. */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Conditionally renders children based on the user's permissions.
 *
 * Mirrors the backend role middleware — if a route requires `role:hr`,
 * the navigation item is gated with `permissions={['manage:interviews']}`.
 *
 * @example
 * ```tsx
 * <PermissionGate permissions={['manage:users']}>
 *   <AdminPanel />
 * </PermissionGate>
 * ```
 */
export const PermissionGate = ({
  permissions: requiredPerms,
  requireAll = false,
  fallback = null,
  children,
}: PermissionGateProps) => {
  const { hasAnyPermission, hasAllPermissions } = usePermissions();

  const allowed = requireAll
    ? hasAllPermissions(requiredPerms)
    : hasAnyPermission(requiredPerms);

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
};
