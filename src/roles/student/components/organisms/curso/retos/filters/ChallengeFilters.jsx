import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { filterOptions } from '../data/challengeCatalog';

const ChallengeFilters = ({ activeFilter, onFilterChange, sort, onSortChange }) => (
  <div className="sticky top-28 z-10 flex flex-col gap-3 rounded-2xl border border-sky-100 bg-white/95 p-3 shadow-sm backdrop-blur lg:flex-row lg:items-center lg:justify-between">
    <div className="flex gap-2 overflow-x-auto">
      {filterOptions.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onFilterChange(option.key)}
          className={`shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
            activeFilter === option.key
              ? 'border-sky-500 bg-sky-600 text-white shadow-sm'
              : 'border-gray-200 bg-white text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>

    <label className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-600">
      <SlidersHorizontal className="h-4 w-4 text-gray-400" />
      <span>Ordenar:</span>
      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
        className="bg-transparent text-sm font-semibold text-gray-700 outline-none"
      >
        <option value="recommended">Recomendados</option>
        <option value="xp">Más XP</option>
        <option value="difficulty">Dificultad</option>
      </select>
    </label>
  </div>
);

export default ChallengeFilters;
