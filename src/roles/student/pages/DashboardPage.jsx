import React from 'react';
import { CourseGrid } from '../components/organisms/CourseGrid';

const DashboardPage = () => {
  return (
    <div>
      {/* Podrías agregar un título aquí si quieres, ej: <h1 className="text-2xl font-bold">Mis Cursos</h1> */}
      <CourseGrid />
    </div>
  );
};

export default DashboardPage;
export {};