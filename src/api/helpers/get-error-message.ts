import { isAxiosError } from 'axios';
import { type ApiErrorResponse } from '../types';

/**
 * Extracts a readable error message from an unknown error,
 * tailored for Axios + custom API backend error format.
 */
export function getErrorMessage(error: unknown): string {
    if (isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message || error.message || 'An API error occurred.';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred.';
}
