import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TeacherMainLayout } from './layouts/TeacherMainLayout';
import TeacherDashboardPage from './pages/TeacherDashboardPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseModulesPage from './pages/CourseModulesPage';
import CourseSectionPage from './pages/CourseSectionPage';

export function TeacherRoutes() {
  return (
    <TeacherMainLayout>
      <Routes>
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        {/* Detalle del curso (overview) */}
        <Route path="dashboard/course/:courseId" element={<CourseDetailPage />} />
        {/* Secciones del curso */}
        <Route path="dashboard/course/:courseId/modulos" element={<CourseModulesPage />} />
        <Route path="dashboard/course/:courseId/estudiantes" element={<CourseSectionPage section="estudiantes" />} />
        <Route path="dashboard/course/:courseId/chatia" element={<CourseSectionPage section="chatia" />} />
        <Route path="dashboard/course/:courseId/informacion" element={<CourseSectionPage section="informacion" />} />
        {/* Futuras rutas del profesor */}
        <Route path="ia" element={<PlaceholderPage title="IA General" />} />
        <Route path="informes" element={<PlaceholderPage title="Informes" />} />
        <Route path="perfil" element={<PlaceholderPage title="Perfil" />} />
      </Routes>
    </TeacherMainLayout>
  );
}

/** Página placeholder temporal para rutas en construcción */
function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-400 mt-2">Esta sección está en construcción.</p>
    </div>
  );
}
