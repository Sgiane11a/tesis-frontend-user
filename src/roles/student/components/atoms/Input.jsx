import React from 'react';

const Input = ({ type = 'text', placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none ${className || ''}`}
      {...props}
    />
  );
};

export { Input };
export {};