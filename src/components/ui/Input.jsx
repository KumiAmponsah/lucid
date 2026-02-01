import React from 'react';

export const Input = ({ 
  label, 
  error, 
  helperText,
  required = false,
  endIcon,
  className = '',
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="label font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          className={`
            w-full px-4 py-2.5 border-2 rounded-lg text-gray-700
            transition-all duration-200
            bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${endIcon ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
      {helperText && !error && <span className="text-gray-500 text-sm">{helperText}</span>}
    </div>
  );
};