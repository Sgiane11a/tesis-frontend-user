

import React, { useMemo, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import CourseRetos from '../../student/components/organisms/curso/CourseRetos';
import CourseChat from '../../student/components/organisms/curso/CourseChat';
import CourseInfo from '../../student/components/organisms/curso/CourseInfo';
import { ChevronLeft } from 'lucide-react';
import BimestreSelect from '../../student/components/atoms/BimestreSelect';
import { useTeacherCourses } from '../../../hooks/useCourses';
import TeacherCourseModulesPanel from '../components/organisms/TeacherCourseModulesPanel';

const tabs = [
  { key: 'modulos', label: 'Módulos' },
  { key: 'retos', label: 'Retos' },
  { key: 'chatia', label: 'ChatIA' },
  { key: 'informacion', label: 'Información' },
];



const TeacherCourseTabsPage = () => {

  const { tab, courseId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bimestre, setBimestre] = useState('Bimestre - I');
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
    if (label.includes('II') && !label.includes('III')) return 2;
    if (label.includes('III')) return 3;
    if (label.includes('IV')) return 4;
    return 1;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-gray-500 hover:text-sky-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Volver</span>
        </button>
        <BimestreSelect
          value={bimestre}
          onChange={(e) => setBimestre(e.target.value)}
          className="text-sm text-gray-500"
        />
      </div>

      <div className="bg-white rounded-t-md border-b border-sky-100">
        <div className="flex items-center justify-between px-4 md:px-6">
          <nav className="flex items-center gap-4 md:gap-6" aria-label="Navegacion del curso">
            {tabs.map((t) => (
              <button
                key={t.key}
                className={`py-3 px-2 text-sm font-semibold rounded-t-md whitespace-nowrap ${
                  (tab || 'modulos') === t.key
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
      </div>

      <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-b-md shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-lg md:text-xl font-semibold text-gray-700">{courseTitle}</h1>
          {(tab || 'modulos') === 'modulos' && (
            <button
              id="create-module-btn"
              onClick={() => document.dispatchEvent(new CustomEvent('teacher:openCreateModule'))}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 text-white rounded text-sm shadow-sm hover:bg-sky-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Crear módulo
            </button>
          )}
        </div>
        {(tab || 'modulos') === 'modulos' && (
          <TeacherCourseModulesPanel
            courseId={courseId}
            aulaId={aulaFromQuery || course?.idAula}
            bimestre={bimestreToNumber(bimestre)}
          />
        )}
        {(tab || 'modulos') === 'retos' && <CourseRetos />}
        {(tab || 'modulos') === 'chatia' && <CourseChat />}
        {(tab || 'modulos') === 'informacion' && <CourseInfo />}
      </div>
    </div>
  );
};

export default TeacherCourseTabsPage;
