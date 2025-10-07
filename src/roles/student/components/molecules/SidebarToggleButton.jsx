import React from 'react';
import { Icon } from '../atoms/Icon';

const SidebarToggleButton = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors lg:hidden" // Oculto en pantallas grandes por defecto
      aria-label={isOpen ? 'Cerrar panel de información' : 'Abrir panel de información'}
    >
      <Icon name={isOpen ? 'panel-close' : 'panel-open'} size={20} />
    </button>
  );
};

export { SidebarToggleButton };
export {};