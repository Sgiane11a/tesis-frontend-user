export const teacherChatQuickPrompts = [
  {
    icon: 'clipboard',
    label: 'Plan de clase',
    prompt: 'Crea una sesion de clase de 45 minutos con inicio, desarrollo, cierre y evaluacion rapida.',
  },
  {
    icon: 'pen',
    label: 'Preguntas',
    prompt: 'Genera 5 preguntas de analisis y 3 preguntas de refuerzo para este tema.',
  },
  {
    icon: 'file',
    label: 'Resumen',
    prompt: 'Resume el tema en lenguaje sencillo y agrega un ejemplo para estudiantes.',
  },
  {
    icon: 'lightbulb',
    label: 'Actividad',
    prompt: 'Propone una actividad grupal breve con criterios de logro.',
  },
  {
    icon: 'sparkles',
    label: 'Rubrica',
    prompt: 'Crea una rubrica sencilla de participacion y comprension.',
  },
  {
    icon: 'sparkles',
    label: 'Refuerzo',
    prompt: 'Dame una actividad de refuerzo para estudiantes con bajo rendimiento.',
  },
];

export const teacherChatQuickActions = [
  'Crear rubrica de participacion',
  'Adaptar explicacion a nivel basico',
  'Generar actividad de salida',
  'Crear retroalimentacion para bajo rendimiento',
  'Crear mini quiz de 5 preguntas',
];

export const teacherChatCopy = {
  welcome:
    'Hola, soy tu asistente docente. Puedo ayudarte a preparar clases, crear preguntas, adaptar recursos y analizar dificultades del aula.',
  newChat:
    'Nueva conversacion lista. Puedes pedirme una sesion, quiz, retroalimentacion o actividad.',
  emptyTitle: 'Que quieres preparar hoy?',
  emptyDescription:
    'Elige una sugerencia o escribe tu consulta. El historial se guardara durante esta sesion.',
  advice:
    'Para mejores respuestas, menciona grado, tiempo disponible, objetivo y producto esperado.',
};

export const buildTeacherAssistantReply = (courseTitle) => {
  const topic = courseTitle || 'el curso';

  return `Claro. Para ${topic}, te propongo una respuesta docente lista para adaptar:\n\n1. Inicia con una pregunta breve para activar conocimientos previos.\n2. Presenta el concepto central con un ejemplo cercano al aula.\n3. Pide una evidencia concreta para comprobar comprension.\n4. Cierra con una pregunta de salida o mini quiz.\n\nTambien puedo convertir esto en una sesion completa, rubrica o ficha de trabajo.`;
};

export const createTeacherWelcomeMessage = () => ({
  id: 1,
  role: 'assistant',
  text: teacherChatCopy.welcome,
  time: 'Ahora',
});

export const createTeacherChat = (title = 'Nuevo chat docente') => ({
  id: Date.now(),
  title,
  updatedAt: 'Ahora',
  messages: [createTeacherWelcomeMessage()],
});
