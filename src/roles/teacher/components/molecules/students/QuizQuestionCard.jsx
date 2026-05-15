import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const QuizQuestionCard = ({ question, index }) => {
  const isCorrect = question.selectedIndex === question.correctIndex;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-medium text-gray-800">
          Pregunta {index + 1}: {question.prompt}
        </h4>
        {isCorrect ? (
          <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-500" />
        ) : (
          <XCircle className="w-6 h-6 shrink-0 text-rose-500" />
        )}
      </div>

      <div className="mt-4 space-y-2">
        {question.options.map((option, optionIndex) => {
          const selected = optionIndex === question.selectedIndex;
          const correct = optionIndex === question.correctIndex;
          const tone = correct
            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
            : selected
              ? 'border-rose-300 bg-rose-50 text-rose-800'
              : 'border-gray-300 bg-white text-gray-700';

          return (
            <div key={option} className={`rounded border px-4 py-2 text-sm ${tone}`}>
              {String.fromCharCode(65 + optionIndex)}. {option}
              {selected && !correct ? <span className="ml-2 text-xs font-semibold">(respuesta del estudiante)</span> : null}
              {correct ? <span className="ml-2 text-xs font-semibold">(correcta)</span> : null}
            </div>
          );
        })}
      </div>

      {!isCorrect && (
        <div className="mt-4 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          Error detectado: eligio una alternativa que no estaba sustentada por el material del quiz.
        </div>
      )}

      <div className="mt-4 rounded-lg border border-violet-100 bg-violet-50 px-4 py-3 text-sm text-gray-700">
        <span className="font-semibold">Explicacion:</span> {question.explanation}
      </div>
    </article>
  );
};

export default QuizQuestionCard;
