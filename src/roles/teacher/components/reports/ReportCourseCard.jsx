import React from 'react';
import { ArrowRight, UsersRound } from 'lucide-react';
import ProgressDonut from './ProgressDonut';

const ReportCourseCard = ({ report, onOpen }) => (
  <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{report.course}</h2>
        <p className="mt-1 text-sm text-gray-500">{report.classroom}</p>
      </div>
      <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">General</span>
    </div>

    <div className="my-5 flex justify-center">
      <ProgressDonut value={report.progress} />
    </div>

    <div className="grid grid-cols-3 gap-2 text-center">
      <div className="rounded-lg bg-gray-50 px-2 py-2">
        <div className="text-sm font-semibold text-gray-900">{report.average}</div>
        <div className="text-[11px] text-gray-500">Promedio</div>
      </div>
      <div className="rounded-lg bg-gray-50 px-2 py-2">
        <div className="text-sm font-semibold text-gray-900">{report.participation}%</div>
        <div className="text-[11px] text-gray-500">Particip.</div>
      </div>
      <div className="rounded-lg bg-gray-50 px-2 py-2">
        <div className="text-sm font-semibold text-gray-900">{report.lowPerformance}</div>
        <div className="text-[11px] text-gray-500">Riesgo</div>
      </div>
    </div>

    <button
      type="button"
      onClick={() => onOpen(report.id)}
      className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-700"
    >
      <UsersRound className="h-4 w-4" />
      Ver estadisticas
      <ArrowRight className="h-4 w-4" />
    </button>
  </article>
);

export default ReportCourseCard;
