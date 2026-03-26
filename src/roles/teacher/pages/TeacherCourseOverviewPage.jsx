import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeacherCourses } from '../../../hooks/useCourses';
import { useAuth } from '../../../hooks/useAuth';

const COURSE_BANNER =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80';

const defaultObjectives = [
  'Conocer los aspectos que caracterizan el desarrollo historico del Peru y su impacto en la nacion.',
  'Identificar las etapas principales de la historia del Peru desde culturas precolombinas hasta la Republica.',
  'Investigar fuentes historicas y herramientas de analisis para comprender cambios sociales y economicos.',
  'Elaborar e interpretar trabajos que promuevan la valoracion del patrimonio cultural peruano.',
];

const TeacherCourseOverviewPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: courses = [] } = useTeacherCourses();
  const { user } = useAuth();

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  const title = course?.title || 'Historia del Peru - Primer Ano';
  const description =
    course?.description ||
    'Bienvenido al curso. En esta seccion podras revisar modulos, retos, chat con IA e informacion general del curso.';
  const objectives = course?.objectives || defaultObjectives;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-700 text-center">{title}</h1>

      <div className="rounded-xl overflow-hidden border border-sky-100 bg-white shadow-sm">
        <img
          src={course?.imageUrl || COURSE_BANNER}
          alt={`Portada de ${title}`}
          className="w-full h-[220px] md:h-[280px] object-cover"
          loading="lazy"
        />
      </div>

      <section className="bg-white border border-sky-200 rounded-2xl p-5 md:p-7 text-gray-600">
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Bienvenido al Curso</h2>
        <p className="text-sm md:text-base leading-relaxed mb-4">{description}</p>
        <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
          {objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
        {user?.rol === 'profesor' && (
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-sky-600 text-white rounded shadow hover:bg-sky-700 font-semibold"
              onClick={() => {/* abrir modal de edición */}}
            >
              Editar
            </button>
          </div>
        )}
      </section>

      <div className="bg-white rounded-t-md border-b border-sky-100">
        <nav className="flex items-center gap-4 md:gap-6 px-4 md:px-6 overflow-x-auto" aria-label="Navegacion del curso">
          <button
            onClick={() => navigate(`/teacher/dashboard/course/${courseId}/modulos`)}
            className="py-3 px-2 text-sm font-semibold rounded-t-md text-sky-700 border-b-4 border-sky-300 whitespace-nowrap"
          >
            Modulos
          </button>
          <button
            onClick={() => navigate(`/teacher/dashboard/course/${courseId}/modulos/retos`)}
            className="py-3 px-2 text-sm font-semibold rounded-t-md text-gray-600 hover:text-sky-600 whitespace-nowrap"
          >
            Retos
          </button>
          <button
            onClick={() => navigate(`/teacher/dashboard/course/${courseId}/modulos/chatia`)}
            className="py-3 px-2 text-sm font-semibold rounded-t-md text-gray-600 hover:text-sky-600 whitespace-nowrap"
          >
            ChatIA
          </button>
          <button
            onClick={() => navigate(`/teacher/dashboard/course/${courseId}/modulos/informacion`)}
            className="py-3 px-2 text-sm font-semibold rounded-t-md text-gray-600 hover:text-sky-600 whitespace-nowrap"
          >
            Informacion
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TeacherCourseOverviewPage;
