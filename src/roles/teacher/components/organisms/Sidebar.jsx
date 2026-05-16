import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  BrainCircuit,
  ChevronRight,
  FileBarChart,
  LayoutDashboard,
  LogOut,
  UserCircle,
  X,
} from 'lucide-react';
import { useAuth } from '../../../../hooks/useAuth';

const navLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/teacher/dashboard' },
  { icon: BrainCircuit, label: 'IA general', to: '/teacher/ia' },
  { icon: FileBarChart, label: 'Informes', to: '/teacher/informes' },
  { icon: UserCircle, label: 'Perfil', to: '/teacher/perfil' },
];

const SidebarLogo = ({ isPinned = false }) => (
  <div className="flex min-w-0 items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-sm shadow-sky-600/25">
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className={`min-w-0 overflow-hidden opacity-100 transition-opacity duration-300 ${isPinned ? 'lg:opacity-100' : 'lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
      <h1 className="whitespace-nowrap text-lg font-bold text-slate-950">EduIA</h1>
      <p className="whitespace-nowrap text-xs font-medium text-slate-400">Plataforma educativa</p>
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, to, isPinned = false, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group/item relative flex h-12 items-center gap-3 rounded-2xl px-3 text-sm font-semibold transition-all duration-200 ease-in-out ${
        isActive
          ? 'bg-sky-50 text-sky-700 shadow-sm'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <span
          className={`absolute left-0 h-7 w-1 rounded-r-full transition-all duration-200 ${
            isActive ? 'bg-sky-600 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover/item:scale-105 ${
            isActive ? 'bg-sky-600 text-white' : 'bg-white text-slate-400 group-hover/item:text-sky-600'
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 2} />
        </span>
        <span className={`min-w-0 overflow-hidden whitespace-nowrap opacity-100 transition-opacity duration-300 ${isPinned ? 'lg:opacity-100' : 'lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
          {label}
        </span>
      </>
    )}
  </NavLink>
);

const Sidebar = ({ isOpen, isPinned = false, onClose }) => {
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
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-label="Cerrar menu"
        />
      )}

      <aside
        className={`group/sidebar fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white/95 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-[width,transform] duration-300 ease-in-out
          w-[17rem]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isPinned ? 'lg:w-[17rem]' : 'lg:w-20 lg:hover:w-[17rem]'} lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between px-4">
          <SidebarLogo isPinned={isPinned} />
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Cerrar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-2">
          {navLinks.map((link) => (
            <SidebarItem
              key={link.to}
              icon={link.icon}
              label={link.label}
              to={link.to}
              isPinned={isPinned}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        <div className="px-3 pb-5">
          <div className={`mb-3 overflow-hidden rounded-2xl border border-sky-100 bg-sky-50/80 p-3 opacity-100 transition-opacity duration-300 ${isPinned ? 'lg:opacity-100' : 'lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-800">
              <ChevronRight className="h-4 w-4" />
              Gestiona tus cursos
            </div>
            <p className="mt-1 text-xs leading-relaxed text-sky-700/80">
              Revisa informes y acompana el avance de tus estudiantes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="group/item flex h-12 w-full items-center gap-3 rounded-2xl px-3 text-sm font-semibold text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white transition-all duration-200 group-hover/item:scale-105 group-hover/item:text-red-600">
              <LogOut className="h-5 w-5" />
            </span>
            <span className={`overflow-hidden whitespace-nowrap opacity-100 transition-opacity duration-300 ${isPinned ? 'lg:opacity-100' : 'lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
              Cerrar sesion
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export { Sidebar };
