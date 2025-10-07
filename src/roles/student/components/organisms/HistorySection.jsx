
import React from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { HistoryItem } from '../molecules/HistoryItem';

const HistorySection = ({ sessions, activeChatId, onSelectChat, onNewChat }) => {
  return (
    <Card className="p-4 bg-white/60 backdrop-blur-lg border-gray-200 shadow-lg flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 shrink-0">
        <Text weight="bold">Historial</Text>
        <button 
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1 text-sm rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          <Icon name="sparkles" size={16} />
          Nuevo Chat
        </button>
      </div>
      {/* LISTA DE HISTORIAL EXPANDIBLE */}
      {/* 'flex-1' hace que este div crezca, y 'overflow-y-auto' maneja el scroll interno */}
      <div className="flex-1 space-y-1.5 overflow-y-auto pr-2 min-h-0">
        {sessions.map(session => (
          <HistoryItem
            key={session.id}
            title={session.title}
            date={session.date}
            isActive={session.id === activeChatId}
            onClick={() => onSelectChat(session.id)}
          />
        ))}
      </div>
    </Card>
  );
};

export { HistorySection };
export {};