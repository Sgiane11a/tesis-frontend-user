// src/roles/student/components/molecules/IconButton.jsx (NUEVO ARCHIVO)
import React from 'react';
import { Icon } from '../atoms/Icon';

const IconButton = ({ iconName, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors ${className}`}
    >
      <Icon name={iconName} size={20} />
    </button>
  );
};

export { IconButton };
export {};