import React from 'react';
import { GraduationCap } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary p-2.5 rounded-xl shadow-md shadow-primary/20">
        <GraduationCap className="w-6 h-6 text-white" strokeWidth={2} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-on-surface tracking-tight">EduIA</h1>
        <p className="text-[11px] text-gray-400 font-medium">Plataforma Educativa</p>
      </div>
    </div>
  );
};

export { Logo };
