import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  History,
  Lightbulb,
  MessageSquareText,
  Mic,
  Plus,
  Send,
  Sparkles,
  Target,
  Trash2,
  Wand2,
  X,
} from 'lucide-react';

const assistantCopy = {
  welcome:
    'Hola, soy EduIA. Puedo ayudarte con metodos de estudio, concentracion, organizacion, repaso para examenes, comprension de temas y habitos para aprender mejor.',
  emptyTitle: 'Que quieres mejorar hoy en tu forma de estudiar?',
  emptyDescription:
    'Elige una sugerencia o escribe tu duda. Este chat es general y no depende de un curso especifico.',
  advice:
    'Para recibir una mejor guia, menciona el tema, cuanto tiempo tienes, que se te dificulta y si estudias para tarea, practica o examen.',
};

const quickPrompts = [
  {
    label: 'Metodo de estudio',
    icon: BrainCircuit,
    prompt: 'Recomiendame un metodo de estudio para entender mejor un tema dificil.',
  },
  {
    label: 'Concentracion',
    icon: Target,
    prompt: 'Dame una tecnica para concentrarme y evitar distraerme mientras estudio.',
  },
  {
    label: 'Plan de repaso',
    icon: CalendarClock,
    prompt: 'Ayudame a crear un plan de repaso para un examen durante esta semana.',
  },
  {
    label: 'Comprender mejor',
    icon: Lightbulb,
    prompt: 'Explicame como puedo entender un tema usando ejemplos y mis propias palabras.',
  },
  {
    label: 'Habitos',
    icon: CheckCircle2,
    prompt: 'Dame habitos simples para estudiar mejor todos los dias sin agotarme.',
  },
];

const quickActions = [
  'Recomiendame el mejor metodo de estudio para mi.',
  'Hazme un horario de repaso para esta semana.',
  'Dame una tecnica para memorizar sin repetir demasiado.',
  'Ayudame a prepararme para un examen.',
  'Explicame como usar el metodo Feynman.',
  'Dame consejos para concentrarme 25 minutos.',
];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createWelcomeMessage = () => ({
  id: createId(),
  role: 'assistant',
  text: assistantCopy.welcome,
  time: 'Ahora',
});

const createChat = (title = 'Nuevo chat de estudio') => ({
  id: createId(),
  title,
  updatedAt: 'Ahora',
  messages: [createWelcomeMessage()],
});

const buildAssistantReply = (text) => {
  const cleanText = text.trim();

  return `Claro. Para trabajar "${cleanText}", te propongo una guia de estudio breve:

1. Aclara que necesitas lograr: entender, practicar, memorizar o prepararte para una prueba.
2. Divide el tema en partes pequenas y empieza por la idea principal.
3. Usa aprendizaje activo: explica con tus palabras, resuelve ejercicios o crea preguntas.
4. Repasa en intervalos cortos: 25 minutos de foco y 5 minutos de descanso.
5. Cierra con una evidencia: resumen de 5 lineas, mapa mental, tarjetas o mini autoevaluacion.

Tambien puedo convertirlo en un horario, una tecnica paso a paso, preguntas de practica o una explicacion sencilla.`;
};

