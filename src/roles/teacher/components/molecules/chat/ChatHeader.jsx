import React from 'react';
import { Bot, Info, PanelRightOpen, Plus } from 'lucide-react';
import { ChatIconButton } from '../../atoms/chat';

const ChatHeader = ({ activeTitle, prompts, onPromptClick, onOpenDrawer, onNewChat }) => (
  <header className="shrink-0 border-b border-gray-100 bg-white px-4 py-2.5 md:px-5">
    <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">Chat IA docente</h1>
          <p className="text-xs text-gray-500 truncate max-w-[520px]">
            {activeTitle || 'Planifica, crea actividades y adapta recursos sin salir del curso.'}
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
            <Icon className="w-4 h-4" />
            {label}
          </span>
        </button>
      ))}
    </div>
  </header>
);

export default ChatHeader;
