import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Text, Button } from '../atoms';
import { CourseTabNav } from '../molecules/CourseTabNav';
import { BimesterSelector } from '../molecules/BimesterSelector';
import { ModuleAccordion } from '../molecules/ModuleAccordion';

// Datos mock de módulos (se reemplazarán con datos reales del backend)
const mockModules = [
  {
    id: 1,
    title: 'Semana 01 - Rebelión de José Gabriel Condorcanqui',
    materials: [
      { id: 1, name: 'Documento de la Rebelión de José Gabriel Condorcanqui', type: 'document' },
      { id: 2, name: 'Biografía de José Gabriel Condorcanqui', type: 'document' },
    ],
  },
  {
    id: 2,
    title: 'Semana 02 - La Independencia del Perú',
    materials: [
      { id: 3, name: 'Acta de Independencia', type: 'document' },
      { id: 4, name: 'Línea de tiempo de la independencia', type: 'document' },
    ],
  },
  {
    id: 3,
    title: 'Semana 03 - La República Aristocrática',
    materials: [
      { id: 5, name: 'Análisis político 1895-1919', type: 'document' },
    ],
  },
  {
    id: 4,
    title: 'Semana 04 - El Oncenio de Leguía',
    materials: [
      { id: 6, name: 'Modernización del Perú', type: 'document' },
      { id: 7, name: 'Constitución de 1920', type: 'document' },
    ],
  },
];

const CourseModulesView = ({ course, courseId }) => {
  const [bimester, setBimester] = useState(1);

  // De momento usamos mockModules, a futuro se traerá del backend
  const modules = mockModules;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navegación por tabs */}
      <CourseTabNav courseId={courseId} activeTab="modulos" />

      {/* Título del curso + Bimestre + Crear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Text as="h1" size="xl" weight="extrabold" className="tracking-tight sm:text-2xl">
          {course?.title || 'Curso'}
        </Text>

        <div className="flex items-center gap-3">
          <BimesterSelector value={bimester} onChange={setBimester} />
          <Button variant="primary" className="bg-gray-800 hover:bg-gray-900 shadow-none">
            <Plus className="w-4 h-4" />
            Crear
          </Button>
        </div>
      </div>

      {/* Lista de módulos (acordeones) */}
      <div className="space-y-3">
        {modules.map((mod) => (
          <ModuleAccordion
            key={mod.id}
            title={mod.title}
            materials={mod.materials}
            onUpload={() => console.log('Subir material a', mod.id)}
            onEdit={() => console.log('Editar módulo', mod.id)}
            onDelete={() => console.log('Eliminar módulo', mod.id)}
            onViewMaterial={(m) => console.log('Ver material', m.id)}
            onDeleteMaterial={(m) => console.log('Eliminar material', m.id)}
          />
        ))}
      </div>

      {/* Estado vacío */}
      {modules.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center mt-4">
          <Text size="sm" color="muted">No hay módulos creados para este bimestre.</Text>
          <Button variant="secondary" className="mt-4">
            <Plus className="w-4 h-4" />
            Crear primer módulo
          </Button>
        </div>
      )}
    </div>
  );
};

export { CourseModulesView };
