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
  const isCourseWorkspace = location.pathname.startsWith('/student/dashboard/course/');
  const isGeneralChat = location.pathname === '/student/ia';
  const isProfileRoute = location.pathname === '/student/profile';
  const isRetosRoute = /^\/student\/dashboard\/course\/[^/]+\/retos\/?$/.test(location.pathname);
  const isSidebarPinned = !isRetosRoute;

  const handleOpenGeneralChat = () => {
    navigate('/student/ia');
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Sidebar con soporte móvil */}
      <Sidebar isOpen={sidebarOpen} isPinned={isSidebarPinned} onClose={() => setSidebarOpen(false)} />

      {/* Header con toggle de sidebar */}
      <Header isSidebarPinned={isSidebarPinned} onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Contenido principal - responsive */}
      <main className={`pt-16 transition-[margin] duration-300 ${isSidebarPinned ? 'lg:ml-[17rem]' : 'lg:ml-20'}`}>
<div
  className={`bg-white ${
    isCourseWorkspace || isGeneralChat
      ? 'p-0'
      : isProfileRoute
      ? 'p-3 sm:p-4 lg:p-4'
      : 'p-4 sm:p-6 lg:p-8'
  }`}
>          {children}
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
