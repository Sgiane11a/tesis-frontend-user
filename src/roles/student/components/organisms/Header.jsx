
import React from 'react';
import { UserProfile } from '../molecules/UserProfile';

const Header = () => {
  return (
    // CAMBIOS CLAVE:
    // - `fixed`: Saca el header del flujo normal del documento.
    // - `top-0 right-0`: Lo pega en la esquina superior derecha.
    // - `left-64`: Le da un margen izquierdo igual al ancho del sidebar (`w-64`).
    // - `z-30`: Asegura que esté por encima de otros contenidos.
    <header className="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 flex justify-end items-center px-6 z-30">
      <UserProfile name="Alejandra" role="Alumna" />
    </header>
  );
};

export { Header };
export {};