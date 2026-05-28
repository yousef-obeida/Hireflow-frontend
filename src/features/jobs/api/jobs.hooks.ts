import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/api/query-keys";
import { getErrorMessage } from "@/api/helpers/get-error-message";
import {
  fetchJobs,
  fetchJob,
  createJob,
  updateJob,
  deleteJob,
} from "@/features/jobs/api/jobs.service";
import type { CreateJobPayload, UpdateJobPayload } from "@/features/jobs/api/jobs.service";
import type { JobFilters } from "@/features/jobs/api/jobs.types";

/* ── Queries ───────────────────────────────────────────────────────── */

/** GET /api/jobs — list with optional filters */
export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters),
    queryFn: () => fetchJobs(filters),
  });
}

/** GET /api/jobs/:id */
export function useJob(id: number | string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => fetchJob(id),
    enabled: !!id,
  });
}

/* ── Mutations ─────────────────────────────────────────────────────── */

/** POST /api/jobs */
export function useCreateJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobPayload) => createJob(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.all });
      toast.success("Job created successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** PUT /api/jobs/:id */
export function useUpdateJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateJobPayload }) =>
      updateJob(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.all });
      toast.success("Job updated successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

/** DELETE /api/jobs/:id */
export function useDeleteJob() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteJob(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.jobs.all });
      toast.success("Job deleted successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
