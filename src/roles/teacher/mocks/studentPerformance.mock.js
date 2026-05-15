const statusByAverage = (average) => {
  if (average >= 14) return 'good';
  if (average >= 11) return 'follow';
  return 'attention';
};

export const buildStableStudentMetrics = (studentId) => {
  const seed = Number(studentId) || 1;
  const progress = 45 + ((seed * 11) % 51);
  const average = Number((7.8 + ((seed * 17) % 105) / 10).toFixed(1));
  const day = String(1 + ((seed * 3) % 28)).padStart(2, '0');
  const month = String(1 + ((seed * 5) % 12)).padStart(2, '0');

  return {
    progress,
    average,
    status: statusByAverage(average),
    lastActivity: `${day}/${month}/2026`,
  };
};

export const buildStudentQuizHistory = (student, course) => {
  const seed = Number(student?.id) || 1;
  const baseScores = [
    student?.average ? Math.min(98, Math.round(student.average * 5.2)) : 75,
    55 + ((seed * 7) % 35),
    10 + ((seed * 11) % 28),
    80 + ((seed * 13) % 18),
    62 + ((seed * 17) % 30),
  ];

  return baseScores.map((score, index) => {
    const status = score >= 75 ? 'good' : score >= 45 ? 'follow' : 'attention';
    return {
      id: `${student?.id || 'student'}-${index}`,
      title: `Quiz: ${course?.title || 'Curso'} - Semana ${index + 1}`,
      date: `${String(6 + index).padStart(2, '0')}/11/2025, 12:29:08 a. m.`,
      score,
      status,
    };
  });
};

export const buildQuizDetail = (quiz, course) => {
  const topic = course?.title || 'el curso';
  const questions = [
    {
      prompt: `Que concepto principal se trabajo en ${topic}?`,
      options: ['La idea central del tema', 'Un dato aislado sin contexto', 'Una definicion no relacionada', 'Una opinion personal'],
      correctIndex: 0,
      selectedIndex: quiz.score < 35 ? 1 : 0,
      explanation: 'La respuesta correcta identifica la idea central y la conecta con el contenido desarrollado durante la actividad.',
    },
    {
      prompt: 'Cual fue la causa o relacion mas importante segun el material?',
      options: ['Relacion entre hechos y consecuencias', 'Memorizacion de fechas', 'Uso de ejemplos no vistos', 'Respuesta sin evidencia'],
      correctIndex: 0,
      selectedIndex: quiz.score >= 55 ? 0 : 2,
      explanation: 'El desempeno mejora cuando el estudiante justifica la respuesta con evidencias del recurso o del modulo.',
    },
    {
      prompt: 'Que evidencia permite sostener mejor la respuesta?',
      options: ['Una fuente o ejemplo del contenido', 'Una frase incompleta', 'Una suposicion', 'Un dato de otro tema'],
      correctIndex: 0,
      selectedIndex: quiz.score >= 75 ? 0 : 3,
      explanation: 'Se esperaba que seleccione una evidencia directa del material revisado para sustentar su conclusion.',
    },
    {
      prompt: 'Como se podria aplicar lo aprendido en una situacion nueva?',
      options: ['Comparando casos similares', 'Repitiendo solo el titulo', 'Omitiendo la explicacion', 'Eligiendo una opcion al azar'],
      correctIndex: 0,
      selectedIndex: quiz.score >= 85 ? 0 : 1,
      explanation: 'La transferencia del aprendizaje se demuestra cuando compara, interpreta y aplica el concepto a otro escenario.',
    },
    {
      prompt: 'Que conclusion resume mejor el resultado del tema?',
      options: ['Una sintesis clara y argumentada', 'Una respuesta sin relacion', 'Una copia literal parcial', 'Una pregunta nueva'],
      correctIndex: 0,
      selectedIndex: quiz.score >= 65 ? 0 : 2,
      explanation: 'La conclusion correcta sintetiza el aprendizaje y muestra comprension, no solo recuerdo literal.',
    },
    {
      prompt: 'Que aspecto debe reforzar para el siguiente intento?',
      options: ['Explicar con evidencia', 'Responder mas rapido sin revisar', 'Evitar leer las opciones', 'Elegir siempre la primera opcion'],
      correctIndex: 0,
      selectedIndex: quiz.score >= 90 ? 0 : 0,
      explanation: 'Aunque la respuesta sea correcta, conviene reforzar la argumentacion con ejemplos concretos del material.',
    },
  ];

  const correct = questions.filter((question) => question.selectedIndex === question.correctIndex).length;
  const score = Math.round((correct / questions.length) * 100);

  return {
    questions,
    correct,
    total: questions.length,
    score: quiz.score || score,
  };
};

export const buildStudentRecommendations = (student) => [
  student.average < 11 ? 'Programar refuerzo breve antes del siguiente quiz.' : 'Mantener actividades de practica con retroalimentacion corta.',
  student.progress < 70 ? 'Revisar recursos pendientes del bimestre.' : 'Proponer un reto adicional para consolidar el avance.',
  'Comparar sus proximos resultados con este historial para detectar mejoras.',
];
