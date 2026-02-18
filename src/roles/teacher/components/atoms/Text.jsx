import React from 'react';

const sizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const weights = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const colors = {
  default: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-400',
  primary: 'text-primary',
  white: 'text-white',
  danger: 'text-red-500',
  success: 'text-emerald-600',
};

const Text = ({ as: Component = 'p', size = 'base', weight = 'normal', color = 'default', className = '', children, ...props }) => {
  return (
    <Component
      className={`${sizes[size] || sizes.base} ${weights[weight] || weights.normal} ${colors[color] || colors.default} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Text };
