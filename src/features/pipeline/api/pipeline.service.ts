import api from "@/api/axios";
import { ENDPOINTS } from "@/api/endpoints";
import type { Stage, Application, ApiSuccessResponse } from "@/types";

/** GET /api/stages — Kanban view with nested applications.candidate */
export const fetchStages = async (filters?: { name?: string }): Promise<Stage[]> => {
  const response = await api.get<ApiSuccessResponse<Stage[]>>(ENDPOINTS.stages.all, {
    params: filters,
  });
  return response.data.data;
};

/** PATCH /api/applications/:id/move */
export const moveApplication = async (
  applicationId: number | string,
  stageId: number,
): Promise<Application> => {
  const response = await api.patch<ApiSuccessResponse<Application>>(
    ENDPOINTS.stages.move(applicationId),
    { stage_id: stageId },
  );
  return response.data.data;
};
