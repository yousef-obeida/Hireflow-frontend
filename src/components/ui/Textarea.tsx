/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, rows = 4, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#111c2d]">
            {label}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          className={`w-full bg-[#f0f3ff] border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl px-4 py-3 text-sm text-[#111c2d] placeholder:text-gray-400 focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none resize-none ${
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

Textarea.displayName = 'Textarea';
