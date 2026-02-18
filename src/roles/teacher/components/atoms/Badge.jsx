import React from 'react';

const colorMap = {
  primary: 'bg-primary-light text-primary-dark',
  success: 'bg-emerald-50 text-emerald-700',
  danger: 'bg-red-50 text-red-600',
  warning: 'bg-amber-50 text-amber-700',
  info: 'bg-blue-50 text-blue-600',
  gray: 'bg-gray-100 text-gray-600',
};

const sizeMap = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
  lg: 'text-sm px-3 py-1.5',
};

const Badge = ({ children, color = 'primary', size = 'md', className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${colorMap[color] || colorMap.primary} ${sizeMap[size] || sizeMap.md} ${className}`}
    >
      {children}
    </span>
  );
};

export { Badge };
