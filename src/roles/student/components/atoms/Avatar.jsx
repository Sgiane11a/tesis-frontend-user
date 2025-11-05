import React from 'react';

const Avatar = ({ name, src, size = '10', className = '' }) => {
  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '';

  const sizes = {
    '8': 'w-8 h-8 text-sm',
    '10': 'w-10 h-10 text-base',
    '12': 'w-12 h-12 text-lg',
    '16': 'w-16 h-16 text-xl',
  };

  return (
    <div className={`rounded-full bg-blue-100 text-blue-700 overflow-hidden flex items-center justify-center shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold">{initials || (name ? name.charAt(0).toUpperCase() : '')}</span>
      )}
    </div>
  );
};

export { Avatar };
export {};