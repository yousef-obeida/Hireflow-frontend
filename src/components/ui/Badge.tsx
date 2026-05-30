/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import type { BadgeVariant } from '@/types';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant,
  children,
  id,
  className = '',
}) => {
  const baseStyles = 'px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-semibold select-none border tracking-wide uppercase';

  const badgeConfig: Record<BadgeVariant, { container: string; dot?: string }> = {
    applied: {
      container: 'bg-[rgba(0,88,188,0.06)] text-[#0058bc] border-blue-100',
      dot: 'bg-[#0058bc]',
    },
    interview: {
      container: 'bg-[rgba(217,119,6,0.06)] text-[#b45309] border-amber-100',
      dot: 'bg-[#d97706]',
    },
    hired: {
      container: 'bg-[rgba(22,163,74,0.06)] text-[#15803d] border-green-100',
      dot: 'bg-[#16a34a]',
    },
    rejected: {
      container: 'bg-[rgba(186,26,26,0.08)] text-[#ba1a1a] border-[#ba1a1a]/20',
      dot: 'bg-[#ba1a1a]',
    },
    draft: {
      container: 'bg-[#e7eeff] text-[#414755] border-[#c1c6d7]/30',
    },
  };

  const config = badgeConfig[variant];

  return (
    <span id={id} className={`${baseStyles} ${config.container} ${className}`}>
      {config.dot && (
        <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden="true" />
      )}
      {children}
    </span>
  );
};
