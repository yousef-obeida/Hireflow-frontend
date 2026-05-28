import { QueryClient, type DefaultOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '@/api/helpers/get-error-message';

const defaultOptions: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
        // Global fallback — individual hooks can override with their own onError
        onError: (error) => {
            toast.error(getErrorMessage(error));
        },
    },
};

export const queryClient = new QueryClient({ defaultOptions });
