import React from 'react';
import { CourseGrid } from '../components/organisms/CourseGrid';
import { SummaryPanel } from '../components/organisms/SummaryPanel';

const TeacherDashboardPage = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Resumen (horizontal en móvil, lateral en desktop) */}
      <div className="mb-6 xl:hidden">
        <SummaryPanel horizontal />
      </div>

      <div className="flex gap-8">
        {/* Contenido principal - Grid de cursos */}
        <div className="flex-1 min-w-0">
          <CourseGrid />
        </div>

        {/* Panel lateral derecho - Resumen (solo desktop) */}
        <aside className="hidden xl:block w-[280px] shrink-0">
          <div className="sticky top-24">
            <SummaryPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
