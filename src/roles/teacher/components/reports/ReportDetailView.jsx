import React from 'react';
import { ArrowLeft, Download, Sparkles } from 'lucide-react';
import ReportSummaryStats from './ReportSummaryStats';
import TrendChart from './TrendChart';

const ReportDetailView = ({ report, onBack }) => {
  const stats = [
    { label: 'Alumnos', value: report.students, icon: 'students', tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'Bajo nivel', value: report.lowPerformance, icon: 'risk', tone: 'bg-red-50 text-red-600' },
    { label: 'Promedio', value: report.average, icon: 'average', tone: 'bg-violet-50 text-violet-600' },
    { label: 'Participacion', value: `${report.participation}%`, icon: 'courses', tone: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onBack}
            className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Volver a informes"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Informe general - {report.course}</h1>
            <p className="mt-1 text-sm text-gray-500">{report.classroom} · Estadisticas generales del curso.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            <Download className="h-4 w-4" />
            Excel
          </button>
          <button type="button" className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 hover:bg-red-50">
            <Download className="h-4 w-4" />
            PDF
          </button>
        </div>
      </div>

      <ReportSummaryStats items={stats} />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <TrendChart values={report.trend} />

          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900">Alumnos en seguimiento</h2>
            <div className="mt-3 space-y-2">
              {report.lowStudents.map((student) => (
                <div key={student.name} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                  <span className="text-sm font-medium text-gray-700">{student.name}</span>
                  <span className="text-sm font-semibold text-red-600">{student.score}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="rounded-xl border border-sky-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-sky-600" />
            <h2 className="text-lg font-semibold text-gray-900">Analisis IA</h2>
          </div>
          <p className="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm leading-relaxed text-gray-700">
            {report.analysis}
          </p>
        </aside>
      </div>
    </div>
  );
};

export default ReportDetailView;
