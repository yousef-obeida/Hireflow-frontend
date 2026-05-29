import { useState, useCallback } from 'react';
import { useInterviewsList } from '../hooks/useInterviewsList';
import { useCreateInterview } from '../hooks/useCreateInterview';
import { useUpdateInterview } from '../hooks/useUpdateInterview';
import { useCancelInterview } from '../hooks/useCancelInterview';
import { InterviewsHeader } from '../components/InterviewsHeader';
import { InterviewStatCards } from '../components/InterviewStatCards';
import { InterviewsTable } from '../components/InterviewsTable';
import { InterviewsPagination } from '../components/InterviewsPagination';
import { InterviewFormModal } from '../components/InterviewFormModal';
import { CancelInterviewDialog } from '../components/CancelInterviewDialog';
import type { Interview } from '@/types';
import type { GetInterviewsFilters } from '../api/getInterviews';
import type { CreateInterviewFormValues } from '../schemas/interview.schema';

/**
 * Interviews Management page — orchestrator component.
 *
 * Composes the header, stat cards, table, pagination, create/edit modal,
 * and cancel dialog. All data mutations are delegated to React Query hooks.
 */
export function InterviewsPage() {
  const {
    data: interviews,
    allInterviews,
    isLoading,
    isError,
    refetch,
    filters,
    search,
    setSearch,
    setFilters,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    setPage,
  } = useInterviewsList();

  const createMutation = useCreateInterview();
  const updateMutation = useUpdateInterview();
  const cancelMutation = useCancelInterview();

  // ── Modal state ─────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const [cancelOpen, setCancelOpen] = useState(false);
  const [cancellingInterview, setCancellingInterview] = useState<Interview | null>(null);

  // ── Create ──────────────────────────────────────────────────────
  const handleScheduleInterview = useCallback(() => {
    setFormMode('create');
    setEditingInterview(null);
    setFormOpen(true);
  }, []);

  // ── Edit ────────────────────────────────────────────────────────
  const handleEditInterview = useCallback((interview: Interview) => {
    setFormMode('edit');
    setEditingInterview(interview);
    setFormOpen(true);
  }, []);

  // ── View (expand details inline or navigate) ────────────────────
  const handleViewInterview = useCallback((interview: Interview) => {
    // For now, open in edit mode as read-only view
    setFormMode('edit');
    setEditingInterview(interview);
    setFormOpen(true);
  }, []);

  // ── Form submit (create or edit) ────────────────────────────────
  const handleFormSubmit = useCallback(
    (data: CreateInterviewFormValues) => {
      if (formMode === 'create') {
        createMutation.mutate(data, {
          onSuccess: () => setFormOpen(false),
        });
      } else if (editingInterview) {
        updateMutation.mutate(
          {
            id: editingInterview.id,
            data: {
              date: data.date,
              time: data.time,
              interviewer: data.interviewer,
              type: data.type,
            },
          },
          { onSuccess: () => setFormOpen(false) },
        );
      }
    },
    [formMode, editingInterview, createMutation, updateMutation],
  );

  // ── Cancel ──────────────────────────────────────────────────────
  const handleCancelInterview = useCallback((interview: Interview) => {
    setCancellingInterview(interview);
    setCancelOpen(true);
  }, []);

  const handleConfirmCancel = useCallback(() => {
    if (!cancellingInterview) return;
    cancelMutation.mutate(cancellingInterview.id, {
      onSuccess: () => {
        setCancelOpen(false);
        setCancellingInterview(null);
      },
    });
  }, [cancellingInterview, cancelMutation]);

  // ── Filter change ───────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (newFilters: GetInterviewsFilters) => setFilters(newFilters),
    [setFilters],
  );

  return (
    <div className="flex flex-col gap-6">
      <InterviewsHeader
        filters={filters as GetInterviewsFilters}
        searchValue={search}
        onSearch={setSearch}
        onFilterChange={handleFilterChange}
        onScheduleInterview={handleScheduleInterview}
      />

      {/* Stat cards */}
      <InterviewStatCards interviews={allInterviews} />

      <InterviewsTable
        interviews={interviews}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onView={handleViewInterview}
        onEdit={handleEditInterview}
        onCancel={handleCancelInterview}
        onSchedule={handleScheduleInterview}
      />

      {!isLoading && interviews.length > 0 && (
        <InterviewsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          perPage={perPage}
          onPageChange={setPage}
        />
      )}

      {/* ── Create / Edit modal ─────────────────────────────────── */}
      <InterviewFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={formMode}
        interview={editingInterview}
        onSubmit={handleFormSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* ── Cancel confirmation ──────────────────────────────────── */}
      <CancelInterviewDialog
        open={cancelOpen}
        onClose={() => {
          setCancelOpen(false);
          setCancellingInterview(null);
        }}
        interview={cancellingInterview}
        onConfirm={handleConfirmCancel}
        loading={cancelMutation.isPending}
      />
    </div>
  );
}

export default InterviewsPage;
