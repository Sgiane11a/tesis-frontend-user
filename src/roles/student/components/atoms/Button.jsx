import React from 'react';
import { Icon } from './Icon';

const Button = ({ children, onClick, iconName, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'rounded-lg font-semibold shadow-sm transition-colors flex items-center gap-2 justify-center';

  const variants = {
    primary: 'px-6 py-3 bg-primary text-white hover:bg-primary-dark',
    ghost: 'px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
    icon: 'p-2 bg-gray-100 rounded-md',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {iconName && <Icon name={iconName} size={18} />}
      {children}
    </button>
  );
};

export { Button };
export {};