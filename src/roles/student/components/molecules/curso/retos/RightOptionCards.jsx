import React from 'react';

const Icon = ({ name }) => {
  switch (name) {
    case 'map':
      return (
        <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.894L9 2m6 18l5.447-2.724A2 2 0 0021 15.382V6.618a2 2 0 00-1.553-1.894L15 2M9 2v18M15 2v18" />
        </svg>
      );
    case 'quiz':
      return (
        <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h.01M12 9h.01M16 9h.01M9 13h6M4 6h16M4 18h16" />
        </svg>
      );
    case 'wordsearch':
      return (
        <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      );
    case 'flashcards':
      return (
        <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h12M3 12h12M3 17h12M21 7v10" />
        </svg>
      );
    default:
      return (
        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      );
  }
};

const RightOptionCards = ({ onSelect = () => {} }) => {
  const opts = [
    { key: 'map', label: 'Mapa', subtitle: 'Mental / Comparativo' },
    { key: 'quiz', label: 'Quiz', subtitle: 'Preguntas auto' },
    { key: 'wordsearch', label: 'Sopa', subtitle: 'Sopa de letras' },
    { key: 'flashcards', label: 'Tarjetas', subtitle: 'Flashcards' },
  ];

  return (
    <div className="space-y-3">
      {opts.map(o => (
        <button key={o.key} onClick={() => onSelect(o.key)} className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm text-left">
          <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-50">
            <Icon name={o.key} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">{o.label}</div>
            <div className="text-xs text-gray-500">{o.subtitle}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default RightOptionCards;
