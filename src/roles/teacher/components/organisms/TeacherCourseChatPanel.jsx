import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildTeacherAssistantReply,
  createTeacherChat,
  teacherChatCopy,
  teacherChatQuickActions,
  teacherChatQuickPrompts,
} from '../../mocks';
import {
  ChatComposer,
  ChatDrawer,
  ChatHeader,
  ChatMessages,
  promptIconMap,
} from '../molecules/chat';

const TeacherCourseChatPanel = ({ course }) => {
  const messagesEndRef = useRef(null);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [drawerView, setDrawerView] = useState('history');
  const [chats, setChats] = useState(() => [createTeacherChat('Planificacion inicial')]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');

  const courseTitle = course?.title || 'Curso seleccionado';
  const activeChat = chats.find((chat) => chat.id === activeChatId) || chats[0];
  const messages = activeChat?.messages || [];

  const prompts = useMemo(
    () => teacherChatQuickPrompts.map((item) => ({
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
          { id: now, role: 'teacher', text: cleanText, time: 'Ahora' },
          {
            id: now + 1,
            role: 'assistant',
            text: buildTeacherAssistantReply(courseTitle),
            time: 'Ahora',
          },
        ],
      };
    });
    setInput('');
  };

  const createChat = () => {
    const nextChat = createTeacherChat('Nuevo chat docente');
    nextChat.messages[0].text = teacherChatCopy.newChat;
    setChats((prev) => [nextChat, ...prev]);
    setActiveChatId(nextChat.id);
    setInput('');
  };

  const deleteChat = (chatId) => {
    setChats((prev) => {
      const next = prev.filter((chat) => chat.id !== chatId);

      if (next.length === 0) {
        const fallback = createTeacherChat('Nuevo chat docente');
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
    <section className="relative h-[calc(100vh-132px)] min-h-[500px] bg-white rounded-b-xl overflow-hidden flex flex-col">
      <ChatHeader
        activeTitle={activeChat?.title}
        prompts={prompts}
        onPromptClick={sendMessage}
        onOpenDrawer={openDrawer}
        onNewChat={createChat}
      />

      <ChatMessages
        copy={teacherChatCopy}
        messages={messages}
        messagesEndRef={messagesEndRef}
      />

      <ChatComposer
        input={input}
        onChange={setInput}
        onKeyDown={handleInputKeyDown}
        onSubmit={handleSubmit}
      />

      {toolsOpen && (
        <ChatDrawer
          activeChatId={activeChat?.id}
          chats={chats}
          copy={teacherChatCopy}
          quickActions={teacherChatQuickActions}
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

export default TeacherCourseChatPanel;
