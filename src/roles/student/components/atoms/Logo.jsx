import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-800 p-2 rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L22 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 4.5L7.5 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div>
        <h1 className="text-lg font-bold text-on-surface">EduIA</h1>
        <p className="text-xs text-gray-500">Plataforma Educativa</p>
      </div>
    </div>
  );
};

export { Logo };
export {};