

import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CourseModules from '../../student/components/organisms/curso/CourseModules';
import CourseRetos from '../../student/components/organisms/curso/CourseRetos';
import CourseChat from '../../student/components/organisms/curso/CourseChat';
import CourseInfo from '../../student/components/organisms/curso/CourseInfo';
import { ChevronLeft } from 'lucide-react';
import BimestreSelect from '../../student/components/atoms/BimestreSelect';
import { useTeacherCourses } from '../../../hooks/useCourses';

const tabs = [
  { key: 'modulos', label: 'Módulos' },
  { key: 'retos', label: 'Retos' },
  { key: 'chatia', label: 'ChatIA' },
  { key: 'informacion', label: 'Información' },
];



const TeacherCourseTabsPage = () => {

  const { tab, courseId } = useParams();
  const navigate = useNavigate();
  const [bimestre, setBimestre] = useState('Bimestre - I');
  const { data: courses = [] } = useTeacherCourses();

  const course = useMemo(
    () => courses.find((item) => String(item.id) === String(courseId)),
    [courses, courseId]
  );

  const courseTitle = course?.title || `Curso ${courseId}`;

  const handleTabClick = (key) => {
    if (key === 'modulos') {
      navigate(`/teacher/dashboard/course/${courseId}/modulos`);
      return;
    }
    navigate(`/teacher/dashboard/course/${courseId}/modulos/${key}`);
  };

  const handleBack = () => {
    navigate(`/teacher/dashboard/course/${courseId}`);
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
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 mb-5">{courseTitle}</h1>
        {(tab || 'modulos') === 'modulos' && <CourseModules />}
        {(tab || 'modulos') === 'retos' && <CourseRetos />}
        {(tab || 'modulos') === 'chatia' && <CourseChat />}
        {(tab || 'modulos') === 'informacion' && <CourseInfo />}
      </div>
    </div>
  );
};

export default TeacherCourseTabsPage;
