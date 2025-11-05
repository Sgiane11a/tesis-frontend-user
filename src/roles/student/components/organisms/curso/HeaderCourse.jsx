import React from 'react';

const HeaderCourse = ({
  courseNumber = '3',
  courseTitle = 'Historia del Perú · 1er Año',
  periodLabel = 'Bimestre',
  shortDesc = 'Breve vista previa del curso.',
}) => {
  return (
    <div className="mb-4">
      {/* Preview strip on top with preview on the right */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="text-xs text-gray-500">Curso: {courseNumber}</div>
          <div className="text-lg font-semibold text-gray-800">{courseTitle}</div>
          <div className="text-sm text-gray-600">{periodLabel}</div>
        </div>

        {/* Preview box on the right (no bimestre select here) */}
        <div className="w-36 h-20 bg-gray-50 border rounded flex items-center justify-center text-gray-400 text-sm">Vista previa</div>
      </div>

      {/* Lightweight summary row if needed */}
      <div className="text-sm text-gray-600">{shortDesc}</div>
    </div>
  );
};

export default HeaderCourse;
