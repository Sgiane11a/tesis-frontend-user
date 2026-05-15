import React, { useEffect, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import StudentReportView from './StudentReportView';
import QuizDetailView from './QuizDetailView';

const StudentReportModal = ({ student, course, onClose }) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    setSelectedQuiz(null);
  }, [student?.id]);

  if (!student) return null;

  const handleClose = () => {
    setSelectedQuiz(null);
    onClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-gray-900/40 px-4 py-6 flex items-center justify-center"
      onMouseDown={handleBackdropClick}
    >
      <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-200">
        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={selectedQuiz ? () => setSelectedQuiz(null) : handleClose}
              className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label={selectedQuiz ? 'Volver al informe' : 'Volver a estudiantes'}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              {selectedQuiz ? (
                <>
                  <p className="text-sm font-medium text-gray-500">Detalle del quiz</p>
                  <h2 className="text-2xl font-semibold text-gray-700">Vista de los resultados</h2>
                  <p className="mt-1 text-sm text-gray-400">{selectedQuiz.title} - {student.name}</p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-500">Informe del estudiante</p>
                  <h2 className="text-2xl font-semibold text-gray-700">{student.name}</h2>
                  <p className="mt-1 text-sm text-gray-400">{student.email}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!selectedQuiz && (
              <button
                type="button"
                className="rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-sky-50"
              >
                Ver Analisis
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              aria-label="Cerrar informe"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[calc(90vh-90px)] overflow-y-auto px-6 py-6">
          {selectedQuiz ? (
            <QuizDetailView quiz={selectedQuiz} course={course} />
          ) : (
            <StudentReportView student={student} course={course} onViewQuiz={setSelectedQuiz} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReportModal;
