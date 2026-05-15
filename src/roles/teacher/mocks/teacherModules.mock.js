export const moduleBimesterOptions = [
  { value: 1, label: 'Bimestre I' },
  { value: 2, label: 'Bimestre II' },
  { value: 3, label: 'Bimestre III' },
  { value: 4, label: 'Bimestre IV' },
];

export const resourceSourceOptions = [
  { value: 'file', label: 'Archivo local' },
  { value: 'url', label: 'URL / YouTube' },
];

export const acceptedResourceFileTypes = '.pdf,.ppt,.pptx,.doc,.docx,.mp4,.mov,.avi,.mkv,.zip,.rar';

export const teacherModulesCopy = {
  noClassroom: 'No se encontro aula para este curso.',
  loading: 'Cargando modulos...',
  empty: 'No hay modulos para este bimestre.',
  noResources: 'No hay recursos aun.',
  localOfficeTitle: 'Vista previa no disponible en local',
  localOfficeDescription:
    'El visor de Office Online requiere una URL publica. Descarga el archivo para abrirlo directamente.',
  previewFallback: 'No se pudo previsualizar este recurso.',
  previewHelp:
    'Si el archivo no se renderiza por restricciones del navegador o del proveedor, usa "Abrir externo".',
};
