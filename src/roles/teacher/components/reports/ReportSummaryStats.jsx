import React from 'react';
import { AlertCircle, BarChart3, BookOpenCheck, UsersRound } from 'lucide-react';

const iconMap = {
  courses: BookOpenCheck,
  students: UsersRound,
  average: BarChart3,
  risk: AlertCircle,
};

const ReportSummaryStats = ({ items }) => (
  <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
    {items.map((item) => {
      const Icon = iconMap[item.icon] || BarChart3;

      return (
        <article key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-medium text-gray-500">{item.label}</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">{item.value}</div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.tone}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </article>
      );
    })}
  </section>
);

export default ReportSummaryStats;
