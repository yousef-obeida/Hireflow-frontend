import { useState, useCallback } from 'react';
import { useUsers } from '../hooks/useUsers';
import { useCreateUser } from '../hooks/useCreateUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { UsersHeader } from '../components/UsersHeader';
import { UsersTable } from '../components/UsersTable';
import { UsersPagination } from '../components/UsersPagination';
import { UserFormModal } from '../components/UserFormModal';
import { DeleteUserDialog } from '../components/DeleteUserDialog';
import type { User } from '@/types';
import type { GetUsersFilters } from '../api/getUsers';
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas/user.schema';

/**
 * Users Management page — orchestrator component (Admin only).
 *
 * Composes the header, table, pagination, create/edit modal, and
 * delete dialog. All data mutations are delegated to React Query hooks.
 */
export function UsersPage() {
  const {
    data: users,
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
  } = useUsers();

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  // ── Modal state ─────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  // ── Create ──────────────────────────────────────────────────────
  const handleInviteUser = useCallback(() => {
    setFormMode('create');
    setEditingUser(null);
    setFormOpen(true);
  }, []);

  // ── Edit ────────────────────────────────────────────────────────
  const handleEditUser = useCallback((user: User) => {
    setFormMode('edit');
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  // ── Form submit (create or edit) ────────────────────────────────
  const handleFormSubmit = useCallback(
    (data: CreateUserFormValues | UpdateUserFormValues) => {
      if (formMode === 'create') {
        createMutation.mutate(data as CreateUserFormValues, {
          onSuccess: () => setFormOpen(false),
        });
      } else if (editingUser) {
        updateMutation.mutate(
          { id: editingUser.id, data },
          { onSuccess: () => setFormOpen(false) },
        );
      }
    },
    [formMode, editingUser, createMutation, updateMutation],
  );

  // ── Delete ──────────────────────────────────────────────────────
  const handleDeleteUser = useCallback((user: User) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingUser) return;
    deleteMutation.mutate(deletingUser.id, {
      onSuccess: () => {
        setDeleteOpen(false);
        setDeletingUser(null);
      },
    });
  }, [deletingUser, deleteMutation]);

  // ── Filter change ───────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (newFilters: GetUsersFilters) => setFilters(newFilters),
    [setFilters],
  );

  return (
    <div className="flex flex-col gap-6">
      <UsersHeader
        filters={filters as GetUsersFilters}
        searchValue={filters.name}
        onSearch={setSearch}
        onFilterChange={handleFilterChange}
        onInviteUser={handleInviteUser}
      />

      <UsersTable
        users={users}
        isLoading={isLoading}
        isError={isError}
        onRetry={() => refetch()}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onInviteUser={handleInviteUser}
      />

      {!isLoading && users.length > 0 && (
        <UsersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          perPage={perPage}
          onPageChange={setPage}
        />
      )}

      {/* ── Create / Edit modal ─────────────────────────────────── */}
      <UserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={formMode}
        user={editingUser}
        onSubmit={handleFormSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* ── Delete confirmation ─────────────────────────────────── */}
      <DeleteUserDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setDeletingUser(null);
        }}
        user={deletingUser}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}

export default UsersPage;
