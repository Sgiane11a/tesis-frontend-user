import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

const NavItem = ({ iconName, label, to, active = false }) => {
  // CAMBIOS: Menos padding, textos y iconos más pequeños.
  const baseClasses = "flex items-center gap-3 py-2 px-3 rounded-md cursor-pointer transition-colors text-sm";
  const activeClasses = "bg-primary-light text-primary-dark";
  const inactiveClasses = "hover:bg-gray-100 text-gray-600";

  return (
    <Link to={to} className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}>
      <Icon name={iconName} size={18} className={active ? 'text-primary-dark' : 'text-gray-500'} />
      <Text weight={active ? 'semibold' : 'medium'}>
        {label}
      </Text>
    </Link>
  );
};

export { NavItem };
export {};