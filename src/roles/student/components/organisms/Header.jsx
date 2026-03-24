
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { UserProfile } from '../molecules/UserProfile';
import { useAuth } from '../../../../hooks/useAuth';

const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const displayName = user ? `${user.nombre}` : 'Alumno';
  const displayRole = user?.rol === 'alumno' ? 'Alumno(a)' : user?.rol || 'Usuario';

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[250px] h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
      {/* Lado izquierdo - Menú hamburguesa en móvil */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="hidden lg:block" />

      {/* Lado derecho */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notificaciones */}
        <button className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full" />
        </button>

        {/* Separador */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block" />

        {/* Perfil */}
        <UserProfile name={displayName} role={displayRole} />
      </div>
    </header>
  );
};

export { Header };
export {};