import React from 'react';
import { CourseGrid } from '../components/organisms/CourseGrid';
import { MotivationPanel } from '../components/organisms/MotivationPanel';

const DashboardPage = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Panel de motivación (horizontal en móvil, lateral en desktop) */}
      <div className="mb-6 xl:hidden">
        <MotivationPanel horizontal />
      </div>

      <div className="flex gap-8">
        {/* Contenido principal - Grid de cursos */}
        <div className="flex-1 min-w-0">
          <CourseGrid />
        </div>

        {/* Panel lateral derecho - Motivación (solo desktop) */}
        <aside className="hidden xl:block w-[280px] shrink-0">
          <div className="sticky top-24">
            <MotivationPanel />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;
export {};