import React from 'react';

const VisibilityDot = ({ active }) => (
  <span
    className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
      active ? 'bg-emerald-500' : 'bg-gray-300'
    }`}
  >
    {active ? (
      <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
        <line x1="3" y1="3" x2="9" y2="9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="9" y1="3" x2="3" y2="9" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )}
  </span>
);

export default VisibilityDot;
