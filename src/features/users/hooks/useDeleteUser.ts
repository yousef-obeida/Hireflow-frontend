import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { deleteUser } from '../api/deleteUser';

/**
 * Hook to delete a user.
 *
 * On success:
 *  - Invalidates the users list cache.
 *  - Shows a success toast.
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('User deleted successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useDeleteUser;
