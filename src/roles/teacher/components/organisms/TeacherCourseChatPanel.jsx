import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';

const TeacherCourseChatPanel = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hola, puedo ayudarte a preparar material, actividades o ideas para tu clase.',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: 'teacher', text },
      {
        id: Date.now() + 1,
        role: 'assistant',
        text: 'Respuesta temporal del asistente docente. Esta vista ya pertenece solo al perfil profesor.',
      },
    ]);
    setInput('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Chat IA docente</h2>
          <p className="text-xs text-gray-500">Herramienta de apoyo para preparar la clase.</p>
        </div>
      </div>

      <div className="h-[360px] overflow-y-auto bg-gray-50 px-5 py-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] rounded-lg px-4 py-2 text-sm ${
              message.role === 'teacher'
                ? 'ml-auto bg-sky-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700'
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
          placeholder="Escribe una consulta para la IA..."
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
          aria-label="Enviar mensaje"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default TeacherCourseChatPanel;
