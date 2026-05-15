import React from 'react';
import { History, Info, MessageSquareText, Plus, Trash2, Wand2, X } from 'lucide-react';

const ChatDrawer = ({
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
    <aside className="absolute inset-y-0 right-0 z-20 w-full max-w-sm border-l border-gray-200 bg-white shadow-2xl flex flex-col">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
            {view === 'history' ? (
              <History className="w-5 h-5 text-sky-600" />
            ) : (
              <Info className="w-5 h-5 text-violet-600" />
            )}
            {view === 'history' ? 'Historial de chats' : 'Informacion y herramientas'}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {view === 'history'
              ? 'Cambia entre conversaciones guardadas durante esta sesion.'
              : 'Usa acciones rapidas para preparar material docente.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          aria-label="Cerrar herramientas"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {view === 'history' ? (
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <History className="w-4 h-4 text-sky-600" />
                Chats
              </div>
              <button
                type="button"
                onClick={onNewChat}
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
                {quickActions.map((text) => (
                  <button
                    key={text}
                    type="button"
                    onClick={() => onQuickAction(text)}
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
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{copy.advice}</p>
            </div>
          </>
        )}
      </div>
    </aside>
  </>
);

export default ChatDrawer;
