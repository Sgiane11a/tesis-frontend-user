import React from 'react';
import { Icon } from '../atoms/Icon';
import { Text } from '../atoms/Text';

const FaqItem = ({ question, iconName, onClick }) => {
  return (
    <button 
      onClick={onClick}
      // CAMBIOS: Padding reducido de p-4 a p-3 y gap de 4 a 3.
      className="w-full text-left p-3 flex items-center gap-3 border border-gray-200 rounded-lg hover:bg-primary-light hover:border-primary-dark hover:shadow-md transform hover:-translate-y-px transition-all duration-300 group"
    >
      <div className="bg-gray-100 p-2 rounded-md group-hover:bg-white">
          <Icon name={iconName} size={18} className="text-gray-500 group-hover:text-primary-dark" />
      </div>
      <Text size="sm" weight="medium" className="group-hover:text-primary-dark">{question}</Text>
    </button>
  );
};

export { FaqItem };
export {};