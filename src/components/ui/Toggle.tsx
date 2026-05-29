import React from 'react';

interface ToggleProps {
  /** Current toggle state */
  checked: boolean;
  /** Called when the user toggles */
  onChange: (checked: boolean) => void;
  /** Accessible label text */
  label?: string;
  /** Optional description below the label */
  description?: string;
  /** Disable interaction */
  disabled?: boolean;
  /** Unique id */
  id?: string;
  className?: string;
}

/**
 * Reusable toggle switch component matching the HireFlow design system.
 * Can be used standalone or with a label + description layout.
 */
export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  id,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  const switchEl = (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0058bc]/20 focus:ring-offset-2 cursor-pointer ${
        checked ? 'bg-[#0058bc]' : 'bg-[#d1d5db]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );

  if (!label) return switchEl;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col select-none">
        <p className="text-sm font-medium text-[#111c2d]">{label}</p>
        {description && (
          <p className="text-xs text-[#717786] mt-0.5">{description}</p>
        )}
      </div>
      {switchEl}
    </div>
  );
};
