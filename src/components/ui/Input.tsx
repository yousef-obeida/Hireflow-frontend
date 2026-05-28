/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-[#111c2d]">
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`w-full bg-[#f0f3ff] border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl px-4 py-3 text-sm text-[#111c2d] placeholder:text-gray-400 focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none ${
            error ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/10' : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs font-medium text-[#ba1a1a] mt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
