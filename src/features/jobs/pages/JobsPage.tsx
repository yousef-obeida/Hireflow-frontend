import { useState, useCallback } from 'react';
import { useJobs } from '../hooks/useJobs';
import { useCreateJob } from '../hooks/useCreateJob';
import { useUpdateJob } from '../hooks/useUpdateJob';
import { useArchiveJob } from '../hooks/useArchiveJob';
import { JobsHeader } from '../components/JobsHeader';
import { JobsTable } from '../components/JobsTable';
import { JobsPagination } from '../components/JobsPagination';
import { JobFormModal } from '../components/JobFormModal';
import { ArchiveJobDialog } from '../components/ArchiveJobDialog';
import type { Job } from '@/types';
import type { GetJobsFilters } from '../api/getJobs';
import type { CreateJobFormValues } from '../schemas/job.schema';

/**
 * Jobs Management page — orchestrator component.
 *
 * Composes the header, table, pagination, create/edit modal, and
 * archive dialog. All data mutations are delegated to React Query hooks.
 */
export function JobsPage() {
  const {
    data: jobs,
    isLoading,
    isError,
    refetch,
    filters,
    setSearch,
    setFilters,
    currentPage,
    totalPages,
    totalCount,
    perPage,
    setPage,
  } = useJobs();

  const createMutation = useCreateJob();
  const updateMutation = useUpdateJob();
  const archiveMutation = useArchiveJob();

  // ── Modal state ─────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archivingJob, setArchivingJob] = useState<Job | null>(null);

  // ── Create ──────────────────────────────────────────────────────
  const handlePostJob = useCallback(() => {
    setFormMode('create');
    setEditingJob(null);
    setFormOpen(true);
  }, []);

  // ── Edit ────────────────────────────────────────────────────────
  const handleEditJob = useCallback((job: Job) => {
    setFormMode('edit');
    setEditingJob(job);
    setFormOpen(true);
  }, []);

  // ── Form submit (create or edit) ────────────────────────────────
  const handleFormSubmit = useCallback(
    (data: CreateJobFormValues) => {
      if (formMode === 'create') {
        createMutation.mutate(data, {
          onSuccess: () => setFormOpen(false),
        });
      } else if (editingJob) {
        updateMutation.mutate(
          { id: editingJob.id, data },
          { onSuccess: () => setFormOpen(false) },
        );
      }
    },
    [formMode, editingJob, createMutation, updateMutation],
  );

  // ── Archive ─────────────────────────────────────────────────────
  const handleArchiveJob = useCallback((job: Job) => {
    setArchivingJob(job);
    setArchiveOpen(true);
  }, []);

  const handleConfirmArchive = useCallback(() => {
    if (!archivingJob) return;
    archiveMutation.mutate(archivingJob.id, {
      onSuccess: () => {
        setArchiveOpen(false);
        setArchivingJob(null);
      },
    });
  }, [archivingJob, archiveMutation]);

  // ── View (placeholder) ──────────────────────────────────────────
  const handleViewJob = useCallback(() => {
    // TODO: navigate to detail page or open detail drawer
  }, []);

  // ── Filter change ───────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (newFilters: GetJobsFilters) => setFilters(newFilters),
    [setFilters],
  );

  return (
    <div className="flex flex-col gap-6">
      <JobsHeader
        filters={filters as GetJobsFilters}
        searchValue={filters.title}
        onSearch={setSearch}
        onFilterChange={handleFilterChange}
        onPostJob={handlePostJob}
      />

      <JobsTable
        jobs={jobs}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onView={handleViewJob}
        onEdit={handleEditJob}
        onArchive={handleArchiveJob}
        onPostJob={handlePostJob}
      />

      {!isLoading && jobs.length > 0 && (
        <JobsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          perPage={perPage}
          onPageChange={setPage}
        />
      )}

      {/* ── Create / Edit modal ─────────────────────────────────── */}
      <JobFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={formMode}
        job={editingJob}
        onSubmit={handleFormSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* ── Archive confirmation ────────────────────────────────── */}
      <ArchiveJobDialog
        open={archiveOpen}
        onClose={() => {
          setArchiveOpen(false);
          setArchivingJob(null);
        }}
        job={archivingJob}
        onConfirm={handleConfirmArchive}
        loading={archiveMutation.isPending}
      />
    </div>
  );
}

export default JobsPage;
