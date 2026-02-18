import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil, BookOpen, Users, BrainCircuit, Info } from 'lucide-react';
import { Text, Button, TabButton, Skeleton } from '../atoms';
import { CourseBanner } from '../molecules/CourseBanner';
import { CourseInfoPanel } from '../molecules/CourseInfoPanel';
import { CourseDescription } from '../molecules/CourseDescription';

const tabs = [
  { key: 'modulos', label: 'Módulos', icon: BookOpen },
  { key: 'estudiantes', label: 'Estudiantes', icon: Users },
  { key: 'chatia', label: 'ChatIA', icon: BrainCircuit },
  { key: 'informacion', label: 'Información', icon: Info },
];

const CourseDetailView = ({ course, isLoading }) => {
  const navigate = useNavigate();

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

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      {/* Encabezado: botón volver + título + botón editar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/teacher/dashboard')}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Text as="h1" size="2xl" weight="extrabold" className="tracking-tight truncate">
            {course.title}
          </Text>
        </div>
        <Button variant="primary" className="shrink-0 self-start sm:self-center">
          <Pencil className="w-4 h-4" />
          Editar
        </Button>
      </div>

      {/* Contenido principal: imagen + panel de info */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        {/* Imagen del curso */}
        <CourseBanner imageUrl={course.imageUrl} title={course.title} />

        {/* Panel de información */}
        <div className="lg:self-stretch">
          <CourseInfoPanel
            studentCount={course.studentCount || 0}
            averageScore={course.averageScore || 0}
            completedPercent={course.progress || 0}
          />
        </div>
      </div>

      {/* Descripción del curso */}
      <CourseDescription title={course.title} description={course.description} />

      {/* Tabs de navegación → navegan a sub-rutas */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <TabButton
            key={tab.key}
            active={false}
            onClick={() => navigate(`/teacher/dashboard/course/${course.id}/${tab.key}`)}
            icon={tab.icon}
          >
            {tab.label}
          </TabButton>
        ))}
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
