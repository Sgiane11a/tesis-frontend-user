import React from 'react';
import StudentAvatar from '../../atoms/students/StudentAvatar';
import StudentStatusBadge from '../../atoms/students/StudentStatusBadge';
import { averageClassName } from '../../../utils/studentPerformance';

const StudentsTable = ({ students, loading, error, onViewStudent }) => (
  <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[840px] text-sm">
        <thead>
          <tr className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
            <th className="w-16 px-6 py-4 text-left"></th>
            <th className="px-4 py-4 text-left">Nombre</th>
            <th className="px-4 py-4 text-center">Progreso</th>
            <th className="px-4 py-4 text-center">Promedio</th>
            <th className="px-4 py-4 text-center">Estado</th>
            <th className="px-4 py-4 text-center">Ultima Actividad</th>
            <th className="w-20 px-6 py-4 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {loading && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                Cargando estudiantes...
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-sm text-red-500">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && students.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                No se encontraron estudiantes.
              </td>
            </tr>
          )}

          {!loading && !error && students.map((student) => (
            <tr key={student.id} className="hover:bg-sky-50/40 transition-colors">
              <td className="px-6 py-3">
                <StudentAvatar />
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-gray-700">{student.name}</div>
                <div className="text-xs text-gray-400">{student.email}</div>
              </td>
              <td className="px-4 py-3 text-center font-bold text-gray-500">{student.progress}%</td>
              <td className={`px-4 py-3 text-center font-bold text-base ${averageClassName(student.average)}`}>
                {student.average}
              </td>
              <td className="px-4 py-3 text-center">
                <StudentStatusBadge status={student.status} />
              </td>
              <td className="px-4 py-3 text-center text-gray-500">{student.lastActivity}</td>
              <td className="px-6 py-3 text-center">
                <button
                  type="button"
                  onClick={() => onViewStudent(student)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StudentsTable;
