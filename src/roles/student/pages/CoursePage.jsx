import React, { useMemo, useState } from 'react';
import { useParams, NavLink, Outlet, useMatch, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BimestreSelect from '../components/atoms/BimestreSelect';
import { useStudentCourses } from '../../../hooks/useCourses';

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [bimestre, setBimestre] = useState('Bimestre - I');
  const { data: courses = [] } = useStudentCourses();

  const isOverview = !!useMatch('/student/dashboard/course/:courseId');

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  const courseTitle = course?.title || `Curso ${courseId}`;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => navigate('/student/dashboard')}
          className="inline-flex items-center gap-1 text-gray-500 hover:text-sky-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>
        {!isOverview && (
          <BimestreSelect
            value={bimestre}
            onChange={(e) => setBimestre(e.target.value)}
            className="text-sm text-gray-500"
          />
        )}
      </div>

      {isOverview ? (
        <div className="bg-white border border-sky-100 rounded-xl p-4 md:p-6">
          <Outlet />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-t-md border-b border-sky-100">
            <div className="flex items-center justify-between px-4 md:px-6">
              <nav className="flex items-center gap-4 md:gap-6" aria-label="Navegacion del curso">
                <NavLink
                  to="modulos"
                  className={({ isActive }) =>
                    `py-3 px-2 text-sm font-semibold rounded-t-md ${
                      isActive
                        ? 'text-sky-700 border-b-4 border-sky-300'
                        : 'text-gray-600 hover:text-sky-600'
                    }`
                  }
                >
                  Modulos
                </NavLink>
                <NavLink
                  to="retos"
                  className={({ isActive }) =>
                    `py-3 px-2 text-sm font-semibold rounded-t-md ${
                      isActive
                        ? 'text-sky-700 border-b-4 border-sky-300'
                        : 'text-gray-600 hover:text-sky-600'
                    }`
                  }
                >
                  Retos
                </NavLink>
                <NavLink
                  to="chatia"
                  className={({ isActive }) =>
                    `py-3 px-2 text-sm font-semibold rounded-t-md ${
                      isActive
                        ? 'text-sky-700 border-b-4 border-sky-300'
                        : 'text-gray-600 hover:text-sky-600'
                    }`
                  }
                >
                  ChatIA
                </NavLink>
                <NavLink
                  to="info"
                  className={({ isActive }) =>
                    `py-3 px-2 text-sm font-semibold rounded-t-md ${
                      isActive
                        ? 'text-sky-700 border-b-4 border-sky-300'
                        : 'text-gray-600 hover:text-sky-600'
                    }`
                  }
                >
                  Informacion
                </NavLink>
              </nav>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-b-md shadow-sm">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700 mb-5">{courseTitle}</h1>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePage;
