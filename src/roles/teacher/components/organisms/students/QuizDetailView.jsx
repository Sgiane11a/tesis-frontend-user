import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import QuizQuestionCard from '../../molecules/students/QuizQuestionCard';
import QuizDetailSidebar from '../../molecules/students/QuizDetailSidebar';
import { buildQuizDetail } from '../../../mocks/studentPerformance.mock';

const QuizDetailView = ({ quiz, course }) => {
  const detail = buildQuizDetail(quiz, course);
  const feedback = detail.score >= 75
    ? 'El estudiante mostro un desempeno solido. Sus respuestas reflejan comprension del tema y precision en la mayoria de preguntas.'
    : detail.score >= 45
      ? 'El estudiante esta en proceso. Conviene reforzar los puntos donde confundio evidencia, causa y conclusion.'
      : 'El estudiante requiere acompanamiento cercano. Hay errores recurrentes que sugieren revisar el material base antes de un nuevo intento.';

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-sky-50">
          <ArrowDownToLine className="w-4 h-4" />
          Descargar detalle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          {detail.questions.map((question, index) => (
            <QuizQuestionCard key={question.prompt} question={question} index={index} />
          ))}
        </div>

        <QuizDetailSidebar
          score={quiz.score}
          correct={detail.correct}
          total={detail.total}
          feedback={feedback}
        />
      </div>
    </div>
  );
};

export default QuizDetailView;
