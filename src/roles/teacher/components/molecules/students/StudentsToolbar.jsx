import React from 'react';
import { Search } from 'lucide-react';

const StudentsToolbar = ({ courseTitle, search, filter, onSearchChange, onFilterChange }) => (
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
    <div>
      <h2 className="text-2xl font-semibold text-gray-700">Estudiantes</h2>
      <p className="mt-1 text-sm text-gray-500">
        Visualiza el avance de tus estudiantes en {courseTitle || 'este curso'}.
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative w-full sm:w-[390px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full h-10 rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
          placeholder="Busca un alumno en especifico"
        />
      </div>

      <select
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
        className="h-10 rounded-lg border border-sky-200 bg-sky-50 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
      >
        <option value="all">Selecciona Rendimiento</option>
        <option value="good">Buen Rendimiento</option>
        <option value="follow">Seguimiento</option>
        <option value="attention">Requiere Atencion</option>
      </select>
    </div>
  </div>
);

export default StudentsToolbar;
