import React from 'react';
import StudentStatusBadge from '../../atoms/students/StudentStatusBadge';

const QuizHistoryItem = ({ quiz, onView }) => (
  <div className="rounded-lg border border-gray-300 bg-white px-5 py-4 shadow-sm">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_70px_90px] md:items-center gap-3">
      <div>
        <div className="font-medium text-gray-700">{quiz.title}</div>
        <div className="mt-2 text-sm text-gray-400">{quiz.date}</div>
      </div>
      <StudentStatusBadge
        status={quiz.status}
        label={quiz.status === 'good' ? 'Buen Nivel' : quiz.status === 'follow' ? 'Proceso' : 'Urgente'}
      />
      <span className={`text-lg font-bold text-center ${quiz.score >= 75 ? 'text-emerald-600' : quiz.score >= 45 ? 'text-orange-500' : 'text-rose-500'}`}>
        {quiz.score}%
      </span>
      <button
        type="button"
        onClick={() => onView(quiz)}
        className="rounded-lg border border-sky-200 bg-white px-4 py-1.5 text-sm text-gray-700 hover:bg-sky-50"
      >
        ver
      </button>
    </div>
  </div>
);

export default QuizHistoryItem;
