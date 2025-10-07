import React from 'react';
import { Icon } from './Icon';

const Button = ({ children, onClick, iconName, variant = 'primary', className = '' }) => {
  const baseClasses = 'p-2 rounded-md flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    icon: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {iconName && <Icon name={iconName} size={20} />}
      {children}
    </button>
  );
};

export { Button };
export {};