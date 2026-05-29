import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { createJob } from '../api/createJob';
import type { CreateJobPayload } from '../api/createJob';

/**
 * Hook to create a new job posting.
 *
 * On success:
 *  - Invalidates the jobs list cache so the new job appears immediately.
 *  - Invalidates dashboard stats (total_jobs counter).
 *  - Shows a success toast.
 *
 * On error:
 *  - Extracts a readable message from the API error envelope.
 *  - Shows an error toast.
 */
export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateJobPayload) => createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
      toast.success('Job created successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useCreateJob;
