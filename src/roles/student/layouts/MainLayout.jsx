import React, { useState } from 'react';
import { Sidebar } from '../components/organisms/Sidebar';
import { Header } from '../components/organisms/Header';

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    </div>
  );
};

export { MainLayout };
export {};