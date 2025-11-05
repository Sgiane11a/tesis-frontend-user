// src/roles/student/components/molecules/HistoryItem.jsx (ACTUALIZADO)

import React from 'react';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

const HistoryItem = ({ title, date, isActive, onClick, onEdit, onDelete }) => {
  // CAMBIOS: Reducción de padding y espaciado (p-3 a p-2.5, gap-3 a gap-2)
  const baseClasses = "w-full text-left p-2.5 flex items-center gap-2 rounded-lg cursor-pointer transition-colors duration-200";
  const activeClasses = "bg-primary-light border border-primary-dark";
  const inactiveClasses = "hover:bg-gray-100";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <button onClick={onClick} className="flex items-center gap-2 flex-1 text-left min-w-0">
        <Icon name="chat" size={16} className={isActive ? 'text-primary-dark' : 'text-gray-500'} />
        <div className="overflow-hidden min-w-0">
          <Text weight="medium" size="sm" className={`truncate ${isActive ? 'text-primary-dark' : ''}`}>
            {title}
          </Text>
          <Text size="xs" color="muted">{date}</Text>
        </div>
      </button>

      {/* 3-dots menu */}
      <div className="ml-2 relative">
        <button className="p-1 rounded hover:bg-gray-100" aria-label="Más opciones" onClick={(e) => { e.stopPropagation(); const menu = e.currentTarget.nextSibling; menu.classList.toggle('hidden'); }}>
          <Icon name="more-vertical" size={16} />
        </button>
        <div className="hidden absolute right-0 mt-2 w-36 bg-white border rounded shadow z-10">
          <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => onEdit?.()}>Editar</button>
          <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50" onClick={() => onDelete?.()}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export { HistoryItem };