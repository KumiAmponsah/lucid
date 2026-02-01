import React from 'react';

export const Card = ({ 
  children, 
  hoverable = false,
  className = '',
  ...props 
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-md
        ${hoverable ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};