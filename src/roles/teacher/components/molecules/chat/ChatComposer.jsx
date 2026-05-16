import React from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../../../../../hooks/useVoiceInput';

const ChatComposer = ({ input, onChange, onSubmit, onKeyDown }) => {
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
  );
};

export default ChatComposer;
