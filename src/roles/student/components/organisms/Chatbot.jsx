// src/roles/student/components/organisms/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Avatar } from '../atoms/Avatar';
import { ChatMessage } from '../molecules/ChatMessage';
import { ChatInput } from '../molecules/ChatInput';
import { TypingIndicator } from '../molecules/TypingIndicator';

const TUTOR_AVATAR_URL = 'https://i.imgur.com/3j3Rf7T.png';

/**
 * Componente de presentación para la interfaz del chatbot.
 * Recibe los mensajes y las acciones a ejecutar desde un componente padre.
 * @param {Array} messages - La lista de mensajes a mostrar.
 * @param {Function} onSendMessage - Función a llamar cuando el usuario envía un mensaje.
 * @param {boolean} isTyping - Si el bot está "escribiendo".
 * @param {string} userName - El nombre del usuario actual.
 * @param {React.ReactNode} headerActions - Componentes extra (como botones) para mostrar en la cabecera.
 */
const Chatbot = ({ messages = [], onSendMessage, isTyping, userName, headerActions }) => {
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);

  // Efecto para hacer scroll automático hasta el último mensaje
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Maneja el envío del formulario de input
  const handleSend = () => {
    if (inputValue.trim() === '' || isTyping) return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <Card className="flex flex-col h-full shadow-2xl rounded-2xl overflow-hidden border-none">
      {/* Header del Chat: ahora con un espacio para acciones */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-white z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar src={TUTOR_AVATAR_URL} alt="Tutor" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <div>
            <Text weight="semibold" size="sm">EduIA Tutor</Text>
            <Text size="xs" color="muted">En línea</Text>
          </div>
        </div>
        {/* Renderiza aquí los botones o acciones que se le pasen */}
        <div>{headerActions}</div>
      </div>
      
      {/* Área de Mensajes con Scroll Interno */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50/70"
      >
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isTutor={msg.sender === 'tutor'}
            userName={userName} 
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
      
      {/* Input del Chat */}
      <div className="shrink-0">
        <ChatInput 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSend={handleSend}
          disabled={isTyping}
        />
      </div>
    </Card>
  );
};

export { Chatbot };
export {};