import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { queryKeys } from '@/api/query-keys';
import { getStages } from '../api/get-stages';
import { getCandidates } from '../api/get-candidates';
import type { Stage, Candidate, Application } from '@/types';

export interface PipelineColumn {
  stage: Stage;
  applications: (Application & { candidate: Candidate })[];
}

/**
 * Hook that fetches both stages and candidates, then groups applications
 * into pipeline columns keyed by stage.
 */
export function usePipeline() {
  const stagesQuery = useQuery({
    queryKey: queryKeys.pipeline.stages,
    queryFn: getStages,
  });

  const candidatesQuery = useQuery({
    queryKey: queryKeys.candidates.lists(),
    queryFn: () => getCandidates(),
  });

  const isLoading = stagesQuery.isLoading || candidatesQuery.isLoading;
  const isError = stagesQuery.isError || candidatesQuery.isError;

  const columns: PipelineColumn[] = useMemo(() => {
    const stages = stagesQuery.data ?? [];
    const candidates = candidatesQuery.data ?? [];

    // Sort stages by their order field
    const sortedStages = [...stages].sort((a, b) => a.order - b.order);

    return sortedStages.map((stage) => {
      // Collect all applications that belong to this stage,
      // attaching the parent candidate for display purposes.
      const stageApplications: (Application & { candidate: Candidate })[] = [];

      candidates.forEach((candidate) => {
        candidate.applications?.forEach((app) => {
          if (app.stage_id === stage.id || app.stage?.id === stage.id) {
            stageApplications.push({
              ...app,
              candidate,
            });
          }
        });
      });

      return { stage, applications: stageApplications };
    });
  }, [stagesQuery.data, candidatesQuery.data]);

  return {
    columns,
    stages: stagesQuery.data ?? [],
    candidates: candidatesQuery.data ?? [],
    isLoading,
    isError,
    refetch: () => {
      stagesQuery.refetch();
      candidatesQuery.refetch();
    },
  };
}

export default usePipeline;
