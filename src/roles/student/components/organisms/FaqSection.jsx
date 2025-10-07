
import React from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';
import { FaqItem } from '../molecules/FaqItem';

const questions = [
  { text: '¿Cuál es el mejor método de estudio?', icon: 'lightbulb' },
  { text: '¿Cómo puedo sacar mejores notas?', icon: 'trending-up' },
  { text: 'Recomiéndame una técnica de estudio', icon: 'book' },
  { text: '¿Cuáles son las mejores horas para estudiar?', icon: 'clock' },
];

// ACEPTA NUEVAS PROPS: isOpen y onToggle
const FaqSection = ({ onQuestionClick, isOpen, onToggle }) => {
  return (
    <Card className="p-4 bg-white/60 backdrop-blur-lg border-gray-200 shadow-lg">
      {/* CABECERA SIEMPRE VISIBLE Y CLICABLE */}
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center"
      >
        <Text weight="bold">Ideas para empezar</Text>
        <Icon 
          name="chevron-up"
          size={20}
          className={`text-gray-500 transition-transform duration-300 ${!isOpen && 'rotate-180'}`}
        />
      </button>

      {/* CONTENIDO COLAPSIBLE */}
      {/* Se muestra solo si 'isOpen' es verdadero */}
      {isOpen && (
        <div className="mt-3 space-y-2">
            <Text size="sm" color="muted" className="mb-2 px-1">
              Haz clic en una pregunta para iniciar la conversación.
            </Text>
            {questions.map((q, index) => (
            <FaqItem 
                key={index} 
                question={q.text} 
                iconName={q.icon}
                onClick={() => onQuestionClick(q.text)}
            />
            ))}
        </div>
      )}
    </Card>
  );
};

export { FaqSection };
export {};