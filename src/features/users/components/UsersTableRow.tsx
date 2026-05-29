import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import type { User } from '@/types';
import { UserRoleBadge } from './UserRoleBadge';

interface UsersTableRowProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

/**
 * Single row in the Users table.
 * Displays user avatar/initials, name, email, role badge,
 * last updated date, and an actions dropdown.
 */
export const UsersTableRow: React.FC<UsersTableRowProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const updatedDate = user.updated_at
    ? format(new Date(user.updated_at), 'MMM d, yyyy')
    : 'N/A';

  return (
    <tr className="group hover:bg-[#fafbff] transition-colors duration-150 border-b border-gray-100 last:border-0">
      {/* Name & Email */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0058bc] to-[#2563eb] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-sm text-[#111c2d] group-hover:text-[#0058bc] transition-colors">
              {user.name}
            </p>
            <p className="text-[11px] text-[#9ca3af] mt-0.5 font-medium">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4 text-center">
        <UserRoleBadge role={user.role} />
      </td>

      {/* Last Updated */}
      <td className="px-6 py-4 text-sm text-[#717786] whitespace-nowrap">
        {updatedDate}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center relative" ref={menuRef}>
          <button
            id={`user-actions-${user.id}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
            aria-label={`Actions for ${user.name}`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-1 z-20 w-40 bg-white rounded-xl border border-[#e2e8f0] shadow-lg py-1.5 overflow-hidden"
              >
                <button
                  onClick={() => { onEdit?.(user); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#414755] hover:bg-[#f0f3ff] transition-colors cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5 text-[#717786]" />
                  Edit User
                </button>
                <div className="h-px bg-[#e2e8f0] mx-3 my-1" />
                <button
                  onClick={() => { onDelete?.(user); setMenuOpen(false); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/30 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete User
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  );
};
