
import React from 'react';

const Avatar = ({ src, alt = 'Avatar' }) => {
  return (
    // CAMBIOS: Reducido de w-10 h-10 (40px) a w-8 h-8 (32px).
    // El tamaño de la fuente para la inicial también se ha reducido.
    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden shrink-0">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-sm font-semibold text-blue-700">{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export { Avatar };
export {};