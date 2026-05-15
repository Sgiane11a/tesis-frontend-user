import React, { useEffect, useRef, useState } from 'react';
import { Bot, ClipboardList, FileText, History, Info, Lightbulb, MessageSquareText, PanelRightOpen, PenLine, Plus, Send, Sparkles, Trash2, Wand2, X } from 'lucide-react';

const quickPrompts = [
  { icon: ClipboardList, label: 'Plan de clase', prompt: 'Crea una sesion de clase de 45 minutos con inicio, desarrollo, cierre y evaluacion rapida.' },
  { icon: PenLine, label: 'Preguntas', prompt: 'Genera 5 preguntas de analisis y 3 preguntas de refuerzo para este tema.' },
  { icon: FileText, label: 'Resumen', prompt: 'Resume el tema en lenguaje sencillo y agrega un ejemplo para estudiantes.' },
  { icon: Lightbulb, label: 'Actividad', prompt: 'Propone una actividad grupal breve con criterios de logro.' },
  { icon: Sparkles, label: 'Rubrica', prompt: 'Crea una rubrica sencilla de participacion y comprension.' },
  { icon: Sparkles, label: 'Refuerzo', prompt: 'Dame una actividad de refuerzo para estudiantes con bajo rendimiento.' },
];

const assistantReply = (text, courseTitle) => {
  const topic = courseTitle || 'el curso';
  return `Claro. Para ${topic}, te propongo una respuesta docente lista para adaptar:\n\n1. Inicia con una pregunta breve para activar conocimientos previos.\n2. Presenta el concepto central con un ejemplo cercano al aula.\n3. Pide una evidencia concreta para comprobar comprension.\n4. Cierra con una pregunta de salida o mini quiz.\n\nTambien puedo convertir esto en una sesion completa, rubrica o ficha de trabajo.`;
};

const createWelcomeMessage = () => ({
  id: 1,
  role: 'assistant',
  text: 'Hola, soy tu asistente docente. Puedo ayudarte a preparar clases, crear preguntas, adaptar recursos y analizar dificultades del aula.',
  time: 'Ahora',
});

const createNewChat = (title = 'Nuevo chat docente') => ({
  id: Date.now(),
  title,
  updatedAt: 'Ahora',
  messages: [createWelcomeMessage()],
});

