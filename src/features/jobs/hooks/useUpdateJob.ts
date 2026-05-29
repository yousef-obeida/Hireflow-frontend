import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { updateJob } from '../api/updateJob';
import type { UpdateJobPayload } from '../api/updateJob';

/**
 * Hook to update an existing job posting.
 *
 * The mutation function expects an object with `id` and `data`:
 * ```ts
 * const mutation = useUpdateJob();
 * mutation.mutate({ id: 42, data: { title: 'New title' } });
 * ```
 *
 * On success:
 *  - Invalidates the jobs list cache.
 *  - Invalidates the specific job detail cache.
 *  - Shows a success toast.
 */
export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateJobPayload }) =>
      updateJob(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.detail(variables.id) });
      toast.success('Job updated successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useUpdateJob;
