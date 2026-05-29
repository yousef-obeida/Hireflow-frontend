import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { archiveJob } from '../api/archiveJob';

/**
 * Hook to archive (delete) a job posting.
 *
 * On success:
 *  - Invalidates the jobs list cache.
 *  - Invalidates dashboard stats.
 *  - Shows a success toast.
 */
export function useArchiveJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => archiveJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.jobs.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.stats });
      toast.success('Job closed successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useArchiveJob;
