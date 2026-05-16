import React, { useEffect, useMemo, useState } from 'react';
import { useParams, NavLink, Outlet, useMatch, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BimestreSelect from '../components/atoms/BimestreSelect';
import { useStudentCourses } from '../../../hooks/useCourses';

const tabs = [
  { to: 'modulos', label: 'Modulos', key: 'modulos' },
  { to: 'retos', label: 'Retos', key: 'retos' },
  { to: 'chatia', label: 'ChatIA', key: 'chatia' },
  { to: 'info', label: 'Informacion', key: 'info' },
];

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bimestre, setBimestre] = useState('Todos');
  const [courseChromeHidden, setCourseChromeHidden] = useState(false);
  const { data: courses = [] } = useStudentCourses();

  const isOverview = !!useMatch('/student/dashboard/course/:courseId');
  const activeTab = location.pathname.split('/').filter(Boolean).at(-1);
  const isChatTab = activeTab === 'chatia';
  const showBimestreSelect = activeTab === 'modulos';

  useEffect(() => {
    setCourseChromeHidden(false);
  }, [location.pathname]);

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  return (
    <div className="w-full">
      {isOverview ? (
        <>
          <div className="flex items-center justify-between border-b border-sky-100 bg-white px-3 md:px-4">
            <button
              type="button"
              onClick={() => navigate('/student/dashboard')}
              className="inline-flex h-10 items-center gap-1 text-gray-500 transition-colors hover:text-sky-700"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Volver</span>
            </button>
          </div>
          <div className="bg-white p-4 md:p-6">
            <Outlet context={{ courseId, aulaId: course?.idAula ?? null, bimestre }} />
          </div>
        </>
      ) : (
        <>
          {!courseChromeHidden && (
            <div className="bg-white rounded-t-xl border-b border-sky-100">
              <div className="flex items-center justify-between gap-3 overflow-x-auto px-3 md:px-4">
                <div className="flex min-w-max items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/student/dashboard')}
                    className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-gray-500 transition-colors hover:bg-gray-50 hover:text-sky-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Volver
                  </button>
                  <div className="h-6 w-px bg-gray-200" />
                  <nav className="flex items-center gap-3 md:gap-5" aria-label="Navegacion del curso">
                    {tabs.map((tab) => (
                      <NavLink
                        key={tab.key}
                        to={tab.to}
                        className={({ isActive }) =>
                          `whitespace-nowrap rounded-t-md px-2 py-2.5 text-sm font-semibold ${
                            isActive
                              ? 'border-b-4 border-sky-300 text-sky-700'
                              : 'text-gray-600 hover:text-sky-600'
                          }`
                        }
                      >
                        {tab.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
                {showBimestreSelect && (
                  <BimestreSelect
                    value={bimestre}
                    onChange={(e) => setBimestre(e.target.value)}
                    className="shrink-0 text-sm text-gray-500"
                  />
                )}
              </div>
            </div>
          )}

          <div className={`min-w-0 bg-gradient-to-b from-white to-gray-50 shadow-sm ${courseChromeHidden ? 'rounded-none' : 'rounded-b-xl'} ${isChatTab ? 'p-0' : 'p-0 md:p-0'}`}>
            <Outlet context={{ courseId, aulaId: course?.idAula ?? null, bimestre, course, setCourseChromeHidden }} />
          </div>
        </>
      )}
    </div>
  );
};

export default CoursePage;
