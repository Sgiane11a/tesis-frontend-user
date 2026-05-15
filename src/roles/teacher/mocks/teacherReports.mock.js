export const teacherReportSummary = {
  totalCourses: 4,
  averageScore: 15.8,
  participation: 76,
  lowPerformance: 14,
};

export const teacherReports = [
  {
    id: 'comunicacion-5a',
    course: 'Comunicacion',
    classroom: '5A Secundaria',
    progress: 82,
    students: 32,
    lowPerformance: 4,
    average: 16.8,
    participation: 84,
    trend: [62, 68, 72, 74, 80, 82],
    lowStudents: [
      { name: 'Andrea Santos Rojas', score: 38 },
      { name: 'Luis Mendoza Paredes', score: 42 },
      { name: 'Camila Torres Diaz', score: 45 },
    ],
    analysis:
      'El grupo mantiene buen avance general. Se recomienda reforzar comprension lectora inferencial y seguimiento individual a estudiantes con baja entrega de actividades.',
  },
  {
    id: 'historia-1b',
    course: 'Historia del Peru',
    classroom: '1B Secundaria',
    progress: 70,
    students: 29,
    lowPerformance: 5,
    average: 16.5,
    participation: 70,
    trend: [58, 53, 65, 62, 61, 70],
    lowStudents: [
      { name: 'Andrea Santos Rojas', score: 35 },
      { name: 'Mateo Quispe Leon', score: 39 },
      { name: 'Valeria Ramos Solis', score: 41 },
    ],
    analysis:
      'El curso presenta un promedio general positivo, pero la participacion puede mejorar. Conviene reforzar lineas de tiempo, lectura de fuentes y actividades cortas de recuperacion.',
  },
  {
    id: 'literatura-4c',
    course: 'Literatura',
    classroom: '4C Secundaria',
    progress: 90,
    students: 35,
    lowPerformance: 2,
    average: 17.4,
    participation: 88,
    trend: [72, 76, 82, 84, 87, 90],
    lowStudents: [
      { name: 'Bruno Vargas Pena', score: 44 },
      { name: 'Sofia Flores Ruiz', score: 47 },
    ],
    analysis:
      'El desempeno es alto y sostenido. Se sugiere mantener actividades de analisis literario y proponer retos de escritura argumentativa para los estudiantes avanzados.',
  },
  {
    id: 'tutoria-5a',
    course: 'Tutoria',
    classroom: '5A Secundaria',
    progress: 64,
    students: 30,
    lowPerformance: 3,
    average: 15.2,
    participation: 68,
    trend: [55, 57, 58, 61, 60, 64],
    lowStudents: [
      { name: 'Daniel Castro Perez', score: 40 },
      { name: 'Luciana Salas Vega', score: 43 },
      { name: 'Nicolas Herrera Cruz', score: 46 },
    ],
    analysis:
      'El avance es estable, aunque requiere mayor participacion. Se recomienda dinamicas breves de reflexion, acuerdos de aula y seguimiento de asistencia.',
  },
];
