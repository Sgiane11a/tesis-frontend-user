// src/roles/student/components/molecules/Pagination.jsx (NUEVO ARCHIVO)
import React from 'react';
import { Icon } from '../atoms/Icon';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="chevron-up" className="-rotate-90" size={18} />
      </button>

      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            currentPage === number 
            ? 'bg-primary text-white' 
            : 'hover:bg-gray-100'
          }`}
        >
          {number}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="chevron-up" className="rotate-90" size={18} />
      </button>
    </div>
  );
};

export { Pagination };
export {};