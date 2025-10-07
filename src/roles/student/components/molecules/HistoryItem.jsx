// src/roles/student/components/molecules/HistoryItem.jsx (ACTUALIZADO)

import React from 'react';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

const HistoryItem = ({ title, date, isActive, onClick }) => {
  // CAMBIOS: Reducción de padding y espaciado (p-3 a p-2.5, gap-3 a gap-2)
  const baseClasses = "w-full text-left p-2.5 flex items-center gap-2 rounded-lg cursor-pointer transition-colors duration-200";
  const activeClasses = "bg-primary-light border border-primary-dark";
  const inactiveClasses = "hover:bg-gray-100";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon name="chat" size={16} className={isActive ? 'text-primary-dark' : 'text-gray-500'} />
      <div className="flex-1 overflow-hidden">
        <Text weight="medium" size="sm" className={`truncate ${isActive ? 'text-primary-dark' : ''}`}>
          {title}
        </Text>
        <Text size="xs" color="muted">{date}</Text>
      </div>
    </button>
  );
};

export { HistoryItem };
export {};