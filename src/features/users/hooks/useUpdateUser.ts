import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { updateUser } from '../api/updateUser';
import type { UpdateUserPayload } from '../api/updateUser';

/**
 * Hook to update an existing user.
 *
 * The mutation function expects an object with `id` and `data`:
 * ```ts
 * const mutation = useUpdateUser();
 * mutation.mutate({ id: 42, data: { name: 'New name' } });
 * ```
 *
 * On success:
 *  - Invalidates the users list cache.
 *  - Invalidates the specific user detail cache.
 *  - Shows a success toast.
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateUserPayload }) =>
      updateUser(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(variables.id) });
      toast.success('User updated successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useUpdateUser;
