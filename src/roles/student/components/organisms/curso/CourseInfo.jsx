import React from 'react';

const CourseInfo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Información del Curso</h2>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Título</h3>
          <p className="text-gray-600">Historia del Perú - 1er Año</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Código</h3>
          <p className="text-gray-600">HIS-101</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Descripción</h3>
          <p className="text-gray-600 text-sm leading-relaxed">Este curso ofrece un análisis crítico y sistemático del proceso histórico del Perú desde las civilizaciones prehispánicas hasta la conformación del Estado moderno. Se pone énfasis en los factores culturales, sociales, económicos y políticos que han determinado las transformaciones regionales y nacionales.</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Objetivos</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            <li>Comprender las principales etapas de la historia del Perú y sus procesos causales.</li>
            <li>Analizar fuentes primarias y secundarias con criterios historiográficos.</li>
            <li>Desarrollar habilidades de síntesis escrita y argumentación histórica.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Evaluación</h3>
          <p className="text-gray-600 text-sm">La evaluación contempla pruebas escritas (50%), trabajos de investigación y presentaciones (30%) y participación en actividades y foros (20%).</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Información del Profesor a Cargo</h2>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center overflow-hidden">
            {/* placeholder avatar */}
            <svg className="w-12 h-12 text-sky-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 20c0-3.314 2.686-6 6-6h4c3.314 0 6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div>
            <div className="text-gray-800 font-medium">Alfredo Porras Zapata</div>
            <div className="text-sm text-gray-500">Profesor Titular - Departamento de Historia</div>
          </div>
        </div>

        <div className="mb-3 text-sm text-gray-600">
          <div><strong>Contacto:</strong> +51 999 999 999</div>
          <div><strong>Email:</strong> alfredo.porras@gmail.com</div>
        </div>

        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-700">Biografía</h3>
          <p className="text-gray-600 text-sm leading-relaxed">El profesor Alfredo Porras posee más de 15 años de experiencia en docencia universitaria e investigación histórica. Sus líneas de trabajo incluyen historia social y política del Perú republicano, análisis de fuentes primarias y metodologías de investigación histórica. Ha publicado múltiples artículos y dirigido proyectos de memoria histórica en comunidades rurales.</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Horario de atención</h3>
          <p className="text-gray-600 text-sm">Lunes y miércoles de 17:00 a 19:00 (modalidad virtual).</p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
