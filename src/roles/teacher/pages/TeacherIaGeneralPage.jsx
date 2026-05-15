import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpenCheck,
  BrainCircuit,
  ClipboardList,
  History,
  MessageSquareText,
  Mic,
  Plus,
  Send,
  Sparkles,
  Target,
  Trash2,
  UsersRound,
  Wand2,
  X,
} from 'lucide-react';
import { ChatAvatar } from '../components/atoms/chat';

const assistantCopy = {
  welcome:
    'Hola, soy EduIA Docente. Puedo ayudarte con metodos de ensenanza, planificacion, evaluacion, inclusion, motivacion y estrategias para acompanar mejor a tu aula.',
  emptyTitle: 'Que quieres mejorar hoy en tu practica docente?',
  emptyDescription:
    'Elige una sugerencia o escribe una consulta general. Este asistente no depende de un curso especifico.',
  advice:
    'Para obtener mejores respuestas, menciona grado, tiempo disponible, objetivo de aprendizaje y caracteristicas del grupo.',
};

const quickPrompts = [
  {
    label: 'Metodo de ensenanza',
    icon: BrainCircuit,
    prompt: 'Sugiere un metodo de ensenanza activa para una clase con estudiantes poco participativos.',
  },
  {
    label: 'Plan de clase',
    icon: ClipboardList,
    prompt: 'Crea una sesion de 45 minutos con inicio, desarrollo, cierre y evidencia de aprendizaje.',
  },
  {
    label: 'Evaluacion',
    icon: BookOpenCheck,
    prompt: 'Disena una rubrica simple para evaluar participacion y comprension.',
  },
  {
    label: 'Inclusion',
    icon: UsersRound,
    prompt: 'Dame estrategias para adaptar una actividad a estudiantes con diferentes ritmos de aprendizaje.',
  },
  {
    label: 'Motivacion',
    icon: Sparkles,
    prompt: 'Dame una estrategia para mejorar la motivacion y participacion en clase.',
  },
];

const quickActions = [
  'Dame una estrategia para mejorar la participacion.',
  'Crea una sesion de 45 minutos.',
  'Sugiere metodos de ensenanza activa.',
  'Disena una rubrica simple.',
  'Prepara una actividad de cierre.',
  'Adapta una explicacion a nivel basico.',
];

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const createWelcomeMessage = () => ({
  id: createId(),
  role: 'assistant',
  text: assistantCopy.welcome,
  time: 'Ahora',
});

const createChat = (title = 'Nuevo chat docente') => ({
  id: createId(),
  title,
  updatedAt: 'Ahora',
  messages: [createWelcomeMessage()],
});

const buildAssistantReply = (text) => {
  const cleanText = text.trim();

  return `Claro. Para trabajar "${cleanText}", te propongo una guia docente breve:

1. Define un objetivo observable para la sesion.
2. Activa saberes previos con una pregunta o caso cercano al aula.
3. Usa una estrategia participativa: pares, equipos pequenos o lluvia de ideas guiada.
4. Pide una evidencia concreta: respuesta corta, organizador, mini producto o ticket de salida.
5. Cierra con retroalimentacion rapida y una siguiente accion.

Tambien puedo convertirlo en plan de clase, rubrica, actividad inclusiva o ficha de trabajo.`;
};

const TeacherIaGeneralPage = () => {
  const messagesEndRef = useRef(null);
  const [chats, setChats] = useState(() => [
    {
      ...createChat('Metodos de ensenanza activa'),
      updatedAt: 'Hoy',
      messages: [
        createWelcomeMessage(),
        {
          id: createId(),
          role: 'teacher',
          text: 'Sugiere metodos de ensenanza activa para estudiantes con baja participacion.',
          time: 'Hace 10 min',
        },
        {
          id: createId(),
          role: 'assistant',
          text: 'Puedes usar aprendizaje basado en problemas, trabajo por estaciones y debate guiado. La clave es pedir una evidencia breve en cada actividad para mantener foco y participacion.',
          time: 'Hace 9 min',
        },
      ],
    },
    {
      ...createChat('Rubrica de participacion'),
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
          { id: createId(), role: 'teacher', text: cleanText, time: 'Ahora' },
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

  const handleAudioToggle = () => {
    setIsListening((current) => !current);
  };

  return (
    <section className="relative h-[calc(100vh-8rem)] min-h-[620px] overflow-hidden">
      <div className="flex h-full min-h-0 gap-5">
        <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-4 md:px-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-semibold text-gray-900">IA General</h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Asistente docente para metodos de ensenanza, planificacion, evaluacion e inclusion.
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

          <div className="flex-1 min-h-0 overflow-y-auto bg-[#f7f9fc] px-4 py-5">
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
                const isTeacher = message.role === 'teacher';

                return (
                  <div key={message.id} className={`flex gap-3 ${isTeacher ? 'justify-end' : 'justify-start'}`}>
                    {!isTeacher && <ChatAvatar />}
                    <div
                      className={`max-w-[min(760px,84%)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isTeacher
                          ? 'rounded-br-md bg-sky-600 text-white'
                          : 'rounded-bl-md border border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      {!isTeacher && (
                        <div className="mb-2 text-xs font-semibold text-sky-600">EduIA Docente</div>
                      )}
                      <p className="whitespace-pre-wrap">{message.text}</p>
                      <div className={`mt-2 text-[11px] ${isTeacher ? 'text-sky-100' : 'text-gray-400'}`}>
                        {message.time}
                      </div>
                    </div>
                    {isTeacher && <ChatAvatar type="teacher" />}
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
                      : 'Pregunta sobre metodos, evaluacion, inclusion o planificacion...'
                  }
                />
                <button
                  type="button"
                  onClick={handleAudioToggle}
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

        <aside className="hidden h-full w-80 shrink-0 lg:block">
          <TeacherIaStaticPanel
            chatStats={chatStats}
            onQuickAction={sendMessage}
          />
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
              <TeacherIaHistoryPanel
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

const TeacherIaStaticPanel = ({ chatStats, onQuickAction }) => (
  <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto pr-1">
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Target className="h-4 w-4 text-sky-600" />
        Resumen
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {chatStats.map((item) => (
          <div key={item.label} className="rounded-lg border border-gray-100 bg-gray-50 px-2 py-2 text-center">
            <div className="text-sm font-semibold text-gray-800">{item.value}</div>
            <div className="mt-0.5 text-[11px] text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
        <Wand2 className="h-4 w-4 text-violet-600" />
        Acciones rapidas
      </div>
      <div className="space-y-2">
        {quickActions.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => onQuickAction(action)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-600 hover:border-violet-200 hover:bg-violet-50"
          >
            {action}
          </button>
        ))}
      </div>
    </div>

    <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
        <MessageSquareText className="h-4 w-4" />
        Consejo
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{assistantCopy.advice}</p>
    </div>
  </div>
);

const TeacherIaHistoryPanel = ({
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
          const previewMessage = chat.messages.find((message) => message.role === 'teacher') || chat.messages[0];

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

export default TeacherIaGeneralPage;
