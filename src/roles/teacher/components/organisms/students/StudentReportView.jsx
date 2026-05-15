import React from 'react';
import { ArrowDownToLine, BarChart3, Lightbulb, TrendingUp } from 'lucide-react';
import StudentMetricCard from '../../molecules/students/StudentMetricCard';
import QuizHistoryItem from '../../molecules/students/QuizHistoryItem';
import StudentReportSidebar from '../../molecules/students/StudentReportSidebar';
import { buildStudentQuizHistory, buildStudentRecommendations } from '../../../mocks/studentPerformance.mock';

const StudentReportView = ({ student, course, onViewQuiz }) => {
  const quizzes = buildStudentQuizHistory(student, course);
  const participation = Math.min(99, Math.max(40, student.progress + 8));
  const recommendations = buildStudentRecommendations(student);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StudentMetricCard
            icon={TrendingUp}
            label="Promedio"
            value={student.average}
            className="border-violet-300 bg-violet-50 text-violet-700"
            iconClassName="text-violet-700"
          />
          <StudentMetricCard
            icon={Lightbulb}
            label="Participacion"
            value={`${participation}%`}
            className="border-yellow-300 bg-yellow-50 text-yellow-700"
            iconClassName="text-yellow-700"
          />
          <StudentMetricCard
            icon={BarChart3}
            label="Progreso"
            value={`${student.progress}%`}
            className="border-sky-200 bg-sky-50 text-sky-700"
            iconClassName="text-sky-700"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-xl font-semibold text-gray-700">Historial de quizzes creados</h3>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-red-100">
              <ArrowDownToLine className="w-5 h-5" />
              Descargar PDF
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-emerald-100">
              <ArrowDownToLine className="w-5 h-5" />
              Descargar Excel
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <QuizHistoryItem key={quiz.id} quiz={quiz} onView={onViewQuiz} />
          ))}
        </div>
      </div>

      <StudentReportSidebar student={student} course={course} recommendations={recommendations} />
    </div>
  );
};

export default StudentReportView;
