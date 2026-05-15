import React from 'react';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

const InfoRow = ({ label, value }) => (
  <div>
    <dt className="text-xs font-semibold uppercase text-gray-400">{label}</dt>
    <dd className="mt-1 text-sm text-gray-700">{value || 'Sin registrar'}</dd>
  </div>
);

const TeacherCourseInfoPanel = ({ course }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">Informacion del curso</h2>
            <p className="text-sm text-gray-500">Datos visibles para la gestion docente.</p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoRow label="Curso" value={course?.title} />
          <InfoRow label="Aula" value={course?.grado && course?.seccion ? `${course.grado} - ${course.seccion}` : null} />
          <InfoRow label="Descripcion" value={course?.description} />
          <InfoRow label="Codigo interno" value={course?.id ? `CUR-${course.id}` : null} />
        </dl>
      </section>

      <aside className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Resumen</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <Users className="w-5 h-5 text-sky-600" />
            <div>
              <div className="text-lg font-semibold text-gray-800">{course?.studentCount ?? 0}</div>
              <div className="text-xs text-gray-500">estudiantes</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-gray-100 p-3">
            <GraduationCap className="w-5 h-5 text-sky-600" />
            <div>
              <div className="text-lg font-semibold text-gray-800">{course?.idAula || '-'}</div>
              <div className="text-xs text-gray-500">id de aula</div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TeacherCourseInfoPanel;
