import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BrainCircuit, FileBarChart, UserCircle, LogOut, X } from 'lucide-react';
import { Logo } from '../atoms';
import { NavItem } from '../molecules';
import { useAuth } from '../../../../hooks/useAuth';

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/teacher/dashboard' },
  { icon: BrainCircuit, label: 'IA general', to: '/teacher/ia' },
  { icon: FileBarChart, label: 'Informes', to: '/teacher/informes' },
  { icon: UserCircle, label: 'Perfil', to: '/teacher/perfil' },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`w-[250px] bg-white h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-gray-100
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        {/* Logo + Botón cerrar en móvil */}
        <div className="px-6 pt-7 pb-6 flex items-center justify-between">
          <Logo />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-4 flex flex-col gap-1" onClick={handleNavClick}>
          {navLinks.map((link) => (
            <NavItem
              key={link.to}
              icon={link.icon}
              label={link.label}
              to={link.to}
            />
          ))}
        </nav>

        {/* Cerrar Sesión */}
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export { Sidebar };
