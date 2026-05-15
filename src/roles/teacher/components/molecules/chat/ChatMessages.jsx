import React from 'react';
import { Sparkles } from 'lucide-react';
import { ChatAvatar } from '../../atoms/chat';

const ChatMessages = ({ messages, copy, messagesEndRef }) => (
  <div className="flex-1 min-h-0 overflow-y-auto bg-[#f7f9fc] px-4 py-4">
    <div className="mx-auto max-w-4xl space-y-4">
      {messages.length <= 1 && (
        <div className="mx-auto max-w-2xl text-center py-3">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{copy.emptyTitle}</h2>
          <p className="mt-2 text-sm text-gray-500">{copy.emptyDescription}</p>
        </div>
      )}

      {messages.map((message) => {
        const isTeacher = message.role === 'teacher';

        return (
          <div key={message.id} className={`flex gap-3 ${isTeacher ? 'justify-end' : 'justify-start'}`}>
            {!isTeacher && <ChatAvatar />}
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
            {isTeacher && <ChatAvatar type="teacher" />}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  </div>
);

export default ChatMessages;
