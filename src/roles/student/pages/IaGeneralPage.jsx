
import React, { useState } from 'react';
import { Chatbot } from '../components/organisms/Chatbot';
import { InfoSidebar } from '../components/organisms/InfoSidebar';
import { SidebarToggleButton } from '../components/molecules/SidebarToggleButton';

// Datos de ejemplo para el historial
const initialChatSessions = [
  { id: 1, title: 'Mejores métodos de estudio', date: 'Ayer', messages: [ { sender: 'tutor', text: '¡Hola! Soy EduIA, ¿listo para aprender?' }, { sender: 'user', text: '¿Cuál es el mejor método de estudio?' }, { sender: 'tutor', text: 'El método Feynman es excelente. Consiste en explicar un tema con palabras sencillas.' }, ], },
  { id: 2, title: 'Técnicas de concentración', date: 'Hace 2 días', messages: [ { sender: 'tutor', text: 'Bienvenido de nuevo. ¿En qué te ayudo?' }, ], }
];

const IaGeneralPage = () => {
  const [chatSessions, setChatSessions] = useState(initialChatSessions);
  const [activeChatId, setActiveChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const userName = "Alejandra";
  const activeChat = chatSessions.find(session => session.id === activeChatId) || { messages: [] };

  const handleNewChat = () => {
    const newChatId = Date.now();
    const newChatSession = { id: newChatId, title: 'Nueva Conversación', date: 'Hoy', messages: [{ sender: 'tutor', text: '¡Empecemos una nueva conversación! ¿Qué tienes en mente?' }] };
    setChatSessions([newChatSession, ...chatSessions]);
    setActiveChatId(newChatId);
    setIsInfoPanelOpen(false);
  };

  const handleSendMessage = (messageText) => {
    const newUserMessage = { sender: 'user', text: messageText };
    const updatedSessions = chatSessions.map(session => {
      if (session.id === activeChatId) {
        const newTitle = session.title === 'Nueva Conversación' ? messageText.substring(0, 30) + '...' : session.title;
        return { ...session, title: newTitle, messages: [...session.messages, newUserMessage] };
      }
      return session;
    });
    setChatSessions(updatedSessions);
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = { sender: 'tutor', text: `Analizando tu pregunta sobre "${messageText}"...` };
      setChatSessions(currentSessions => currentSessions.map(session => session.id === activeChatId ? { ...session, messages: [...session.messages, botResponse] } : session));
      setIsTyping(false);
    }, 1500);
  };
  
  const handleFaqClick = (questionText) => {
    if (activeChat.messages.length > 1 && activeChat.title !== 'Nueva Conversación') {
        handleNewChat();
        setTimeout(() => handleSendMessage(questionText), 100);
    } else {
        handleSendMessage(questionText);
    }
    setIsInfoPanelOpen(false);
  }

  return (
    // CAMBIO CLAVE:
    // - `h-[calc(100vh-4rem-3rem)]`: Se calcula la altura disponible. 100vh (altura total) - 4rem (header) - 3rem (padding sup/inf).
    // Esto asegura que el contenedor no genere un scroll en la página principal.
    <div className="h-[calc(100vh-4rem-3rem)]">
      <div className="flex h-full gap-6">

        {/* --- COLUMNA PRINCIPAL IZQUIERDA: CHATBOT --- */}
        <main className="flex-1 h-full min-w-0">
          <Chatbot 
              messages={activeChat.messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
              userName={userName}
              headerActions={
                // Botón que SOLO aparece en pantallas pequeñas (`lg:hidden`)
                <div className="lg:hidden">
                    <SidebarToggleButton 
                      isOpen={isInfoPanelOpen}
                      onClick={() => setIsInfoPanelOpen(!isInfoPanelOpen)}
                    />
                </div>
              }
          />
        </main>
        
        {/* --- COLUMNA LATERAL DERECHA (Información) --- */}
        {/* Esta columna está OCULTA por defecto, y solo se muestra en pantallas grandes (`lg:block`) */}
        <div className="w-80 shrink-0 hidden lg:block">
           <InfoSidebar
            isPanelOpen={isInfoPanelOpen}
            sessions={chatSessions}
            activeChatId={activeChatId}
            onSelectChat={(id) => {
              setActiveChatId(id);
              setIsInfoPanelOpen(false);
            }}
            onNewChat={handleNewChat}
            onFaqClick={handleFaqClick}
          />
        </div>
      </div>

      {/* Overlay para móvil */}
      {isInfoPanelOpen && (
        <div 
          onClick={() => setIsInfoPanelOpen(false)}
          className="fixed inset-0 bg-black/40 z-10 lg:hidden"
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
};

export default IaGeneralPage;