const TeacherCourseChatPanel = ({ course }) => {
  const messagesEndRef = useRef(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [drawerView, setDrawerView] = useState('history');
  const [chats, setChats] = useState(() => {
    const initialChat = createNewChat('Planificacion inicial');
    return [initialChat];
  });
  const [activeChatId, setActiveChatId] = useState(() => null);
  const [input, setInput] = useState('');

  const courseTitle = course?.title || 'Curso seleccionado';

  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  const messages = activeChat?.messages || [];

  useEffect(() => {
    if (!activeChatId && chats[0]?.id) {
      setActiveChatId(chats[0].id);
    }
  }, [activeChatId, chats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const updateActiveChat = (updater) => {
    setChats((prev) => prev.map((chat) => {
      if (chat.id !== activeChat?.id) return chat;
      return updater(chat);
    }));
  };

  const sendMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;

    const now = Date.now();
    updateActiveChat((chat) => {
      const hasOnlyWelcome = chat.messages.length <= 1;
      return {
        ...chat,
        title: hasOnlyWelcome ? cleanText.slice(0, 42) : chat.title,
        updatedAt: 'Ahora',
        messages: [
          ...chat.messages,
          { id: now, role: 'teacher', text: cleanText, time: 'Ahora' },
          { id: now + 1, role: 'assistant', text: assistantReply(cleanText, courseTitle), time: 'Ahora' },
        ],
      };
    });
    setInput('');
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

  const handleReset = () => {
    const nextChat = createNewChat('Nuevo chat docente');
    nextChat.messages[0].text = 'Nueva conversacion lista. Puedes pedirme una sesion, quiz, retroalimentacion o actividad.';
    setChats((prev) => [nextChat, ...prev]);
    setActiveChatId(nextChat.id);
    setInput('');
  };

  const handleDeleteChat = (chatId) => {
    setChats((prev) => {
      const next = prev.filter((chat) => chat.id !== chatId);
      if (next.length === 0) {
        const fallback = createNewChat('Nuevo chat docente');
        setActiveChatId(fallback.id);
        return [fallback];
      }
      if (chatId === activeChatId) setActiveChatId(next[0].id);
      return next;
    });
  };

  const openDrawer = (view) => {
    setDrawerView(view);
    setToolsOpen(true);
  };

  return (
    <section className="relative h-[calc(100vh-132px)] min-h-[500px] bg-white rounded-b-xl overflow-hidden flex flex-col">
      <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-2.5 md:px-5">
        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Chat IA docente</h1>
              <p className="text-xs text-gray-500 truncate max-w-[520px]">{activeChat?.title || 'Planifica, crea actividades y adapta recursos sin salir del curso.'}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openDrawer('history')}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-3 text-sm text-sky-700 hover:bg-sky-100"
            >
              <PanelRightOpen className="w-4 h-4" />
              Historial
            </button>
            <button
              type="button"
              onClick={() => openDrawer('info')}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Info className="w-4 h-4" />
              Info
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
          </div>
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {quickPrompts.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => sendMessage(item.prompt)}
                className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto bg-[#f7f9fc] px-4 py-4">
        <div className="mx-auto max-w-4xl space-y-4">
          {messages.length <= 1 && (
            <div className="mx-auto max-w-2xl text-center py-3">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Que quieres preparar hoy?</h2>
              <p className="mt-2 text-sm text-gray-500">Elige una sugerencia o escribe tu consulta. El historial se guardara durante esta sesion.</p>
            </div>
          )}
          {messages.map((message) => {
            const isTeacher = message.role === 'teacher';
            return (
              <div key={message.id} className={`flex gap-3 ${isTeacher ? 'justify-end' : 'justify-start'}`}>
                {!isTeacher && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div className={`max-w-[min(760px,84%)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isTeacher
                    ? 'bg-sky-600 text-white rounded-br-md'
                    : 'bg-white border border-gray-200 text-gray-700 rounded-bl-md'
                }`}
                >
                  {!isTeacher && <div className="mb-2 text-xs font-semibold text-sky-600">EduIA Docente</div>}
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <div className={`mt-2 text-[11px] ${isTeacher ? 'text-sky-100' : 'text-gray-400'}`}>
                    {message.time}
                  </div>
                </div>
                {isTeacher && (
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-semibold">
                    P
                  </div>
                )}
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
              placeholder="Pregunta algo para preparar tu clase..."
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
              aria-label="Enviar mensaje"
              disabled={!input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-2 text-center text-[11px] text-gray-400">
            Enter para enviar. Shift + Enter para nueva linea.
          </div>
        </div>
      </form>

      {toolsOpen && (
        <>
          <button
            type="button"
            className="absolute inset-0 z-10 bg-black/10"
            aria-label="Cerrar herramientas"
            onClick={() => setToolsOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 z-20 w-full max-w-sm border-l border-gray-200 bg-white shadow-2xl flex flex-col">
            <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                  {drawerView === 'history' ? (
                    <History className="w-5 h-5 text-sky-600" />
                  ) : (
                    <Info className="w-5 h-5 text-violet-600" />
                  )}
                  {drawerView === 'history' ? 'Historial de chats' : 'Informacion y herramientas'}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {drawerView === 'history'
                    ? 'Cambia entre conversaciones guardadas durante esta sesion.'
                    : 'Consulta el contexto del curso y usa acciones rapidas.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setToolsOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Cerrar herramientas"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {drawerView === 'history' ? (
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                      <History className="w-4 h-4 text-sky-600" />
                      Chats
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Nuevo
                    </button>
                  </div>
                  <div className="space-y-2">
                    {chats.map((chat) => (
                      <div
                        key={chat.id}
                        className={`group flex items-center gap-2 rounded-lg border px-3 py-2 ${
                          chat.id === activeChat?.id
                            ? 'border-sky-200 bg-sky-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setActiveChatId(chat.id);
                            setToolsOpen(false);
                          }}
                          className="min-w-0 flex-1 text-left"
                        >
                          <div className="truncate text-sm font-semibold text-gray-700">{chat.title}</div>
                          <div className="text-xs text-gray-400">{chat.updatedAt} - {chat.messages.length} mensajes</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteChat(chat.id)}
                          className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                          aria-label="Eliminar chat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                      <Wand2 className="w-4 h-4 text-violet-600" />
                      Acciones rapidas
                    </div>
                    <div className="space-y-2">
                      {[
                        'Crear rubrica de participacion',
                        'Adaptar explicacion a nivel basico',
                        'Generar actividad de salida',
                        'Crear retroalimentacion para bajo rendimiento',
                        'Crear mini quiz de 5 preguntas',
                      ].map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => {
                            sendMessage(text);
                            setToolsOpen(false);
                          }}
                          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-600 hover:bg-violet-50 hover:border-violet-200"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                      <MessageSquareText className="w-4 h-4" />
                      Consejo
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      Para mejores respuestas, menciona grado, tiempo disponible, objetivo y producto esperado.
                    </p>
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </section>
  );
};

export default TeacherCourseChatPanel;
