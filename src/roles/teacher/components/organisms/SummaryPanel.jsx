import React from 'react';
import { TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';
import { Text } from '../atoms';
import { StatCard } from '../molecules';
import { useTeacherCourses } from '../../../../hooks/useCourses';

const SummaryPanel = ({ horizontal = false }) => {
  const { data: courses = [], isLoading } = useTeacherCourses();

  // Cálculos basados en los datos reales
  const avgProgress = courses.length
    ? Math.round(courses.reduce((acc, c) => acc + (c.progress || 0), 0) / courses.length)
    : 0;
  const avgScore = courses.length
    ? (courses.reduce((acc, c) => acc + (c.averageScore || 0), 0) / courses.length).toFixed(1)
    : 0;
  const lowPerforming = courses.filter((c) => (c.averageScore || 0) < 11).length;

  if (isLoading) {
    return (
      <div className={horizontal ? 'grid grid-cols-3 gap-3' : 'space-y-4'}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-24" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Título */}
      <div className="px-1 mb-4">
        <Text size="xs" color="muted" weight="semibold" className="uppercase tracking-widest">
          Resumen General
        </Text>
      </div>

      {/* Cards - horizontal en móvil, vertical en sidebar */}
      <div className={horizontal ? 'grid grid-cols-1 sm:grid-cols-3 gap-3' : 'space-y-3'}>
        {/* Promedio general */}
        <StatCard
          icon={TrendingUp}
          label="Promedio"
          value={avgProgress}
          color="success"
          trend={avgProgress > 50 ? '↑' : undefined}
        />

        {/* Bajo nivel */}
        <StatCard
          icon={AlertTriangle}
          label="Bajo Nivel"
          value={lowPerforming}
          color="danger"
        />

        {/* Promedio de puntaje */}
        <StatCard
          icon={BarChart3}
          label="Promedio"
          value={avgScore}
          color="info"
        />
      </div>
    </div>
  );
};

export { SummaryPanel };
