/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { ButtonVariant } from '@/types';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'ref'> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  id,
  type = 'button',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-semibold select-none';
  
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#0058bc] text-white hover:bg-[#0070eb] disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-[#d0e1fb] text-[#54647a] hover:bg-[#d8e3fb] disabled:bg-gray-200 disabled:text-gray-400',
    outline: 'border border-[#717786] text-[#414755] hover:bg-[#f0f3ff] disabled:border-gray-200 disabled:text-gray-400',
    ghost: 'text-[#0058bc] hover:bg-[#0058bc]/5 disabled:text-gray-400',
  };

  const currentVariantClass = variantStyles[variant];

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={`${baseStyles} ${currentVariantClass} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
