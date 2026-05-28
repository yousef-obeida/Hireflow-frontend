/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { login } from '@/features/auth/api/login';
import type { LoginRequest } from '@/features/auth/types/auth.types';
import { getErrorMessage } from '@/api/helpers/get-error-message';

/**
 * Hook to handle user login mutation, state management, toast alerts, and redirection.
 */
export const useLogin = () => {
  const loginStore = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),
    onSuccess: ({ token, user }) => {
      loginStore(token, user);
      toast.success(`Welcome back, ${user.name}!`);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export default useLogin;
