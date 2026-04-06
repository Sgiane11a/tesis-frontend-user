import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Text, Button } from '../atoms';
import { CourseTabNav } from '../molecules/CourseTabNav';
import { BimesterSelector } from '../molecules/BimesterSelector';
import { ModuleAccordion } from '../molecules/ModuleAccordion';

const CourseModulesView = ({ course, courseId }) => {
  const [bimester, setBimester] = useState(1);

  const modules = useMemo(() => {
    const resourcesByType = [
      { type: 'pdf', label: 'Guía de estudio' },
      { type: 'ppt', label: 'Presentación en PPT' },
      { type: 'image', label: 'Infografía' },
      { type: 'video', label: 'Video clase' },
    ];

    const moduleTopics = [
      'Cuentos y relatos',
      'Comprensión lectora',
      'Gramática y estilo',
      'Producción de texto',
      'Literatura clásica',
      'Análisis de personajes',
      'Recursos didácticos',
      'Práctica evaluativa',
    ];

    return Array.from({ length: 8 }, (_, index) => {
      const moduleNumber = index + 1;
      const topic = moduleTopics[index % moduleTopics.length];
      const materialCount = 3 + (index % 2);
      const materials = Array.from({ length: materialCount }, (__, materialIndex) => {
        const resource = resourcesByType[(moduleNumber + materialIndex) % resourcesByType.length];
        return {
          id: `${bimester}-${moduleNumber}-${materialIndex + 1}`,
          name: `${resource.label} - ${topic}`,
          type: resource.type,
        };
      });

      return {
        id: `${bimester}-${moduleNumber}`,
        title: `Módulo ${moduleNumber} - ${topic}`,
        materials,
      };
    });
  }, [bimester]);

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
            Crear módulo
          </Button>
        </div>
      </div>

      <div className="mb-4 text-sm text-gray-500">
        Selecciona un bimestre para ver los 8 módulos y sus recursos asociados.
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
