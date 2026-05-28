/**
 * Re-export API envelope types from the central types module.
 * Kept for backward compatibility with existing imports.
 */
export type { ApiSuccessResponse as ApiResponse, ApiErrorResponse } from "@/types";

export type { ApiSuccessResponse as PaginatedResponse } from "@/types";
