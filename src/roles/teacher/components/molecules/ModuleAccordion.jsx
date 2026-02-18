import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, Pencil, Trash2 } from 'lucide-react';
import { MaterialItem } from './MaterialItem';
import { Badge } from '../atoms';

const ModuleAccordion = ({ title, materials = [], onUpload, onEdit, onDelete, onViewMaterial, onDeleteMaterial }) => {
  const [isOpen, setIsOpen] = useState(false);
  const materialCount = materials.length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      {/* Header del módulo (clickeable) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 hover:from-blue-50 hover:to-indigo-50/80 transition-colors"
      >
        <span className="text-sm font-semibold text-gray-800 text-left truncate pr-3">
          {title}
        </span>

        <div className="flex items-center gap-3 shrink-0">
          <Badge color="gray" size="sm">
            {materialCount} {materialCount === 1 ? 'material' : 'materiales'}
          </Badge>
          {isOpen ? (
            <ChevronUp className="w-4.5 h-4.5 text-gray-400" />
          ) : (
            <ChevronDown className="w-4.5 h-4.5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Contenido expandible */}
      {isOpen && (
        <div className="border-t border-gray-100">
          {/* Acciones del módulo */}
          <div className="flex items-center justify-end gap-2 px-5 py-3 border-b border-gray-50">
            <button
              onClick={onUpload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Subir
            </button>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              Editar
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Lista de materiales */}
          {materials.length > 0 ? (
            <div>
              {materials.map((material, idx) => (
                <MaterialItem
                  key={material.id || idx}
                  name={material.name}
                  onView={() => onViewMaterial?.(material)}
                  onDelete={() => onDeleteMaterial?.(material)}
                />
              ))}
            </div>
          ) : (
            <div className="px-5 py-6 text-center">
              <p className="text-sm text-gray-400">No hay materiales en este módulo.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { ModuleAccordion };
