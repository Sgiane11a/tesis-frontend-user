import React from 'react';
import { statusStyles } from '../../../utils/studentPerformance';

const StudentReportSidebar = ({ student, course, recommendations }) => (
  <aside className="space-y-4">
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
      <h3 className="text-sm font-semibold text-gray-800">Resumen rapido</h3>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-gray-500">Estado</dt>
          <dd className="font-semibold text-gray-700">{statusStyles[student.status]?.label}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-gray-500">Ultima actividad</dt>
          <dd className="font-semibold text-gray-700">{student.lastActivity}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-gray-500">Curso</dt>
          <dd className="font-semibold text-gray-700 text-right">{course?.title || '-'}</dd>
        </div>
      </dl>
    </div>

    <div className="rounded-lg border border-sky-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-gray-800">Sugerencias docentes</h3>
      <ul className="mt-4 space-y-3">
        {recommendations.map((item) => (
          <li key={item} className="rounded-lg bg-sky-50 px-3 py-2 text-sm text-gray-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

export default StudentReportSidebar;
