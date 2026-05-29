import React from 'react';

interface UserRoleBadgeProps {
  role: 'admin' | 'hr' | string;
}

/**
 * Styled badge for user role display.
 */
export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ role }) => {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    admin: { bg: 'bg-[#fff3cd]', text: 'text-[#856404]', label: 'Admin' },
    hr: { bg: 'bg-[#d0e1fb]', text: 'text-[#0058bc]', label: 'HR' },
  };

  const { bg, text, label } = config[role] ?? { bg: 'bg-gray-100', text: 'text-gray-600', label: role };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wide ${bg} ${text}`}
    >
      {label}
    </span>
  );
};
