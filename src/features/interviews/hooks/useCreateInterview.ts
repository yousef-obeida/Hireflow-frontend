import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { createInterview } from '../api/createInterview';
import type { CreateInterviewPayload } from '../api/createInterview';

/**
 * Hook to schedule a new interview.
 *
 * On success:
 *  - Invalidates the interviews list cache so the new interview appears immediately.
 *  - Invalidates pipeline cache (scheduling may affect stage view).
 *  - Shows a success toast.
 *
 * On error:
 *  - Extracts a readable message from the API error envelope.
 *  - Shows an error toast.
 */
export function useCreateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInterviewPayload) => createInterview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.pipeline.all });
      toast.success('Interview scheduled and invitation email sent.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useCreateInterview;
