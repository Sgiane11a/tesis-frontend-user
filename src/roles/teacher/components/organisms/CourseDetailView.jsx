import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, BookOpen, Users, BrainCircuit, Info } from 'lucide-react';
import { Text, Button, TabButton, Skeleton } from '../atoms';
import { CourseBanner } from '../molecules/CourseBanner';
import { CourseInfoPanel } from '../molecules/CourseInfoPanel';
import { CourseDescription } from '../molecules/CourseDescription';
import { useAuth } from '../../../../hooks/useAuth';

const tabs = [
  { key: 'modulos', label: 'Módulos', icon: BookOpen },
  { key: 'estudiantes', label: 'Estudiantes', icon: Users },
  { key: 'chatia', label: 'ChatIA', icon: BrainCircuit },
  { key: 'informacion', label: 'Información', icon: Info },
];

const CourseDetailView = ({ course, isLoading, isEditable }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-red-400" />
        </div>
        <Text size="lg" weight="bold">Curso no encontrado</Text>
        <Text size="sm" color="muted" className="mt-2">El curso solicitado no existe o no tienes acceso.</Text>
        <Button variant="secondary" className="mt-6" onClick={() => navigate('/teacher/dashboard')}>
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </Button>
      </div>
    );
  }

  // Unificar diseño: título centrado, imagen grande, info panel, descripción, tabs
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Título centrado */}
      <h1 className="text-3xl font-bold text-gray-700 text-center">{course.title}</h1>

      {/* Imagen/banner */}
      <div className="rounded-xl overflow-hidden border border-sky-100 bg-white shadow-sm">
        <CourseBanner imageUrl={course.imageUrl} title={course.title} />
      </div>

      {/* Panel de información general */}
      <div className="flex justify-center">
        <div className="w-full max-w-xs">
          <CourseInfoPanel
            studentCount={course.studentCount || 0}
            averageScore={course.averageScore || 0}
            completedPercent={course.progress || 0}
          />
        </div>
      </div>

      {/* Descripción y objetivos */}
      <CourseDescription title={course.title} description={course.description} />

      {/* Botón Editar solo para profesores */}
      {user?.rol === 'profesor' && (
        <div className="flex justify-center">
          <Button variant="primary" className="mt-2">
            <Pencil className="w-4 h-4" />
            Editar
          </Button>
        </div>
      )}

      {/* Tabs de navegación */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <button
          onClick={() => navigate(`/teacher/dashboard/course/${course.id}/modulos`)}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Módulos
        </button>
        <button
          onClick={() => navigate(`/teacher/dashboard/course/${course.id}/estudiantes`)}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Estudiantes
        </button>
        <button
          onClick={() => navigate(`/teacher/dashboard/course/${course.id}/chatia`)}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          ChatIA
        </button>
        <button
          onClick={() => navigate(`/teacher/dashboard/course/${course.id}/informacion`)}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Información
        </button>
      </div>
    </div>
  );
};

/* ---------- Skeleton de carga ---------- */
const CourseDetailSkeleton = () => (
  <div className="max-w-[1200px] mx-auto space-y-6 animate-pulse">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-64 h-8 rounded-lg" />
      </div>
      <Skeleton className="w-24 h-10 rounded-xl" />
    </div>

    {/* Banner + Info skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
      <Skeleton className="w-full h-56 rounded-2xl" />
      <Skeleton className="w-full h-44 rounded-2xl" />
    </div>

    {/* Description skeleton */}
    <Skeleton className="w-full h-40 rounded-2xl" />

    {/* Tabs skeleton */}
    <div className="flex gap-3">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="w-28 h-10 rounded-xl" />
      ))}
    </div>
  </div>
);

export { CourseDetailView };
