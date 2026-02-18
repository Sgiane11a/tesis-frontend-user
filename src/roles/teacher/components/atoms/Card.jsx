import React from 'react';

const Card = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col ${
        hover ? 'hover:shadow-md hover:border-gray-200 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export { Card };
