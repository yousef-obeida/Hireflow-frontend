import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/api/query-keys";
import { getErrorMessage } from "@/api/helpers/get-error-message";
import {
  fetchApplicationForm,
  submitApplication,
} from "@/features/applications/api/applications.service";

/* ── Queries ───────────────────────────────────────────────────────── */

/**
 * GET /api/apply — public form data with available open jobs.
 * Backend: ApplicationController@create.
 * Returns available_jobs list and field definitions.
 */
export function useApplicationForm() {
  return useQuery({
    queryKey: ["applications", "form"] as const,
    queryFn: fetchApplicationForm,
    // Public endpoint — longer stale time is fine
    staleTime: 60 * 1000,
  });
}

/* ── Mutations ─────────────────────────────────────────────────────── */

/**
 * POST /api/apply/:jobId — public application submission with file upload.
 * Backend: ApplicationController@store.
 * Triggers: ApplicationReceivedMail + AnalyzeCVJob (async AI analysis).
 */
export function useSubmitApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: number | string; data: FormData }) =>
      submitApplication(jobId, data),
    onSuccess: () => {
      // Refresh candidates and pipeline data for logged-in HR/admin users
      qc.invalidateQueries({ queryKey: queryKeys.candidates.all });
      qc.invalidateQueries({ queryKey: queryKeys.pipeline.all });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
      toast.success("Application submitted successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
