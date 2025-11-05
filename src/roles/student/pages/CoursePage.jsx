import React, { useState } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import HeaderCourse from '../components/organisms/curso/HeaderCourse';
import BimestreSelect from '../components/atoms/BimestreSelect';

const CoursePage = () => {
  const { courseId } = useParams();
  const [bimestre, setBimestre] = useState('Bimestre - I');

  return (
    <div className=" max-w-7xl mx-auto">
      <div id="course-header" className="mb-6">
        <HeaderCourse courseNumber={courseId} courseTitle="Historia del Perú · 1er Año" />
      </div>

      {/* Mini navegación de pestañas basada en rutas (NavLink) */}
      <div className="bg-white rounded-t-md border-b">
        <div className="flex items-center justify-between px-6">
          <nav className="flex items-center gap-6" aria-label="Navegación del curso">
            <NavLink to="modulos" className={({ isActive }) => `py-3 px-2 text-sm rounded-t-md ${isActive ? 'text-sky-700 border-b-4 border-sky-300' : 'text-gray-600 hover:text-sky-600'}`}>
              Módulos
            </NavLink>
            <NavLink to="retos" className={({ isActive }) => `py-3 px-2 text-sm rounded-t-md ${isActive ? 'text-sky-700 border-b-4 border-sky-300' : 'text-gray-600 hover:text-sky-600'}`}>
              Retos
            </NavLink>
            <NavLink to="chatia" className={({ isActive }) => `py-3 px-2 text-sm rounded-t-md ${isActive ? 'text-sky-700 border-b-4 border-sky-300' : 'text-gray-600 hover:text-sky-600'}`}>
              ChatIA
            </NavLink>
            <NavLink to="info" className={({ isActive }) => `py-3 px-2 text-sm rounded-t-md ${isActive ? 'text-sky-700 border-b-4 border-sky-300' : 'text-gray-600 hover:text-sky-600'}`}>
              Información
            </NavLink>
          </nav>
          <div className="py-3">
            <BimestreSelect value={bimestre} onChange={(e) => setBimestre(e.target.value)} className="text-sm text-gray-500" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-b-md shadow-sm">
        {/* Contenido renderizado por rutas hijas */}
        <Outlet />
      </div>
    </div>
  );
};

export default CoursePage;
