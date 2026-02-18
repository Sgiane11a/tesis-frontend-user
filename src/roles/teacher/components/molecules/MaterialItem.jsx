import React from 'react';
import { FileText, Eye, Trash2 } from 'lucide-react';

const MaterialItem = ({ name, onView, onDelete }) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 sm:px-6 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
      {/* Icono + Nombre */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-red-400" />
        </div>
        <span className="text-sm text-gray-700 truncate">{name}</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 shrink-0 ml-3">
        <button
          onClick={onView}
          className="px-3 py-1 text-xs font-medium text-primary border border-primary/20 rounded-lg hover:bg-primary-light transition-colors"
        >
          Ver
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export { MaterialItem };
