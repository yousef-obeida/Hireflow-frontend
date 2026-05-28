import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/api/query-keys";
import { getErrorMessage } from "@/api/helpers/get-error-message";
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "@/features/users/api/users.service";
import type {
  CreateUserPayload,
  UpdateUserPayload,
} from "@/features/users/api/users.service";
import type { UserFilters } from "@/features/users/api/users.types";

/* ── Queries ───────────────────────────────────────────────────────── */

/** GET /api/users — Admin only (backend: role:admin middleware + UserPolicy) */
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: queryKeys.users.lists(),
    queryFn: () => fetchUsers(filters),
  });
}

/** GET /api/users/:id */
export function useUser(id: number | string) {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}

/* ── Mutations ─────────────────────────────────────────────────────── */

/** POST /api/users */
export function useCreateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User created successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** PUT /api/users/:id */
export function useUpdateUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateUserPayload }) =>
      updateUser(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User updated successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** DELETE /api/users/:id */
export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success("User deleted successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
