

import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import BimestreSelect from '../components/atoms/BimestreSelect';
import { useTeacherCourses } from '../../../hooks/useCourses';
import TeacherCourseModulesPanel from '../components/organisms/TeacherCourseModulesPanel';
import TeacherCourseChatPanel from '../components/organisms/TeacherCourseChatPanel';
import TeacherCourseInfoPanel from '../components/organisms/TeacherCourseInfoPanel';
import TeacherCourseStudentsPanel from '../components/organisms/TeacherCourseStudentsPanel';

const tabs = [
  { key: 'modulos', label: 'Módulos' },
  { key: 'estudiantes', label: 'Estudiantes' },
  { key: 'chatia', label: 'ChatIA' },
  { key: 'informacion', label: 'Información' },
];



const TeacherCourseTabsPage = () => {

  const { tab, courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bimestre, setBimestre] = useState('Todos');
  const { data: courses = [] } = useTeacherCourses();
  const aulaFromQuery = searchParams.get('aula');

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId) && (!aulaFromQuery || String(item.idAula) === String(aulaFromQuery))),
    [courses, courseId, aulaFromQuery]
  );

  const courseTitle = course?.title || `Curso ${courseId}`;

  const handleTabClick = (key) => {
    if (key === 'modulos') {
      navigate(`/teacher/dashboard/course/${courseId}/modulos${aulaFromQuery ? `?aula=${aulaFromQuery}` : ''}`);
      return;
    }
    navigate(`/teacher/dashboard/course/${courseId}/modulos/${key}${aulaFromQuery ? `?aula=${aulaFromQuery}` : ''}`);
  };

  const handleBack = () => {
    navigate(`/teacher/dashboard/course/${courseId}${aulaFromQuery ? `?aula=${aulaFromQuery}` : ''}`);
  };

  const bimestreToNumber = (label) => {
    if (String(label).toLowerCase().includes('todos')) return null;
    if (label.includes('II') && !label.includes('III')) return 2;
    if (label.includes('III')) return 3;
    if (label.includes('IV')) return 4;
    return 1;
  };

  const activeTab = tab || 'modulos';
  const panelPaddingClass = activeTab === 'chatia'
    ? 'p-0'
    : activeTab === 'estudiantes'
      ? 'px-4 pt-4 pb-2 md:px-5 md:pt-5 md:pb-2'
      : 'p-4 md:p-5';

  return (
    <div className="w-full min-w-0">
      <div className="bg-white rounded-t-xl border-b border-sky-100">
        <div className="flex items-center justify-between gap-3 px-3 md:px-4 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 hover:text-sky-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <nav className="flex items-center gap-3 md:gap-5" aria-label="Navegacion del curso">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className={`py-2.5 px-2 text-sm font-semibold rounded-t-md whitespace-nowrap ${
                    activeTab === t.key
                      ? 'text-sky-700 border-b-4 border-sky-300'
                      : 'text-gray-600 hover:text-sky-600'
                  }`}
                  onClick={() => handleTabClick(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
          {activeTab === 'modulos' && (
            <BimestreSelect
              value={bimestre}
              onChange={(e) => setBimestre(e.target.value)}
              className="shrink-0 text-sm text-gray-500"
            />
          )}
        </div>
      </div>

      <div className={`bg-gradient-to-b from-white to-gray-50 rounded-b-xl shadow-sm min-w-0 ${panelPaddingClass}`}>
        {activeTab !== 'chatia' && <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-700">{courseTitle}</h1>
          {activeTab === 'modulos' && (
            <button
              id="create-module-btn"
              onClick={() => document.dispatchEvent(new CustomEvent('teacher:openCreateModule'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 text-white rounded text-sm shadow-sm hover:bg-sky-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Crear módulo
            </button>
          )}
        </div>}
        {activeTab === 'modulos' && (
          <TeacherCourseModulesPanel
            courseId={courseId}
            aulaId={aulaFromQuery || course?.idAula}
            bimestre={bimestreToNumber(bimestre)}
          />
        )}
        {activeTab === 'estudiantes' && <TeacherCourseStudentsPanel course={course} />}
        {activeTab === 'chatia' && <TeacherCourseChatPanel course={course} />}
        {activeTab === 'informacion' && <TeacherCourseInfoPanel course={course} />}
      </div>
    </div>
  );
};

export default TeacherCourseTabsPage;
