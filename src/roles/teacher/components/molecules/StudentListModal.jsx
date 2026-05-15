import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, User, X } from 'lucide-react';
import { Text } from '../atoms';
import { mockStudents } from '../../mocks/studentList.mock';
import { StudentDetailMetrics, StudentListRow } from './student-list-modal';

const StudentListModal = ({ isOpen, onClose, courseTitle, studentCount = 0 }) => {
  const students = mockStudents;
  const [selectedStudent, setSelectedStudent] = useState(students[0] || null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredStudents = students.filter((student) =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    || student.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative w-[92vw] min-w-[980px] max-w-[1120px] h-[84vh] bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-primary to-slate-900 text-white">
          <div className="flex flex-col gap-3 items-start md:flex-row md:items-center md:justify-between">
            <div>
              <Text weight="bold" size="2xl" className="text-white tracking-tight">
                Alumnos del Curso
              </Text>
              <Text size="sm" className="text-white/75">
                {courseTitle} - {studentCount} alumnos
              </Text>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Cerrar lista de alumnos"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar alumno por nombre o correo..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-row overflow-hidden bg-slate-50">
          <div className="w-2/5 border-r border-slate-200 overflow-y-auto bg-white">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center">
                <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <Text color="muted">No se encontraron alumnos</Text>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <StudentListRow
                  key={student.id}
                  student={student}
                  onClick={setSelectedStudent}
                  isSelected={selectedStudent?.id === student.id}
                />
              ))
            )}
          </div>

          <div className="w-3/5 overflow-y-auto bg-slate-50 p-5">
            {selectedStudent ? (
              <StudentDetailMetrics student={selectedStudent} />
            ) : (
              <div className="h-full flex flex-col justify-center items-center p-8 text-center">
                <Text weight="semibold" size="lg" className="mb-2">Selecciona un alumno para ver su rendimiento</Text>
                <Text size="sm" color="muted">Haz click en cualquier alumno del listado para abrir sus metricas detalladas.</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export { StudentListModal };
