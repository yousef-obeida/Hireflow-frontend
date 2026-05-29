import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryKeys } from '@/api/query-keys';
import { getErrorMessage } from '@/api/helpers/get-error-message';
import { createUser } from '../api/createUser';
import type { CreateUserPayload } from '../api/createUser';

/**
 * Hook to create a new user.
 *
 * On success:
 *  - Invalidates the users list cache so the new user appears immediately.
 *  - Shows a success toast.
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      toast.success('User created successfully.');
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export default useCreateUser;
