import React from 'react';
import { Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Card, Text } from '../atoms';

// eslint-disable-next-line no-unused-vars
const InfoRow = ({ icon: Icon, label, value, valueColor = 'text-primary' }) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-primary-light/60 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <Text size="sm" weight="medium" color="secondary">{label}</Text>
    </div>
    <Text size="lg" weight="bold" className={valueColor}>{value}</Text>
  </div>
);

const CourseInfoPanel = ({ studentCount = 0, averageScore = 0, completedPercent = 0 }) => {
  return (
    <Card hover={false} className="p-5">
      {/* Título */}
      <div className="pb-3 mb-1 border-b border-gray-100">
        <Text size="sm" weight="bold" className="text-center text-gray-700">
          Información General
        </Text>
      </div>

      {/* Filas de datos */}
      <div className="divide-y divide-gray-50">
        <InfoRow
          icon={Users}
          label="Estudiantes"
          value={studentCount}
          valueColor="text-primary"
        />
        <InfoRow
          icon={TrendingUp}
          label="Promedio"
          value={averageScore}
          valueColor="text-emerald-600"
        />
        <InfoRow
          icon={CheckCircle}
          label="Completado"
          value={`${completedPercent}%`}
          valueColor="text-amber-600"
        />
      </div>
    </Card>
  );
};

export { CourseInfoPanel };
