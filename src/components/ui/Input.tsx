import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-[#111c2d]">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          )}
          <input
            id={id}
            ref={ref}
            className={`w-full bg-[#f0f3ff] border border-[#e2e8f0] hover:border-[#c1c6d7] rounded-xl ${
              Icon ? 'pl-11 pr-4' : 'px-4'
            } py-3 text-sm text-[#111c2d] placeholder:text-gray-400 focus:border-[#0058bc] focus:ring-4 focus:ring-[#0058bc]/10 transition-all outline-none ${
              error ? 'border-[#ba1a1a] focus:border-[#ba1a1a] focus:ring-[#ba1a1a]/10' : ''
            } ${className}`}
            {...props}
          />
        </div>
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
