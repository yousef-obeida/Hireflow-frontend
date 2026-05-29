import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas/user.schema';
import type { User } from '@/types';

interface UserFormModalProps {
  /** Controls visibility */
  open: boolean;
  onClose: () => void;
  /** "create" for a new user, "edit" for updating an existing one */
  mode: 'create' | 'edit';
  /** The user to edit (only relevant when mode === 'edit') */
  user?: User | null;
  /** Called with validated form data on submit */
  onSubmit: (data: CreateUserFormValues | UpdateUserFormValues) => void;
  /** Show loading state on submit button */
  loading?: boolean;
}

/**
 * Create / Edit user form modal.
 *
 * Uses the createUserSchema or updateUserSchema (Zod) for validation
 * and react-hook-form for form state. Layout mirrors the Job Form Modal
 * with a two-column design.
 */
export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onClose,
  mode,
  user,
  onSubmit,
  loading = false,
}) => {
  const isCreate = mode === 'create';
  const schema = isCreate ? createUserSchema : updateUserSchema;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(schema) as unknown as Resolver<CreateUserFormValues>,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'hr',
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (open && mode === 'edit' && user) {
      reset({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      });
    } else if (open && mode === 'create') {
      reset({
        name: '',
        email: '',
        password: '',
        role: 'hr',
      });
    }
  }, [open, mode, user, reset]);

  const title = isCreate ? 'Invite New User' : 'Edit User';
  const subtitle = isCreate
    ? 'Add a new team member to your organization'
    : `Editing "${user?.name ?? 'User'}"`;

  const handleFormSubmit = handleSubmit((data: CreateUserFormValues) => {
    // For edit mode, strip empty password so backend doesn't update it
    if (mode === 'edit' && !data.password) {
      const { password: _, ...rest } = data;
      onSubmit(rest as UpdateUserFormValues);
    } else {
      onSubmit(data);
    }
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      size="xl"
      id="user-form-modal"
      footer={
        <>
          <Button
            variant="ghost"
            className="px-5 py-2.5 text-sm"
            onClick={onClose}
            disabled={loading}
          >
            Discard
          </Button>
          <button
            onClick={handleFormSubmit}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 bg-[#0058bc] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#0070eb] transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {isCreate ? 'Create User' : 'Save Changes'}
          </button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* ── Two-column layout ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {/* ── Left: USER DETAILS ──────────────────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              User Details
            </p>

            <Input
              id="user-name"
              label="Full Name"
              placeholder="e.g. Sarah Miller"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              id="user-email"
              label="Email Address"
              placeholder="e.g. sarah@hireflow.io"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          {/* ── Right: SECURITY & ROLE ──────────────────────────── */}
          <div className="space-y-5">
            <p className="text-xs font-bold text-[#0058bc] tracking-wider uppercase">
              Security &amp; Role
            </p>

            <Input
              id="user-password"
              label={isCreate ? 'Password' : 'New Password (optional)'}
              placeholder={isCreate ? 'Min. 6 characters' : 'Leave blank to keep current'}
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />

            <Select
              id="user-role"
              label="Role"
              error={errors.role?.message}
              options={[
                { value: 'hr', label: 'HR' },
                { value: 'admin', label: 'Admin' },
              ]}
              {...register('role')}
            />

            {/* Role description */}
            <div className="bg-[#f9f9ff] border border-[#e2e8f0] rounded-xl px-4 py-3.5">
              <p className="text-xs text-[#717786] leading-relaxed">
                <span className="font-bold text-[#414755]">Admin</span> — Full access to all features including user management.
              </p>
              <p className="text-xs text-[#717786] leading-relaxed mt-1.5">
                <span className="font-bold text-[#414755]">HR</span> — Can manage candidates, jobs, interviews, and pipelines.
              </p>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
