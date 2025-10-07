// src/roles/student/components/molecules/FilterDropdown.jsx (NUEVO ARCHIVO)
import React from 'react';
import { Icon } from '../atoms/Icon';

const FilterDropdown = ({ options, selected, onSelect }) => {
  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Icon name="chevron-up" className="rotate-180" size={16} />
      </div>
    </div>
  );
};

export { FilterDropdown };
export {};