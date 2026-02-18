
import React from 'react';
import { UserProfile } from '../molecules/UserProfile';
import { useAuth } from '../../../../hooks/useAuth';

const Header = () => {
  const { user } = useAuth();
  const displayName = user ? `${user.nombre}` : 'Usuario';
  const displayRole = user?.rol === 'alumno' ? 'Alumno(a)' : user?.rol || 'Usuario';

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 flex justify-end items-center px-6 z-30">
      <UserProfile name={displayName} role={displayRole} />
    </header>
  );
};

export { Header };
export {};