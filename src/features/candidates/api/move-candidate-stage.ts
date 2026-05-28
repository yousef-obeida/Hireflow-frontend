import api from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import type { Application, ApiSuccessResponse } from '@/types';

export interface MoveCandidateStageRequest {
  applicationId: number | string;
  stageId: number;
}

/**
 * Moves a candidate's application to a new stage.
 * Sends a PATCH request to /applications/{id}/move.
 */
export const moveCandidateStage = async ({
  applicationId,
  stageId,
}: MoveCandidateStageRequest): Promise<Application> => {
  const response = await api.patch<ApiSuccessResponse<Application>>(
    ENDPOINTS.stages.move(applicationId),
    { stage_id: stageId }
  );
  return response.data.data;
};
export default moveCandidateStage;
