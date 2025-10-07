
import React, { useState } from 'react';
import { HistorySection } from './HistorySection';
import { FaqSection } from './FaqSection';

const InfoSidebar = ({ 
  isOpen, 
  sessions, 
  activeChatId, 
  onSelectChat, 
  onNewChat, 
  onFaqClick 
}) => {
  // 1. ESTADO PARA CONTROLAR SI LA SECCIÓN FAQ ESTÁ ABIERTA
  const [isFaqOpen, setIsFaqOpen] = useState(true);

  return (
    // 'flex flex-col' es la clave para la distribución vertical del espacio.
    // 'h-full' asegura que ocupe toda la altura de su contenedor padre.
    <aside 
      className={`
        transform transition-transform duration-300 ease-in-out
        w-full lg:w-auto
        flex flex-col space-y-6 h-full
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        fixed inset-y-0 right-0 z-20 p-6 bg-white border-l border-gray-200 lg:static lg:z-auto lg:p-0 lg:bg-transparent lg:border-none lg:translate-x-0
      `}
    >
      {/* SECCIÓN DE HISTORIAL */}
      {/* 'flex-1' y 'min-h-0' hacen que esta sección crezca para llenar el espacio vacío */}
      <div className="flex-1 min-h-0">
          <HistorySection
            sessions={sessions}
            activeChatId={activeChatId}
            onSelectChat={onSelectChat}
            onNewChat={onNewChat}
          />
      </div>
      
      {/* SECCIÓN DE IDEAS (FAQ) */}
      {/* 'shrink-0' evita que esta sección se encoja */}
      <div className="shrink-0">
          <FaqSection 
            onQuestionClick={onFaqClick}
            isOpen={isFaqOpen}
            onToggle={() => setIsFaqOpen(!isFaqOpen)}
          />
      </div>
    </aside>
  );
};

export { InfoSidebar };
export {};