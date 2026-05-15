import React, { useMemo, useState } from 'react';
import { BarChart3, Search } from 'lucide-react';
import { teacherReports, teacherReportSummary } from '../mocks';
import { ReportCourseCard, ReportDetailView, ReportSummaryStats } from '../components/reports';

const TeacherReportsPage = () => {
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [query, setQuery] = useState('');

  const selectedReport = teacherReports.find((report) => report.id === selectedReportId);
  const filteredReports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return teacherReports;

    return teacherReports.filter((report) => (
      report.course.toLowerCase().includes(normalizedQuery)
      || report.classroom.toLowerCase().includes(normalizedQuery)
    ));
  }, [query]);

  const summaryStats = [
    { label: 'Cursos', value: teacherReportSummary.totalCourses, icon: 'courses', tone: 'bg-sky-50 text-sky-600' },
    { label: 'Promedio global', value: teacherReportSummary.averageScore, icon: 'average', tone: 'bg-violet-50 text-violet-600' },
    { label: 'Participacion', value: `${teacherReportSummary.participation}%`, icon: 'students', tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'En riesgo', value: teacherReportSummary.lowPerformance, icon: 'risk', tone: 'bg-red-50 text-red-600' },
  ];

  if (selectedReport) {
    return <ReportDetailView report={selectedReport} onBack={() => setSelectedReportId(null)} />;
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-gray-900">Informes generales</h1>
          <p className="mt-1 text-sm text-gray-500">
            Consulta estadisticas generales por curso y abre cada informe para revisar su resumen.
          </p>
          </div>
        </div>

        <label className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar curso o aula..."
            className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
        </label>
      </div>

      <ReportSummaryStats items={summaryStats} />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Cursos disponibles</h2>
          <span className="text-sm text-gray-500">{filteredReports.length} informes</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredReports.map((report) => (
            <ReportCourseCard key={report.id} report={report} onOpen={setSelectedReportId} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherReportsPage;
