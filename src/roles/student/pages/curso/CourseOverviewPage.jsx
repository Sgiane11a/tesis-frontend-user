import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStudentCourses } from '../../../../hooks/useCourses';

const COURSE_BANNER =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80';

const defaultObjectives = [
  'Conocer los aspectos que caracterizan el desarrollo historico del Peru y su impacto en la nacion.',
  'Identificar las etapas principales de la historia del Peru desde culturas precolombinas hasta la Republica.',
  'Investigar fuentes historicas y herramientas de analisis para comprender cambios sociales y economicos.',
  'Elaborar e interpretar trabajos que promuevan la valoracion del patrimonio cultural peruano.',
];

const CourseOverviewPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: courses = [] } = useStudentCourses();

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  const title = course?.title || 'Historia del Peru - Primer Ano';
  const description =
    course?.description ||
    'Bienvenido al curso. En esta seccion podras revisar modulos, retos, chat con IA e informacion general del curso.';

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
          {defaultObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <button
          onClick={() => navigate('modulos')}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Modulos
        </button>
        <button
          onClick={() => navigate('retos')}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Retos
        </button>
        <button
          onClick={() => navigate('chatia')}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          ChatIA
        </button>
        <button
          onClick={() => navigate('info')}
          className="h-12 rounded-lg border border-sky-200 bg-sky-50 text-sky-700 font-semibold hover:bg-sky-100 transition-colors"
        >
          Informacion
        </button>
      </div>
    </div>
  );
};

export default CourseOverviewPage;
