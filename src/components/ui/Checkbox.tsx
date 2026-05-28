/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <input
            id={id}
            type="checkbox"
            ref={ref}
            className={`w-5 h-5 rounded border-[#c1c6d7] text-[#0058bc] focus:ring-[#0058bc]/20 accent-[#0058bc] cursor-pointer transition-all ${className}`}
            {...props}
          />
          <label
            htmlFor={id}
            className="text-sm text-[#414755] select-none cursor-pointer font-medium"
          >
            {label}
          </label>
        </div>
        {error && (
          <span className="text-xs font-medium text-[#ba1a1a] pl-8">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
