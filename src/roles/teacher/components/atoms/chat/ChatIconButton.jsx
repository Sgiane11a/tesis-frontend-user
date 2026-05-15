import React from 'react';

const ChatIconButton = ({ children, icon: Icon, variant = 'default', ...props }) => {
  const variants = {
    default: 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50',
    primary: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
  };

  return (
    <button
      type="button"
      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm ${variants[variant]}`}
      {...props}
    >
      {Icon ? <Icon className="w-4 h-4" /> : null}
      {children}
    </button>
  );
};

export default ChatIconButton;
