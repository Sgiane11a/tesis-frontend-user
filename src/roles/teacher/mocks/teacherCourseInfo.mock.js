export const courseInfoFallbackImage =
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80';

export const courseInfoObjectives = [
  'Consolidar los conceptos base mediante actividades guiadas.',
  'Promover participacion, analisis y resolucion de problemas.',
  'Preparar evidencias de aprendizaje por bimestre.',
];

export const courseInfoEvaluationCriteria = [
  { label: 'Participacion', value: '20%' },
  { label: 'Retos y quizzes', value: '35%' },
  { label: 'Evidencia final', value: '30%' },
  { label: 'Refuerzo', value: '15%' },
];

export const courseInfoActivity = [
  { title: 'Modulo publicado', detail: 'Material disponible para revision del aula.', time: 'Hoy' },
  { title: 'Revision sugerida', detail: 'Hay estudiantes que necesitan seguimiento.', time: 'Esta semana' },
  { title: 'Recurso pendiente', detail: 'Puedes agregar una actividad de salida al ultimo modulo.', time: 'Sugerencia' },
];

export const courseInfoAiRecommendations = [
  'Crea un quiz corto para medir comprension del tema actual.',
  'Prepara una ficha de refuerzo para estudiantes con menor avance.',
];

export const buildCourseInfoStats = (course) => {
  const studentCount = Number(course?.studentCount || 0);
  const moduleCount = Math.max(3, Math.min(8, Math.ceil(studentCount / 8) || 4));
  const publishedResources = moduleCount * 2 + Math.min(studentCount, 6);
  const averageScore = studentCount > 0 ? 14.8 + (studentCount % 4) * 0.4 : 14.5;

  return [
    { label: 'Estudiantes', value: studentCount, caption: 'registrados en aula' },
    { label: 'Modulos', value: moduleCount, caption: 'estimados para el periodo' },
    { label: 'Recursos', value: publishedResources, caption: 'materiales sugeridos' },
    { label: 'Promedio', value: averageScore.toFixed(1), caption: 'referencial del curso' },
  ];
};
