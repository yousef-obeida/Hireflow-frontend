import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/api/query-keys";
import { getErrorMessage } from "@/api/helpers/get-error-message";
import {
  fetchInterviews,
  fetchInterview,
  createInterview,
  updateInterview,
  cancelInterview,
} from "@/features/interviews/api/interviews.service";
import type {
  CreateInterviewPayload,
  UpdateInterviewPayload,
} from "@/features/interviews/api/interviews.service";
import type { InterviewFilters } from "@/features/interviews/api/interviews.types";

/* ── Queries ───────────────────────────────────────────────────────── */

/** GET /api/interviews — HR only (backend: role:hr middleware) */
export function useInterviews(filters?: InterviewFilters) {
  return useQuery({
    queryKey: queryKeys.interviews.lists(),
    queryFn: () => fetchInterviews(filters),
  });
}

/** GET /api/interviews/:id */
export function useInterview(id: number | string) {
  return useQuery({
    queryKey: queryKeys.interviews.detail(id),
    queryFn: () => fetchInterview(id),
    enabled: !!id,
  });
}

/* ── Mutations ─────────────────────────────────────────────────────── */

/** POST /api/interviews — also sends email invitation via backend */
export function useCreateInterview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInterviewPayload) => createInterview(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.interviews.all });
      // Also refresh pipeline since scheduling may affect stage view
      qc.invalidateQueries({ queryKey: queryKeys.pipeline.all });
      toast.success("Interview scheduled and invitation email sent.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** PUT /api/interviews/:id */
export function useUpdateInterview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateInterviewPayload }) =>
      updateInterview(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.interviews.all });
      toast.success("Interview updated successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** DELETE /api/interviews/:id — marks as 'cancelled' on backend */
export function useCancelInterview() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => cancelInterview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.interviews.all });
      toast.success("Interview cancelled successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
