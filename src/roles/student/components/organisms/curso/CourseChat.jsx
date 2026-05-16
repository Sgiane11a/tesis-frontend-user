import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bot,
  BookOpen,
  ClipboardList,
  History,
  Info,
  Lightbulb,
  MessageSquareText,
  Mic,
  MicOff,
  PanelRightOpen,
  PenLine,
  Plus,
  Send,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from 'lucide-react';
import { useVoiceInput } from '../../../../../hooks/useVoiceInput';

const promptIconMap = {
  book: BookOpen,
  clipboard: ClipboardList,
  lightbulb: Lightbulb,
  pen: PenLine,
  sparkles: Sparkles,
};

const studentChatQuickPrompts = [
  {
    icon: 'lightbulb',
    label: 'Explícame',
    prompt: 'Explícame este tema con palabras simples y un ejemplo cotidiano.',
  },
  {
    icon: 'pen',
    label: 'Practicar',
    prompt: 'Dame 3 ejercicios cortos para practicar y luego revisa mis respuestas.',
  },
  {
    icon: 'book',
    label: 'Resumen',
    prompt: 'Hazme un resumen breve con las ideas más importantes del tema.',
  },
  {
    icon: 'clipboard',
    label: 'Antes del reto',
    prompt: 'Prepárame para el reto con una guía rápida y preguntas de repaso.',
  },
  {
    icon: 'sparkles',
    label: 'Plan',
    prompt: 'Organiza un plan de estudio de 20 minutos para este curso.',
  },
];

const studentChatQuickActions = [
  'Explicar paso a paso',
  'Crear mini quiz de 5 preguntas',
  'Dar pistas sin resolver completo',
  'Resumir lo visto en clase',
  'Prepararme para el reto',
];

const studentChatCopy = {
  welcome:
    'Hola, soy tu tutor de IA. Puedo ayudarte a entender temas, practicar ejercicios, preparar retos y organizar tu estudio.',
  newChat:
    'Nueva conversación lista. Puedes preguntarme una duda, pedirme ejercicios o repasar para tu siguiente reto.',
  emptyTitle: '¿Qué quieres aprender hoy?',
  emptyDescription:
    'Elige una sugerencia o escribe tu pregunta. Tu historial se guardará durante esta sesión.',
  advice:
    'Para mejores respuestas, escribe el tema, qué parte no entiendes y si quieres explicación, ejercicios o resumen.',
};

const createStudentWelcomeMessage = () => ({
  id: 1,
  role: 'assistant',
  text: studentChatCopy.welcome,
  time: 'Ahora',
});

const createStudentChat = (title = 'Nuevo chat de estudio') => ({
  id: Date.now(),
  title,
  updatedAt: 'Ahora',
  messages: [createStudentWelcomeMessage()],
});

const buildStudentAssistantReply = (courseTitle) => {
  const topic = courseTitle || 'este curso';

  return `Claro. Para ${topic}, trabajémoslo como tutoría:\n\n1. Primero identificamos la idea principal.\n2. Luego vemos un ejemplo sencillo.\n3. Después haces un ejercicio corto para comprobar que lo entendiste.\n4. Si te equivocas, te doy una pista y lo corregimos paso a paso.\n\nTambién puedo convertir esto en resumen, mini quiz o plan de repaso.`;
};

