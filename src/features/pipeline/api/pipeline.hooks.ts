import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryKeys } from "@/api/query-keys";
import { getErrorMessage } from "@/api/helpers/get-error-message";
import {
  fetchStages,
  moveApplication,
} from "@/features/pipeline/api/pipeline.service";

/* ── Queries ───────────────────────────────────────────────────────── */

/**
 * GET /api/stages — Kanban board data.
 * Backend: StageController@index with StageFilter.
 * Returns stages with nested applications.candidate.
 */
export function useStages(filters?: { name?: string }) {
  return useQuery({
    queryKey: queryKeys.pipeline.stages,
    queryFn: () => fetchStages(filters),
  });
}

/* ── Mutations ─────────────────────────────────────────────────────── */

/**
 * PATCH /api/applications/:id/move
 * Backend: StageController@moveApplication.
 * Moves an application to a different stage and auto-sends
 * email notifications (interview/rejection/offer) based on stage name.
 */
export function useMoveApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, stageId }: { applicationId: number | string; stageId: number }) =>
      moveApplication(applicationId, stageId),
    onSuccess: () => {
      // Refresh both pipeline and candidates since status may change
      qc.invalidateQueries({ queryKey: queryKeys.pipeline.all });
      qc.invalidateQueries({ queryKey: queryKeys.candidates.all });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
      toast.success("Application moved successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
