import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { NavItem } from '../molecules/NavItem';

// === AQUÍ ESTÁ EL CAMBIO CLAVE ===
// Las rutas ahora son ABSOLUTAS y coinciden 1 a 1 con StudentRoutes.jsx
const navLinks = [
  { iconName: 'dashboard', label: 'Dashboard', to: '/student/dashboard' },
  { iconName: 'ia', label: 'IA general', to: '/student/ia' },
  { iconName: 'people', label: 'Personas', to: '/student/people' },
  { iconName: 'profile', label: 'Perfil', to: '/student/profile' },
];

const Sidebar = () => {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <aside className="w-60 bg-surface p-6 flex flex-col gap-8 border-r border-gray-200/80 h-screen fixed">
      <Logo />
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          // Para Dashboard consideramos también rutas de cursos como parte de dashboard
          const isDashboard = link.to === '/student/dashboard' && (pathname.startsWith('/student/dashboard') || pathname.startsWith('/student/course'));
          const active = isDashboard ? true : pathname.startsWith(link.to);

          return (
            <NavItem
              key={link.label}
              iconName={link.iconName}
              label={link.label}
              to={link.to}
              active={active}
            />
          );
        })}
      </nav>
    </aside>
  );
};

export { Sidebar };