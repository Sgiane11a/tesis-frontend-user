import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatHeader } from '../../molecules/ChatHeader';
import { ChatMessage } from '../../molecules/ChatMessage';
import { ChatInput } from '../../molecules/ChatInput';
import { HistoryList } from '../../molecules/HistoryList';
import { Button } from '../../atoms/Button';
import { Card } from '../../atoms/Card';

const initialMessages = [
  { id: 1, sender: 'bot', text: '¡Hola! Soy tu tutor personal de inteligencia artificial. ¿En qué puedo ayudarte hoy?', time: 'Ahora' },
];

const sampleHistory = [
  { id: 'h1', title: 'Raíces cuadradas', date: '2 hrs' },
  { id: 'h2', title: 'Introducción a las ecuaciones', date: '1 día' },
];

const CourseChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(sampleHistory);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const listRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [availableHeight, setAvailableHeight] = useState(null);

  useEffect(() => {
    const calcHeight = () => {
      const header = document.getElementById('course-header');
      if (!header) {
        setAvailableHeight(null);
        return;
      }
      const rect = header.getBoundingClientRect();
      // queremos que el chat baje hasta que el bottom del header alcance el top de la mini-navegacion
      // tomamos la distancia desde el top de la ventana hasta el bottom del header
  const headerBottom = rect.bottom;
  // restamos un pequeño margen (16px) y además reducimos 20px extra en total (solicitud: -10px más)
  const height = `calc(100vh - ${headerBottom + 36}px)`;
      setAvailableHeight(height);
    };

    calcHeight();
    window.addEventListener('resize', calcHeight);
    const ro = new ResizeObserver(calcHeight);
    const headerEl = document.getElementById('course-header');
    if (headerEl) ro.observe(headerEl);

    return () => {
      window.removeEventListener('resize', calcHeight);
      if (headerEl) ro.disconnect();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const send = useCallback(() => {
    if (!input.trim()) return;
    const next = { id: Date.now(), sender: 'user', text: input.trim(), time: 'Ahora' };
    setMessages(prev => [...prev, next]);
    setInput('');

    // simulate bot
    setIsBotTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Respuesta automática: ' + next.text, time: 'Ahora' }]);
      setIsBotTyping(false);
    }, 800);
  }, [input]);

  const handleSelectHistory = (item) => {
    // load a quick thread into messages (demo)
    setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: `Cargando tema: ${item.title}`, time: 'Ahora' }]);
  };

  // Igualar alturas exactas (pixel-perfect) entre columna izquierda y derecha
  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;
    // Dejamos que el layout termine de pintar
    const t = setTimeout(() => {
      try {
        const leftRect = leftRef.current.getBoundingClientRect();
        const rightRect = rightRef.current.getBoundingClientRect();
        const leftH = Math.round(leftRect.height);
        const rightH = Math.round(rightRect.height);
        const target = Math.min(leftH, rightH);
        // aplicamos la altura exacta en px a ambos wrappers
        leftRef.current.style.height = `${target}px`;
        rightRef.current.style.height = `${target}px`;
      } catch (e) {
        // noop
      }
    }, 50);

    return () => clearTimeout(t);
  }, [availableHeight, messages, history]);

  return (
    <div className="flex gap-6">
      {/* Chat principal (mismo layout y tamaño que Chatbot) - wrapper con ref */}
      <div ref={leftRef} style={{ height: availableHeight || 'calc(100vh - 10rem - 20px)', marginBottom: '-24px', boxSizing: 'border-box' }} className="flex-1">
        <Card className="flex flex-col shadow-2xl rounded-2xl overflow-hidden border-none h-full">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-white z-10 shrink-0">
            <ChatHeader />
          </div>

          <div ref={listRef} className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50/70 thin-scroll">
            {messages.map(m => (
              <ChatMessage key={m.id} message={m.text} isTutor={m.sender === 'bot'} />
            ))}
            {isBotTyping && (
              <div className="text-sm text-gray-400">EduIA está escribiendo...</div>
            )}
          </div>

          <div className="shrink-0">
            <ChatInput value={input} onChange={(e) => setInput(e.target.value)} onSend={send} disabled={isBotTyping} />
          </div>
        </Card>
      </div>

      {/* Panel derecho - Historial */}
  {/* ocultar historial en pantallas pequeñas para priorizar el chat */}
  <div ref={rightRef} className="hidden md:flex bg-white rounded border border-gray-200 shadow-sm p-4 flex-col" style={{ height: availableHeight || 'calc(100vh - 10rem - 20px)', marginBottom: '-24px', width: 'calc(20rem - 6px)', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-gray-800">Historial</div>
        </div>

  <div className="flex-1 overflow-y-auto thin-scroll">
          <HistoryList
            items={history.map(h => ({ ...h, icon: 'chat', active: false }))}
            onSelect={handleSelectHistory}
            onCreate={(it) => setHistory(prev => [...prev, it])}
            onEdit={(it) => setHistory(prev => prev.map(h => h.id === it.id ? it : h))}
            onDelete={(it) => setHistory(prev => prev.filter(h => h.id !== it.id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseChat;
