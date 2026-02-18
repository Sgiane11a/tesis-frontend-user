import React from 'react';

const variants = {
  primary: 'px-5 py-2.5 bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/20',
  secondary: 'px-5 py-2.5 bg-primary-light text-primary-dark hover:bg-indigo-100',
  ghost: 'px-4 py-2 bg-transparent text-gray-600 hover:bg-gray-100',
  outline: 'px-5 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50',
  danger: 'px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100',
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
