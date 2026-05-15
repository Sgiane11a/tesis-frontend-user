import React from 'react';
import { FileText } from 'lucide-react';
import { teacherModulesCopy } from '../../../mocks';
import ModalShell from './ModalShell';

const ResourceViewerModal = ({ resource, viewerConfig, onClose }) => (
  <ModalShell
    title={resource.titulo}
    subtitle="Vista previa del recurso dentro de la plataforma."
    onClose={onClose}
    panelClassName="max-w-6xl w-[92vw]"
    bodyClassName="p-0 bg-gray-50"
    footer={(
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-gray-500 truncate">{resource.url}</div>
        <div className="flex items-center gap-2 shrink-0">
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100">
            Abrir externo
          </a>
          <button type="button" onClick={onClose} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700">
            Cerrar
          </button>
        </div>
      </div>
    )}
  >
    <div className="h-[62vh] bg-white">
      {viewerConfig?.kind === 'video' ? (
        <video src={viewerConfig.src} controls className="w-full h-full bg-black" />
      ) : viewerConfig?.kind === 'local-office' ? (
        <div className="h-full flex flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
            <FileText className="w-7 h-7 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 mb-1">{teacherModulesCopy.localOfficeTitle}</p>
            <p className="text-xs text-gray-500 max-w-xs">{teacherModulesCopy.localOfficeDescription}</p>
          </div>
          <a href={viewerConfig.src} download className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700">
            Descargar archivo
          </a>
        </div>
      ) : viewerConfig?.kind === 'iframe' ? (
        <iframe
          src={viewerConfig.src}
          title={resource.titulo}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="h-full flex items-center justify-center text-sm text-gray-500">
          {teacherModulesCopy.previewFallback}
        </div>
      )}
    </div>
    <div className="px-5 py-3 border-t border-gray-100 bg-white text-xs text-gray-500">
      {teacherModulesCopy.previewHelp}
    </div>
  </ModalShell>
);

export default ResourceViewerModal;
