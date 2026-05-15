import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, CheckCircle2, ChevronRight, Info, Layers, Users } from 'lucide-react';
import {
  buildCourseInfoStats,
  courseInfoAiRecommendations,
  courseInfoEvaluationCriteria,
  courseInfoObjectives,
} from '../../mocks';

const MiniStat = ({ label, value, caption }) => (
  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
    <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
    <p className="mt-1 text-xl font-bold text-gray-800">{value}</p>
    <p className="mt-1 text-xs text-gray-500">{caption}</p>
  </div>
);

const TeacherCourseInfoPanel = ({ course }) => {
  const navigate = useNavigate();
  const stats = buildCourseInfoStats(course);
  const aulaLabel = course?.grado && course?.seccion ? `${course.grado} - ${course.seccion}` : 'Sin aula asignada';
  const aulaQuery = course?.idAula ? `?aula=${course.idAula}` : '';
  const coursePath = `/teacher/dashboard/course/${course?.id}/modulos`;

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              <Info className="h-3.5 w-3.5" />
              Informacion general
            </div>
            <h2 className="mt-3 text-2xl font-bold text-gray-800">{course?.title || 'Curso seleccionado'}</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {course?.description || 'Resumen docente del curso, su aula asignada y los puntos clave para planificar el periodo.'}
            </p>
          </div>

          <div className="grid min-w-[220px] grid-cols-2 gap-2 text-sm lg:grid-cols-1">
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-400">Aula</p>
              <p className="font-semibold text-gray-800">{aulaLabel}</p>
            </div>
            <div className="rounded-lg bg-gray-50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-400">Codigo</p>
              <p className="font-semibold text-gray-800">{course?.id ? `CUR-${course.id}` : 'Sin codigo'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MiniStat {...stats[0]} />
        <MiniStat {...stats[1]} />
        <MiniStat {...stats[3]} />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-gray-800">Plan academico</h3>
          <p className="mt-1 text-sm text-gray-500">Una guia breve para mantener el curso ordenado.</p>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">Objetivos</h4>
              <ul className="mt-3 space-y-2">
                {courseInfoObjectives.map((objective) => (
                  <li key={objective} className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700">Evaluacion</h4>
              <div className="mt-3 space-y-2">
                {courseInfoEvaluationCriteria.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-bold text-sky-700">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-sky-100 bg-sky-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Bot className="h-4 w-4 text-sky-600" />
              Sugerencia IA
            </div>
            <div className="mt-3 space-y-2">
              {courseInfoAiRecommendations.map((item) => (
                <p key={item} className="rounded-lg bg-white px-3 py-2 text-sm text-gray-600 shadow-sm">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">Continuar trabajo</h3>
            <div className="mt-3 space-y-2">
              <button
                onClick={() => navigate(`${coursePath}${aulaQuery}`)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="inline-flex items-center gap-2"><Layers className="h-4 w-4" /> Modulos</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigate(`${coursePath}/estudiantes${aulaQuery}`)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Estudiantes</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default TeacherCourseInfoPanel;
