import React, { useState } from 'react';
import { Sidebar } from '../components/organisms/Sidebar';
import { Header } from '../components/organisms/Header';

const TeacherMainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isSidebarPinned = true;

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      {/* Sidebar con soporte móvil */}
      <Sidebar isOpen={sidebarOpen} isPinned={isSidebarPinned} onClose={() => setSidebarOpen(false)} />

      {/* Header con toggle de sidebar */}
      <Header isSidebarPinned={isSidebarPinned} onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Contenido principal - responsive */}
      <main className={`pt-16 transition-[margin] duration-300 ${isSidebarPinned ? 'lg:ml-[17rem]' : 'lg:ml-20'}`}>
<div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-4">          {children}
        </div>
      </main>
    </div>
  );
};

export { TeacherMainLayout };