const ChatIconButton = ({ children, icon: Icon, onClick, variant = 'default' }) => {
  const variants = {
    default: 'border-gray-200 bg-white text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700',
    primary: 'border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${variants[variant]}`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
};

const ChatAvatar = ({ type = 'assistant' }) => (
  <div
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
      type === 'student'
        ? 'bg-indigo-100 text-indigo-700'
        : 'bg-sky-100 text-sky-700'
    }`}
  >
    {type === 'student' ? 'AL' : 'IA'}
  </div>
);

const StudentChatHeader = ({ activeTitle, prompts, onPromptClick, onOpenDrawer, onNewChat }) => (
  <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-2.5 md:px-5">
    <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Chat IA del curso</h1>
          <p className="max-w-[520px] truncate text-xs text-gray-500">
            {activeTitle || 'Resuelve dudas, practica y prepara retos sin salir del curso.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ChatIconButton icon={PanelRightOpen} variant="primary" onClick={() => onOpenDrawer('history')}>
          Historial
        </ChatIconButton>
        <ChatIconButton icon={Info} onClick={() => onOpenDrawer('info')}>
          Info
        </ChatIconButton>
        <ChatIconButton icon={Plus} onClick={onNewChat}>
          Nuevo
        </ChatIconButton>
      </div>
    </div>

    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
      {prompts.map(({ Icon, label, prompt }) => (
        <button
          key={label}
          type="button"
          onClick={() => onPromptClick(prompt)}
          className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {label}
          </span>
        </button>
      ))}
    </div>
  </header>
);

const StudentChatMessages = ({ messages, copy, messagesEndRef }) => (
  <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7f9fc] px-4 py-4">
    <div className="mx-auto max-w-4xl space-y-4">
      {messages.length <= 1 && (
        <div className="mx-auto max-w-2xl py-3 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{copy.emptyTitle}</h2>
          <p className="mt-2 text-sm text-gray-500">{copy.emptyDescription}</p>
        </div>
      )}

      {messages.map((message) => {
        const isStudent = message.role === 'student';

        return (
          <div key={message.id} className={`flex gap-3 ${isStudent ? 'justify-end' : 'justify-start'}`}>
            {!isStudent && <ChatAvatar />}
            <div
              className={`max-w-[min(760px,84%)] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                isStudent
                  ? 'rounded-br-md bg-sky-600 text-white'
                  : 'rounded-bl-md border border-gray-200 bg-white text-gray-700'
              }`}
            >
              {!isStudent && <div className="mb-2 text-xs font-semibold text-sky-600">EduIA Tutor</div>}
              <p className="whitespace-pre-wrap">{message.text}</p>
              <div className={`mt-2 text-[11px] ${isStudent ? 'text-sky-100' : 'text-gray-400'}`}>
                {message.time}
              </div>
            </div>
            {isStudent && <ChatAvatar type="student" />}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  </div>
);

const StudentChatComposer = ({ input, onChange, onSubmit, onKeyDown }) => {
  const { isListening, isSupported, startListening, stopListening } = useVoiceInput();

  const handleVoiceStart = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        onChange(transcript);
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="shrink-0 border-t border-gray-100 bg-white px-4 py-3">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2 shadow-sm focus-within:border-sky-300 focus-within:ring-2 focus-within:ring-sky-100">
          {isSupported && (
            <button
              type="button"
              onClick={handleVoiceStart}
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                isListening
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              aria-label={isListening ? 'Detener grabación' : 'Iniciar grabación'}
              title={isListening ? 'Escuchando...' : 'Hablar (presiona para activar micrófono)'}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          )}
          <textarea
            value={input}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            placeholder="Pregunta algo sobre el curso..."
          />
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
          Enter para enviar. Shift + Enter para nueva línea.
        </div>
      </div>
    </form>
  );
};

const StudentChatDrawer = ({
  activeChatId,
  chats,
  copy,
  onClose,
  onDeleteChat,
  onNewChat,
  onQuickAction,
  onSelectChat,
  quickActions,
  view,
}) => (
  <>
    <button
      type="button"
      className="absolute inset-0 z-10 bg-black/10"
      aria-label="Cerrar herramientas"
      onClick={onClose}
    />
    <aside className="absolute inset-y-0 right-0 z-20 flex w-full max-w-sm flex-col border-l border-gray-200 bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
            {view === 'history' ? (
              <History className="h-5 w-5 text-sky-600" />
            ) : (
              <Info className="h-5 w-5 text-violet-600" />
            )}
            {view === 'history' ? 'Historial de chats' : 'Información y herramientas'}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {view === 'history'
              ? 'Cambia entre conversaciones guardadas durante esta sesión.'
              : 'Usa acciones rápidas para estudiar mejor.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Cerrar herramientas"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {view === 'history' ? (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <History className="h-4 w-4 text-sky-600" />
                Chats
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
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`group flex items-center gap-2 rounded-lg border px-3 py-2 ${
                    chat.id === activeChatId
                      ? 'border-sky-200 bg-sky-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onSelectChat(chat.id)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="truncate text-sm font-semibold text-gray-700">{chat.title}</div>
                    <div className="text-xs text-gray-400">{chat.updatedAt} - {chat.messages.length} mensajes</div>
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
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Wand2 className="h-4 w-4 text-violet-600" />
                Acciones rápidas
              </div>
              <div className="space-y-2">
                {quickActions.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => onQuickAction(text)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-600 hover:border-violet-200 hover:bg-violet-50"
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-sky-100 bg-sky-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-sky-800">
                <MessageSquareText className="h-4 w-4" />
                Consejo
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{copy.advice}</p>
            </div>
          </>
        )}
      </div>
    </aside>
  </>
);

