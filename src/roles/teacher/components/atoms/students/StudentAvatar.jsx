import React from 'react';
import { UserRound } from 'lucide-react';

const StudentAvatar = ({ className = '' }) => (
  <div className={`w-9 h-9 rounded-full bg-sky-400 text-white flex items-center justify-center ${className}`}>
    <UserRound className="w-5 h-5" />
  </div>
);

export default StudentAvatar;
