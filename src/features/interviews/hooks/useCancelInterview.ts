import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { cancelInterview } from '../api/cancelInterview';

/**
 * Hook to cancel an interview.
 *
 * The backend permanently deletes the interview record.
 *
 * On success:
 *  - Invalidates the interviews list cache.
 *  - Shows a success toast.
 */
export function useCancelInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => cancelInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.interviews.all });
      toast.success('Interview deleted successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useCancelInterview;