const CourseChat = ({ course }) => {
  const messagesEndRef = useRef(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [drawerView, setDrawerView] = useState('history');
  const [chats, setChats] = useState(() => [createStudentChat('Repaso inicial')]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');

  const courseTitle = course?.title || 'este curso';
  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  const messages = activeChat?.messages || [];

  const prompts = useMemo(
    () => studentChatQuickPrompts.map((item) => ({
      ...item,
      Icon: promptIconMap[item.icon] || promptIconMap.sparkles,
    })),
    []
  );

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
          { id: now, role: 'student', text: cleanText, time: 'Ahora' },
          {
            id: now + 1,
            role: 'assistant',
            text: buildStudentAssistantReply(courseTitle),
            time: 'Ahora',
          },
        ],
      };
    });
    setInput('');
  };

  const createChat = () => {
    const nextChat = createStudentChat('Nuevo chat de estudio');
    nextChat.messages[0].text = studentChatCopy.newChat;
    setChats((prev) => [nextChat, ...prev]);
    setActiveChatId(nextChat.id);
    setInput('');
  };

  const deleteChat = (chatId) => {
    setChats((prev) => {
      const next = prev.filter((chat) => chat.id !== chatId);

      if (next.length === 0) {
        const fallback = createStudentChat('Nuevo chat de estudio');
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

  const selectChat = (chatId) => {
    setActiveChatId(chatId);
    setToolsOpen(false);
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

  const handleQuickAction = (text) => {
    sendMessage(text);
    setToolsOpen(false);
  };

  return (
    <section className="relative flex h-[calc(100vh-132px)] min-h-[500px] flex-col overflow-hidden rounded-b-xl bg-white">
      <StudentChatHeader
        activeTitle={activeChat?.title}
        prompts={prompts}
        onPromptClick={sendMessage}
        onOpenDrawer={openDrawer}
        onNewChat={createChat}
      />

      <StudentChatMessages
        copy={studentChatCopy}
        messages={messages}
        messagesEndRef={messagesEndRef}
      />

      <StudentChatComposer
        input={input}
        onChange={setInput}
        onKeyDown={handleInputKeyDown}
        onSubmit={handleSubmit}
      />

      {toolsOpen && (
        <StudentChatDrawer
          activeChatId={activeChat?.id}
          chats={chats}
          copy={studentChatCopy}
          quickActions={studentChatQuickActions}
          view={drawerView}
          onClose={() => setToolsOpen(false)}
          onDeleteChat={deleteChat}
          onNewChat={createChat}
          onQuickAction={handleQuickAction}
          onSelectChat={selectChat}
        />
      )}
    </section>
  );
};

export default CourseChat;
