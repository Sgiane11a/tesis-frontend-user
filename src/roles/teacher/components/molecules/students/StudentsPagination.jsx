import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageSize } from '../../../utils/studentPerformance';

const StudentsPagination = ({ from, to, total, page, pageCount, onPageChange }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
    <div>
      Mostrando {from} - {to} de {total} resultados
    </div>

    <div className="flex items-center gap-3">
      <div className="rounded-lg border border-gray-300 bg-white px-8 py-2 text-gray-600">
        {pageSize} por pagina
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="inline-flex h-8 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
          aria-label="Pagina anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="inline-flex h-8 min-w-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 font-medium text-gray-700">
          {page}
        </span>
        <span className="hidden sm:inline-flex h-8 min-w-9 items-center justify-center rounded-lg border border-gray-300 bg-white px-3 font-medium text-gray-700">
          {pageCount}
        </span>
        <button
          type="button"
          onClick={() => onPageChange(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          className="inline-flex h-8 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 disabled:opacity-40"
          aria-label="Pagina siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default StudentsPagination;
