import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/organisms/Sidebar';
import { Header } from '../components/organisms/Header';
import ChatbotAnimation from '../../../components/Animation/ChatbotAnimation';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const showChatShortcut = location.pathname === '/student/dashboard';

  const handleOpenGeneralChat = () => {
    navigate('/student/ia');
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Sidebar con soporte móvil */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header con toggle de sidebar */}
      <Header onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Contenido principal - responsive */}
      <main className="lg:ml-[250px] pt-16 transition-[margin] duration-300">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Atajo al chat: solo robot clickable. Solo en dashboard principal. */}
      {showChatShortcut && (
        <button
          type="button"
          onClick={handleOpenGeneralChat}
          aria-label="Ir al chat general"
          title="Ir al chat general"
          className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 select-none"
        >
          <ChatbotAnimation width={128} height={128} />
        </button>
      )}
    </div>
  );
};

export { MainLayout };
export {};