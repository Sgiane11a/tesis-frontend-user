export const quizQuestions = [
  {
    id: 'q1',
    question: 'Que idea resume mejor el proposito principal de un texto informativo?',
    options: [
      'Convencer al lector usando emociones intensas.',
      'Explicar un tema con datos, ejemplos y orden.',
      'Narrar una historia con personajes ficticios.',
      'Crear suspenso hasta el final del texto.',
    ],
    correctIndex: 1,
    explanation:
      'Un texto informativo busca explicar o presentar informacion de manera clara. Suele usar datos, ejemplos, definiciones y una estructura ordenada.',
    example: 'Por ejemplo, una lectura sobre el ciclo del agua explica evaporacion, condensacion y precipitacion.',
    summary: 'Idea clave: informar es explicar con claridad, no convencer ni narrar ficcion.',
    concept: 'Texto informativo',
  },
  {
    id: 'q2',
    question: 'Cual de estas acciones ayuda mas a identificar la idea principal?',
    options: [
      'Leer solo el ultimo parrafo.',
      'Buscar la informacion que se repite o sostiene todo el texto.',
      'Elegir la frase mas larga.',
      'Marcar todas las palabras desconocidas.',
    ],
    correctIndex: 1,
    explanation:
      'La idea principal suele ser el eje que organiza el texto. Aparece reforzada por detalles, ejemplos o explicaciones secundarias.',
    example: 'Si varios parrafos explican beneficios de leer, la idea principal puede ser que la lectura fortalece el aprendizaje.',
    summary: 'Idea clave: la idea principal sostiene a las demas ideas.',
    concept: 'Idea principal',
  },
  {
    id: 'q3',
    question: 'Que funcion cumplen los ejemplos dentro de una explicacion?',
    options: [
      'Reemplazar la conclusion.',
      'Hacer mas dificil el contenido.',
      'Aclarar una idea general con un caso concreto.',
      'Eliminar la necesidad de leer el texto completo.',
    ],
    correctIndex: 2,
    explanation:
      'Los ejemplos vuelven concreta una idea. Ayudan al estudiante a conectar una definicion con una situacion facil de reconocer.',
    example: 'Si se explica "sinonimo", un ejemplo seria: feliz y alegre.',
    summary: 'Idea clave: los ejemplos aterrizan una idea abstracta.',
    concept: 'Ejemplificacion',
  },
];

export const quizModeCopy = {
  normal: {
    label: 'Modo normal',
    mood: 'Limpio, tranquilo y academico.',
    companionMessage: 'Tomate tu tiempo. Lee con calma y elige la mejor respuesta.',
    resultMessage: 'Buen ritmo. La concentracion tambien suma.',
    accent: 'sky',
  },
  timed: {
    label: 'Contra reloj',
    mood: 'Intenso y dinamico.',
    companionMessage: 'Rapido. Cada segundo cuenta.',
    lowTimeMessage: 'Quedan 5 segundos.',
    resultMessage: 'Combo activo. Responde rapido para multiplicar XP.',
    accent: 'amber',
  },
  practice: {
    label: 'Modo practica',
    mood: 'Didactico y relajado.',
    companionMessage: 'No importa equivocarse, estamos aprendiendo.',
    resultMessage: 'Revisa la explicacion y conecta la idea con el ejemplo.',
    accent: 'emerald',
  },
  survival: {
    label: 'Supervivencia',
    mood: 'Competitivo y tenso.',
    companionMessage: 'No falles ahora. Mantente atento.',
    streakMessage: 'Llevas una buena racha. La dificultad sube.',
    resultMessage: 'Cada acierto mantiene tu energia.',
    accent: 'rose',
  },
};

export const trueFalseQuestions = [
  {
    id: 'tf1',
    statement: 'Un texto informativo busca explicar un tema con claridad, datos y ejemplos.',
    answer: true,
    explanation: 'Es verdadero porque los textos informativos presentan informacion organizada para que el lector comprenda un tema.',
    tip: 'Busca datos, definiciones o ejemplos: suelen indicar que el texto quiere informar.',
    concept: 'Texto informativo',
  },
  {
    id: 'tf2',
    statement: 'La idea principal siempre es la frase mas larga de un parrafo.',
    answer: false,
    explanation: 'Es falso. La idea principal es la que sostiene el sentido del texto, no necesariamente la frase mas larga.',
    tip: 'Pregunta: de que trata todo este fragmento? Esa respuesta suele acercarte a la idea principal.',
    concept: 'Idea principal',
  },
  {
    id: 'tf3',
    statement: 'Los ejemplos ayudan a convertir una idea general en un caso mas facil de entender.',
    answer: true,
    explanation: 'Es verdadero. Un ejemplo vuelve concreta una explicacion y ayuda a reconocer como se aplica una idea.',
    tip: 'Cuando veas "por ejemplo", revisa que idea anterior esta aclarando.',
    concept: 'Ejemplificacion',
  },
  {
    id: 'tf4',
    statement: 'Una conclusion solo sirve para agregar datos nuevos sin relacion con el texto.',
    answer: false,
    explanation: 'Es falso. La conclusion cierra o resume las ideas principales, y debe mantener relacion con el tema.',
    tip: 'Una buena conclusion conecta con lo explicado, no cambia de tema.',
    concept: 'Conclusion',
  },
];

export const companionColors = {
  'ai-tutor': 'bg-sky-500',
  'fun-mascot': 'bg-amber-400',
  'virtual-teacher': 'bg-emerald-500',
};
