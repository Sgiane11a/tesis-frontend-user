import React from 'react';
import { UserRound } from 'lucide-react';

const StudentAvatar = ({ name = '', src = '', className = '' }) => (
  <div className={`w-9 h-9 rounded-full bg-sky-400 text-white flex items-center justify-center ${className}`}>
    {src ? (
      <img src={src} alt={name || 'Estudiante'} className="h-full w-full rounded-full object-cover" />
    ) : (
      <UserRound className="w-5 h-5" />
    )}
  </div>
);

export default StudentAvatar;
