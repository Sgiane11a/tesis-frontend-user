import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, BrainCircuit, Info } from 'lucide-react';

const tabItems = [
  { key: 'modulos', label: 'Módulos', icon: BookOpen },
  { key: 'estudiantes', label: 'Estudiantes', icon: Users },
  { key: 'chatia', label: 'ChatIA', icon: BrainCircuit },
  { key: 'informacion', label: 'Información', icon: Info },
];

const CourseTabNav = ({ courseId, activeTab }) => {
  const navigate = useNavigate();
  const basePath = `/teacher/dashboard/course/${courseId}`;

  const handleBack = () => {
    navigate(basePath);
  };

  return (
    <div className="flex items-center gap-1 border-b border-gray-100 pb-3 mb-6 overflow-x-auto">
      {/* Botón volver */}
      <button
        onClick={handleBack}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors shrink-0 mr-2"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Tabs */}
      {tabItems.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => navigate(`${basePath}/${tab.key}`)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap
              ${isActive
                ? 'text-primary bg-primary-light/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export { CourseTabNav };
