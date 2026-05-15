import React, { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Bot, BookOpen, ChevronRight, ClipboardList, Info, Layers, Users } from 'lucide-react';
import { useTeacherCourses } from '../../../hooks/useCourses';
import {
  buildCourseInfoStats,
  courseInfoFallbackImage,
  courseInfoObjectives,
} from '../mocks';

const TeacherCourseOverviewPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const { data: courses = [] } = useTeacherCourses();
  const aulaFromQuery = searchParams.get('aula');

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId) && (!aulaFromQuery || String(item.idAula) === String(aulaFromQuery))),
    [courses, courseId, aulaFromQuery]
  );

  const title = course?.title || 'Curso seleccionado';
  const description = course?.description || 'Revisa los modulos, estudiantes, analisis y recursos del curso desde esta vista docente.';
  const aulaQuery = aulaFromQuery ? `?aula=${aulaFromQuery}` : '';
  const basePath = `/teacher/dashboard/course/${courseId}/modulos`;
  const stats = buildCourseInfoStats(course);

  const shortcuts = [
    { label: 'Modulos', icon: Layers, path: `${basePath}${aulaQuery}`, primary: true },
    { label: 'Estudiantes', icon: Users, path: `${basePath}/estudiantes${aulaQuery}` },
    { label: 'ChatIA', icon: Bot, path: `${basePath}/chatia${aulaQuery}` },
    { label: 'Informacion', icon: Info, path: `${basePath}/informacion${aulaQuery}` },
  ];

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="relative min-h-[320px]">
          <img
            src={course?.imageUrl || courseInfoFallbackImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/85 via-gray-950/45 to-gray-950/10" />
          <div className="relative z-10 flex min-h-[320px] max-w-3xl flex-col justify-end p-6 text-white md:p-8">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <BookOpen className="h-3.5 w-3.5" />
              Vista docente del curso
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-100 md:text-base">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(`${basePath}${aulaQuery}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Entrar a modulos
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate(`${basePath}/informacion${aulaQuery}`)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Ver informacion completa
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 p-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-gray-400">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-gray-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.caption}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">Enfoque del curso</h2>
              <p className="text-sm text-gray-500">Una vista rapida antes de trabajar en las pestañas internas.</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {courseInfoObjectives.slice(0, 4).map((objective) => (
              <div key={objective} className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {objective}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800">Accesos del curso</h3>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center justify-between rounded-lg border px-3 py-3 text-left text-sm font-semibold ${
                    item.primary
                      ? 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TeacherCourseOverviewPage;