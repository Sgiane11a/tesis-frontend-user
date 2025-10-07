// src/roles/student/components/atoms/Text.jsx (ACTUALIZADO)

import React from 'react';

const Text = ({ as: Component = 'p', size = 'base', weight = 'normal', color = 'default', className, children, ...props }) => {
  // CAMBIO: Se han ajustado los tamaños base para mejorar la legibilidad.
  const sizes = {
    xs: 'text-xs',      // 12px
    sm: 'text-[14px]',  // 14px, un poco más grande que el 'sm' por defecto.
    base: 'text-base',    // 16px (estándar)
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colors = {
    default: 'text-gray-800', // Un negro un poco más suave
    muted: 'text-gray-500',
    primary: 'text-primary-dark',
    danger: 'text-red-600',
  };

  const classes = `${sizes[size]} ${weights[weight]} ${colors[color]} ${className || ''}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export { Text };
export {};