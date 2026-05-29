import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/api/query-keys';
import { getJob } from '../api/getJob';

/**
 * Hook to retrieve a single job posting by its ID.
 *
 * The query is automatically disabled when no valid `id` is provided,
 * preventing unnecessary network requests.
 */
export function useJob(id: number | string) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id),
    queryFn: () => getJob(id),
    enabled: !!id,
  });
}

export default useJob;
