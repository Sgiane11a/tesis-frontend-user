import React from 'react';

const TabButton = ({ children, active = false, onClick, icon: Icon, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer
        ${active
          ? 'bg-primary text-white shadow-md shadow-primary/25'
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-primary-light hover:text-primary-dark hover:border-primary/20'
        } ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export { TabButton };
