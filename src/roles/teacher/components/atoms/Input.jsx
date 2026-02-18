import React from 'react';

const Input = ({ type = 'text', placeholder, className = '', icon, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white 
          transition-all duration-200 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

export { Input };
