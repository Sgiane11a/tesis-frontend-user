import React from 'react';

const MiniOptionCard = ({ label, description, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      className="cursor-pointer p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
    >
      <div className="text-sm font-medium text-gray-800">{label}</div>
      <div className="text-xs text-gray-500 mt-1">{description}</div>
    </div>
  );
};

export default MiniOptionCard;
