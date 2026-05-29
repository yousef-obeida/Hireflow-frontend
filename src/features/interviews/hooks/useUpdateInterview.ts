import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { updateInterview } from '../api/updateInterview';
import type { UpdateInterviewPayload } from '../api/updateInterview';

/**
 * Hook to update an existing interview.
 *
 * The mutation function expects an object with `id` and `data`:
 * ```ts
 * const mutation = useUpdateInterview();
 * mutation.mutate({ id: 42, data: { date: '2024-12-01' } });
 * ```
 *
 * On success:
 *  - Invalidates the interviews list cache.
 *  - Invalidates the specific interview detail cache.
 *  - Shows a success toast.
 */
export function useUpdateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateInterviewPayload }) =>
      updateInterview(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.detail(variables.id) });
      toast.success('Interview updated successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useUpdateInterview;
