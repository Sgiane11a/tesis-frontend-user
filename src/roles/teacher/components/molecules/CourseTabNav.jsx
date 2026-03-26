import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, BrainCircuit, Info } from 'lucide-react';

const tabItems = [
  { key: 'modulos', label: 'Módulos', icon: BookOpen },
  { key: 'estudiantes', label: 'Estudiantes', icon: Users },
  { key: 'chatia', label: 'ChatIA', icon: BrainCircuit },
  { key: 'informacion', label: 'Información', icon: Info },
];

const CourseTabNav = ({ courseId, activeTab }) => {
  const navigate = useNavigate();
  const basePath = `/teacher/dashboard/course/${courseId}`;

  return (
    <div className="bg-white rounded-t-md border-b border-sky-100 mb-6">
      <nav className="flex items-center gap-4 md:gap-6 px-4 md:px-6 overflow-x-auto" aria-label="Navegacion del curso">
        {tabItems.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => navigate(`${basePath}/${tab.key}`)}
              className={`py-3 px-2 text-sm font-semibold rounded-t-md whitespace-nowrap ${
                isActive
                  ? 'text-sky-700 border-b-4 border-sky-300'
                  : 'text-gray-600 hover:text-sky-600'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export { CourseTabNav };
