import React from 'react';
import { AlertCircle } from 'lucide-react';
import ScoreRing from '../../atoms/students/ScoreRing';

const QuizDetailSidebar = ({ score, correct, total, feedback }) => {
  const missed = total - correct;

  return (
    <aside className="space-y-5 lg:sticky lg:top-4 self-start">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <ScoreRing score={score} />
        <div className="mt-5 text-center text-lg font-semibold text-gray-800">
          {correct} de {total} correctas
        </div>
        <div className="mt-1 text-center text-sm text-gray-500">
          {missed} {missed === 1 ? 'error detectado' : 'errores detectados'}
        </div>
      </div>

      <div className="rounded-xl border border-sky-200 bg-sky-50 p-5 text-sm text-gray-700 leading-relaxed">
        {feedback}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
          <AlertCircle className="w-4 h-4" />
          Acciones sugeridas
        </div>
        <ul className="mt-3 space-y-2 text-sm text-gray-700">
          <li>Revisar las preguntas incorrectas en clase.</li>
          <li>Asignar un recurso corto de refuerzo.</li>
          <li>Programar un nuevo intento si el puntaje es menor a 70%.</li>
        </ul>
      </div>
    </aside>
  );
};

export default QuizDetailSidebar;
