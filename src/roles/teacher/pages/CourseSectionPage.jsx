import React from 'react';
import { useParams } from 'react-router-dom';
import { BookOpen, Users, BrainCircuit, Info } from 'lucide-react';
import { Text } from '../components/atoms';
import { CourseTabNav } from '../components/molecules/CourseTabNav';
import { useTeacherCourses } from '../../../hooks/useCourses';

const iconMap = {
  estudiantes: Users,
  chatia: BrainCircuit,
  informacion: Info,
};

const titleMap = {
  estudiantes: 'Estudiantes Matriculados',
  chatia: 'Chat con IA',
  informacion: 'Información del Curso',
};

const descriptionMap = {
  estudiantes: 'Aquí se mostrará la lista de estudiantes inscritos en este curso.',
  chatia: 'Asistente inteligente para apoyar la enseñanza del curso.',
  informacion: 'Detalles adicionales y configuración del curso.',
};

const CourseSectionPage = ({ section }) => {
  const { courseId } = useParams();
  const { data: courses = [] } = useTeacherCourses();
  const course = courses.find((c) => String(c.id) === String(courseId)) || null;

  const SectionIcon = iconMap[section] || BookOpen;
  const title = titleMap[section] || 'Sección';
  const description = descriptionMap[section] || '';

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navegación por tabs */}
      <CourseTabNav courseId={courseId} activeTab={section} />

      {/* Título del curso */}
      <Text as="h1" size="xl" weight="extrabold" className="tracking-tight sm:text-2xl mb-6">
        {course?.title || 'Curso'}
      </Text>

      {/* Placeholder del contenido */}
      <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-14 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
          <SectionIcon className="w-7 h-7 text-primary" />
        </div>
        <Text size="lg" weight="bold">{title}</Text>
        <Text size="sm" color="muted" className="mt-2 max-w-md">{description}</Text>
        <div className="mt-4 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold">
          En desarrollo
        </div>
      </div>
    </div>
  );
};

export default CourseSectionPage;
