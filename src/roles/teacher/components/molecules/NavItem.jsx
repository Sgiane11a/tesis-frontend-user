import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
        ${
          isActive
            ? 'bg-primary text-white shadow-md shadow-primary/25'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
        }`}
    >
      <Icon
        className={`w-[18px] h-[18px] transition-colors ${
          isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
        }`}
        strokeWidth={isActive ? 2.2 : 1.8}
      />
      <span>{label}</span>
    </Link>
  );
};

export { NavItem };
