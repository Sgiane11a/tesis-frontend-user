import React from 'react';
import { AlertTriangle, CheckCircle2, Sparkles, Target, X } from 'lucide-react';
import { buildStudentAiAnalysis } from '../../../mocks/studentPerformance.mock';

const BarChart = ({ values }) => {
  const max = Math.max(...values, 100);

  return (
    <div className="h-36 border-b border-gray-200 border-l border-gray-100 px-3 pt-4 flex items-end gap-4">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full max-w-6 rounded-t bg-pink-500 shadow-sm"
            style={{ height: `${Math.max(18, (value / max) * 118)}px` }}
          />
          <span className="text-[10px] text-gray-400">Q{index + 1}</span>
        </div>
      ))}
    </div>
  );
};

const AnalysisList = ({ icon: Icon, title, items, tone }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">
    <div className={`flex items-center gap-2 text-sm font-semibold ${tone}`}>
      <Icon className="w-4 h-4" />
      {title}
    </div>
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="text-sm text-gray-600 leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const StudentAnalysisDrawer = ({ student, onClose }) => {
  if (!student) return null;

  const analysis = buildStudentAiAnalysis(student);

  return (
    <div className="absolute inset-y-0 right-0 z-20 flex max-w-full">
      <div className="w-screen max-w-sm bg-white border-l border-gray-200 shadow-2xl flex flex-col">
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              Analisis IA
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="mt-1 text-sm text-gray-500">{student.name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Cerrar analisis IA"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <section>
            <h3 className="text-sm font-semibold text-gray-700">Estadistica</h3>
            <BarChart values={analysis.trend} />
          </section>

          <div className="grid grid-cols-3 gap-2">
            {analysis.insightCards.map((item) => (
              <div key={item.label} className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-3 text-center">
                <div className="text-[11px] font-semibold text-gray-500">{item.label}</div>
                <div className="mt-1 text-sm font-bold text-gray-800">{item.value}</div>
              </div>
            ))}
          </div>

          <section>
            <h3 className="text-sm font-semibold text-gray-700">Comentario IA</h3>
            <div className="mt-3 rounded-lg border border-sky-300 bg-sky-50 px-4 py-4 text-sm leading-relaxed text-gray-700">
              {analysis.comment}
            </div>
          </section>

          <AnalysisList
            icon={CheckCircle2}
            title="Fortalezas detectadas"
            items={analysis.strengths}
            tone="text-emerald-700"
          />

          <AnalysisList
            icon={AlertTriangle}
            title="Puntos de alerta"
            items={analysis.risks}
            tone="text-amber-700"
          />

          <AnalysisList
            icon={Target}
            title="Siguientes acciones"
            items={analysis.actions}
            tone="text-sky-700"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentAnalysisDrawer;
