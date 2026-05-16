import React, { useEffect, useState } from 'react';

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const Avatar = ({ name = '', src, size = 'md', className = '' }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const showImage = src && !imageFailed;

  useEffect(() => {
    setImageFailed(false);
  }, [src]);

  return (
    <div
      className={`rounded-full bg-gradient-to-br from-primary-light to-indigo-200 text-primary-dark overflow-hidden flex items-center justify-center shrink-0 font-semibold ${sizeMap[size] || sizeMap.md} ${className}`}
    >
      {showImage ? (
        <img src={src} alt={name} className="w-full h-full object-cover" onError={() => setImageFailed(true)} />
      ) : (
        <span>{initials || '?'}</span>
      )}
    </div>
  );
};

export { Avatar };
export {};