const StudentAvatar = ({ type = 'assistant' }) => (
  <div
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
      type === 'student'
        ? 'bg-sky-600 text-white'
        : 'border border-sky-100 bg-white text-sky-600'
    }`}
  >
    {type === 'student' ? (
      <BookOpen className="h-4 w-4" />
    ) : (
      <Sparkles className="h-4 w-4" />
    )}
  </div>
);

const IaGeneralPage = () => {
  const messagesEndRef = useRef(null);
  const [chats, setChats] = useState(() => [
    {
      ...createChat('Mejores metodos de estudio'),
      updatedAt: 'Hoy',
      messages: [
        createWelcomeMessage(),
        {
          id: createId(),
          role: 'student',
          text: 'Cual es el mejor metodo de estudio para aprender un tema dificil?',
          time: 'Hace 10 min',
        },
        {
          id: createId(),
          role: 'assistant',
          text: 'El metodo Feynman es una buena opcion: estudia la idea, explicala con palabras simples, detecta lo que no puedes explicar y vuelve a repasarlo. Funciona mejor si lo combinas con practica activa.',
          time: 'Hace 9 min',
        },
      ],
    },
    {
      ...createChat('Tecnicas de concentracion'),
      updatedAt: 'Ayer',
    },
  ]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  const messages = useMemo(() => activeChat?.messages || [], [activeChat]);

  const chatStats = useMemo(() => {
    const totalMessages = chats.reduce((total, chat) => total + chat.messages.length, 0);
    return [
      { label: 'Chats', value: chats.length },
      { label: 'Mensajes', value: totalMessages },
      { label: 'Modo', value: 'General' },
    ];
  }, [chats]);

  useEffect(() => {
    if (!activeChatId && chats[0]?.id) {
      setActiveChatId(chats[0].id);
    }
  }, [activeChatId, chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const updateActiveChat = (updater) => {
    setChats((prev) => prev.map((chat) => (
      chat.id === activeChat?.id ? updater(chat) : chat
    )));
  };

  const sendMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText || !activeChat) return;

    updateActiveChat((chat) => {
      const hasOnlyWelcome = chat.messages.length <= 1;

      return {
        ...chat,
        title: hasOnlyWelcome ? cleanText.slice(0, 42) : chat.title,
        updatedAt: 'Ahora',
        messages: [
          ...chat.messages,
          { id: createId(), role: 'student', text: cleanText, time: 'Ahora' },
          { id: createId(), role: 'assistant', text: buildAssistantReply(cleanText), time: 'Ahora' },
        ],
      };
    });
    setInput('');
    setPanelOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const handleNewChat = () => {
    const nextChat = createChat();
    setChats((prev) => [nextChat, ...prev]);
    setActiveChatId(nextChat.id);
    setInput('');
    setPanelOpen(false);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setPanelOpen(false);
  };

  const handleDeleteChat = (chatId) => {
    setChats((prev) => {
      const next = prev.filter((chat) => chat.id !== chatId);

      if (next.length === 0) {
        const fallback = createChat();
        setActiveChatId(fallback.id);
        return [fallback];
      }

      if (chatId === activeChatId) {
        setActiveChatId(next[0].id);
      }

      return next;
    });
  };

  return (
    <section className="relative h-[calc(100vh-4rem)] min-h-[620px] overflow-hidden">
      <div className="flex h-full min-h-0 gap-0">
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden border border-gray-200 bg-white shadow-sm">
          <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-4 md:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-gray-900">IA General</h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Asistente para metodos de estudio, concentracion, organizacion y preparacion de examenes.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPanelOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 text-sm font-medium text-sky-700 hover:bg-sky-100"
                >
                  <History className="h-4 w-4" />
                  Historial
                </button>
                <button
                  type="button"
                  onClick={handleNewChat}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-sky-600 px-3 text-sm font-medium text-white hover:bg-sky-700"
                >
                  <Plus className="h-4 w-4" />
                  Nuevo chat
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {quickPrompts.map(({ label, icon: Icon, prompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                >
                  <span className="inline-flex items-center gap-2">
                    {React.createElement(Icon, { className: 'h-4 w-4' })}
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7f9fc] px-4 py-5">
            <div className="mx-auto max-w-4xl space-y-4">
              {messages.length <= 1 && (
                <div className="mx-auto max-w-2xl py-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{assistantCopy.emptyTitle}</h2>
                  <p className="mt-2 text-sm text-gray-500">{assistantCopy.emptyDescription}</p>
                </div>
              )}

              {messages.map((message) => {
                const isStudent = message.role === 'student';

                return (
                  <div key={message.id} className={`flex gap-3 ${isStudent ? 'justify-end' : 'justify-start'}`}>
                    {!isStudent && <StudentAvatar />}
                    <div
                      className={`max-w-[min(760px,84%)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isStudent
                          ? 'rounded-br-md bg-sky-600 text-white'
                          : 'rounded-bl-md border border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {!isStudent && (
                        <div className="mb-2 text-xs font-semibold text-sky-600">EduIA</div>
                      )}
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className={`mt-2 text-[11px] ${isStudent ? 'text-sky-100' : 'text-gray-400'}`}>
                        {message.time}
                      </div>
                    </div>
                    {isStudent && <StudentAvatar type="student" />}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  rows={1}
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                  placeholder={
                    isListening
                      ? 'Escuchando tu consulta...'
                      : 'Pregunta sobre metodos de estudio, examenes, concentracion o tareas...'
                  }
                />
                <button
                  type="button"
                  onClick={() => setIsListening((current) => !current)}
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    isListening
                      ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-100'
                  }`}
                  aria-label={isListening ? 'Detener audio' : 'Grabar audio'}
                  title={isListening ? 'Detener audio' : 'Grabar audio'}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="submit"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
                  aria-label="Enviar mensaje"
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 text-center text-[11px] text-gray-400">
                Enter para enviar. Shift + Enter para nueva linea.
              </div>
            </div>
          </form>
        </main>

        <aside className="hidden h-full w-80 shrink-0 border-y border-r border-gray-200 bg-white lg:block">
          <StudentIaStaticPanel chatStats={chatStats} onQuickAction={sendMessage} />
        </aside>
      </div>

      {panelOpen && (
        <>
          <button
            type="button"
            className="absolute inset-0 z-10 bg-black/10"
            aria-label="Cerrar historial"
            onClick={() => setPanelOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Historial</h2>
                <p className="text-xs text-gray-500">Cambia entre tus conversaciones guardadas.</p>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Cerrar historial"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden p-5">
              <StudentIaHistoryPanel
                activeChatId={activeChat?.id}
                chats={chats}
                onDeleteChat={handleDeleteChat}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
              />
            </div>
          </aside>
        </>
      )}
    </section>
  );
};

const StudentIaStaticPanel = ({ chatStats, onQuickAction }) => (
  <div className="flex h-full min-h-0 flex-col overflow-hidden">
    <div className="shrink-0 border-b border-gray-100 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Target className="h-4 w-4 text-sky-600" />
        Resumen
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {chatStats.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-1.5 text-center">
            <div className="text-sm font-semibold text-gray-800">{item.value}</div>
            <div className="mt-0.5 text-[11px] text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex min-h-0 flex-1 flex-col border-b border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Wand2 className="h-4 w-4 text-violet-600" />
        Acciones rapidas
      </div>
      <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto">
        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => onQuickAction(action)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-left text-sm text-gray-600 hover:border-violet-200 hover:bg-violet-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>

    <div className="shrink-0 bg-sky-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
        <MessageSquareText className="h-4 w-4" />
        Consejo
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{assistantCopy.advice}</p>
    </div>
  </div>
);

const StudentIaHistoryPanel = ({
  activeChatId,
  chats,
  onDeleteChat,
  onNewChat,
  onSelectChat,
}) => (
  <div className="flex h-full min-h-0 flex-col">
    <div className="mb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <History className="h-4 w-4 text-sky-600" />
        Conversaciones
      </div>
      <button
        type="button"
        onClick={onNewChat}
        className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
      >
        <Plus className="h-3.5 w-3.5" />
        Nuevo
      </button>
    </div>

    <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
      {chats.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 px-3 py-6 text-center">
          <div className="text-sm font-medium text-gray-700">Sin conversaciones</div>
          <div className="mt-1 text-xs text-gray-400">Crea un nuevo chat para iniciar tu historial.</div>
        </div>
      ) : (
        chats.map((chat) => {
          const previewMessage = chat.messages.find((message) => message.role === 'student') || chat.messages[0];

          return (
            <div
              key={chat.id}
              className={`group rounded-lg border px-3 py-2 ${
                chat.id === activeChatId
                  ? 'border-sky-200 bg-sky-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  onClick={() => onSelectChat(chat.id)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="truncate text-sm font-semibold text-gray-700">{chat.title}</div>
                  <div className="mt-0.5 text-xs text-gray-400">
                    {chat.updatedAt} - {chat.messages.length} mensajes
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {previewMessage?.text || 'Conversacion nueva lista para usar.'}
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteChat(chat.id)}
                  className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  aria-label="Eliminar chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>

    <button
      type="button"
      onClick={onNewChat}
      className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-sky-600 px-3 text-sm font-medium text-white hover:bg-sky-700"
    >
      <Plus className="h-4 w-4" />
      Nueva conversacion
    </button>
  </div>
);

export default IaGeneralPage;
