import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { moveCandidateStage } from '../api/move-candidate-stage';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import type { MoveCandidateStageRequest } from '../api/move-candidate-stage';

/**
 * Hook to handle candidate stage transitions (moving a candidate application to a new stage).
 * Automatically invalidates relevant React Query caches and displays toast alerts.
 */
export function useMoveCandidateStage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MoveCandidateStageRequest) => moveCandidateStage(data),
    onSuccess: () => {
      toast.success('Candidate stage updated successfully.');

      // Invalidate relevant queries so the interface updates with the new stage/status
      queryClient.invalidateQueries({ queryKey: queryKeys.candidates.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipeline.stages });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useMoveCandidateStage;
