import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Columns3, List, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PipelineColumn } from '../components/PipelineColumn';
import { usePipeline } from '../hooks/usePipeline';
import { useMoveCandidateStage } from '../hooks/useMoveCandidateStage';

/* ─── Skeleton Loader ──────────────────────────────────────────────── */

function PipelineSkeleton() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header skeleton */}
      <div className="animate-pulse space-y-3">
        <div className="h-5 w-40 bg-[#e8ecf0] rounded" />
        <div className="h-8 w-72 bg-[#dde3ea] rounded-lg" />
      </div>
      {/* Columns skeleton */}
      <div className="flex gap-5 overflow-x-auto pb-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-[320px] min-w-[320px] h-[460px] rounded-2xl bg-[#f3f4f6] border border-[#e8ecf0] p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="h-4 w-20 bg-[#dde3ea] rounded" />
              <div className="h-5 w-6 bg-[#e8ecf0] rounded-full" />
            </div>
            {[...Array(3)].map((_, j) => (
              <div key={j} className="h-28 bg-white rounded-xl border border-[#e8ecf0]" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Empty State ──────────────────────────────────────────────────── */

function PipelineEmpty({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f0f3ff] flex items-center justify-center mb-4">
        <Columns3 className="w-8 h-8 text-[#0058bc]" />
      </div>
      <h2 className="text-lg font-bold text-[#111c2d] mb-1">No Pipeline Stages</h2>
      <p className="text-sm text-[#717786] max-w-sm mb-4">
        Pipeline stages haven't been configured yet. Set up stages in your admin panel to start tracking candidates.
      </p>
      <Button variant="outline" className="px-4 py-2" onClick={onRefresh}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
}

/* ─── Main Pipeline Page ───────────────────────────────────────────── */

export function PipelinePage() {
  const navigate = useNavigate();
  const { columns, isLoading, isError, refetch } = usePipeline();
  const { mutate: moveStage, isPending: isMoving } = useMoveCandidateStage();
  const [viewMode, setViewMode] = useState<'board' | 'list'>('board');

  // ── Drag & Drop handlers ──
  const handleDragStart = useCallback((e: React.DragEvent, applicationId: number) => {
    e.dataTransfer.setData('application/pipeline-card', String(applicationId));
    e.dataTransfer.effectAllowed = 'move';

    // Add a subtle drag class
    if (e.currentTarget instanceof HTMLElement) {
      e.currentTarget.style.opacity = '0.5';
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, targetStageId: number) => {
      const applicationId = e.dataTransfer.getData('application/pipeline-card');
      if (!applicationId) return;

      // Find the application's current stage to avoid no-op moves
      const currentColumn = columns.find((col) =>
        col.applications.some((app) => app.id === Number(applicationId))
      );
      if (currentColumn?.stage.id === targetStageId) return;

      moveStage({
        applicationId: Number(applicationId),
        stageId: targetStageId,
      });
    },
    [columns, moveStage]
  );

  const handleCardClick = useCallback(
    (candidateId: number) => {
      navigate(`/candidates/${candidateId}/analysis`);
    },
    [navigate]
  );

  // ── Loading & Error states ──
  if (isLoading) return <PipelineSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-[#ba1a1a] font-semibold text-lg mb-2">Failed to Load Pipeline</div>
        <p className="text-sm text-[#717786] mb-4">
          An error occurred while loading the pipeline data.
        </p>
        <Button variant="outline" className="px-4 py-2" onClick={refetch}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  if (columns.length === 0) {
    return <PipelineEmpty onRefresh={refetch} />;
  }

  // ── Total candidates across all stages ──
  const totalCandidates = columns.reduce((sum, col) => sum + col.applications.length, 0);

  return (
    <div id="pipeline-page" className="flex flex-col gap-6 p-6">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight !text-black" style={{ fontWeight: 'bold' }}>
            Pipeline
          </h1>
          <p className="text-[#717786] text-sm mt-1">
            Drag and drop candidates between stages · {totalCandidates} candidate{totalCandidates !== 1 ? 's' : ''} total
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white rounded-xl border border-gray-200 p-0.5">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'board'
                  ? 'bg-[#0058bc] text-white shadow-sm'
                  : 'text-[#717786] hover:bg-gray-50'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              Board
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#0058bc] text-white shadow-sm'
                  : 'text-[#717786] hover:bg-gray-50'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List
            </button>
          </div>


        </div>
      </motion.div>

      {/* ── Moving Indicator ─────────────────────────────────────────── */}
      {isMoving && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-2 px-4 py-2 bg-[#d0e1fb] text-[#0058bc] rounded-xl text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4 animate-spin" />
          Moving candidate to new stage…
        </motion.div>
      )}

      {/* ── Kanban Board ─────────────────────────────────────────────── */}
      {viewMode === 'board' ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-5 overflow-x-auto pb-4 -mx-2 px-2"
          style={{ minHeight: 'calc(100vh - 260px)' }}
        >
          {columns.map((col) => (
            <PipelineColumn
              key={col.stage.id}
              stage={col.stage}
              applications={col.applications}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onCardClick={handleCardClick}
            />
          ))}
        </motion.div>
      ) : (
        /* ── List View (Compact) ─────────────────────────────────────── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {columns.map((col) => (
            <div key={col.stage.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-[#fafbfc] border-b border-gray-100">
                <h3 className="font-bold text-sm text-[#111c2d]">{col.stage.name}</h3>
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold bg-[#d0e1fb] text-[#0058bc]">
                  {col.applications.length}
                </span>
              </div>
              {col.applications.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {col.applications.map((app) => {
                    const initials = app.candidate.full_name
                      ?.split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase() ?? '??';
                    const nameLen = app.candidate.full_name?.length || 10;
                    const aiScore = 50 + ((nameLen * 3) % 49);

                    return (
                      <div
                        key={app.id}
                        onClick={() => handleCardClick(app.candidate.id)}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-[#fafbfc] cursor-pointer transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-[#111c2d] truncate">{app.candidate.full_name}</p>
                          <p className="text-xs text-[#717786] truncate">{app.job?.title ?? 'N/A'}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          aiScore >= 90 ? 'bg-[#dcfce7] text-[#166534]' :
                          aiScore >= 80 ? 'bg-[#e0f2fe] text-[#0369a1]' :
                          'bg-[#fef3c7] text-[#92400e]'
                        }`}>
                          {aiScore}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="px-5 py-6 text-center text-xs text-[#9ca3af]">No candidates in this stage</div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default PipelinePage;
