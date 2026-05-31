import React from 'react';
import { motion } from 'framer-motion';
import type { User } from '@/types';
import { UsersTableRow } from './UsersTableRow';
import { UsersTableSkeleton } from './UsersTableSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onInviteUser?: () => void;
  className?: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  users, isLoading, isError, onRetry, onEdit, onDelete, onInviteUser, className = '',
}) => {
  if (isLoading) return <UsersTableSkeleton />;

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <ErrorState message="Failed to load team members." onRetry={onRetry} />
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <EmptyState
          title="No team members found"
          description="Invite your first team member to start collaborating."
          icon={<Users className="w-7 h-7 text-[#0058bc]" />}
          action={onInviteUser ? <Button variant="primary" className="px-5 py-2.5 text-sm" onClick={onInviteUser}>Invite User</Button> : undefined}
        />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className={`overflow-x-auto bg-white rounded-2xl border border-gray-100 ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#fafafa]">
          <tr>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">Name & Email</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">Role</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100">Last Updated</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-[#717786] tracking-wider uppercase border-b border-gray-100 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersTableRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
