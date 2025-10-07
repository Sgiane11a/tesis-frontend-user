import React from 'react';
import { Sidebar } from '../components/organisms/Sidebar';
import { Header } from '../components/organisms/Header';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-background min-h-screen">
      <Sidebar />
      <Header />
      
      {/* CAMBIOS: Ajustados ml y pt para coincidir con los nuevos tamaños de Sidebar (w-60) y Header (h-14) */}
      <main className="ml-60 pt-14">
        <div className="p-8">
            {children}
        </div>
      </main>
    </div>
  );
};

export { MainLayout };
export {};