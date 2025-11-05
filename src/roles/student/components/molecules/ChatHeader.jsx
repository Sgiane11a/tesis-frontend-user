import React from 'react';
import { Avatar } from '../atoms/Avatar';
import { Text } from '../atoms/Text';
import { Icon } from '../atoms/Icon';

const ChatHeader = ({ name = 'EduIA Tutor', status = 'En línea · Responde en segundos' }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <Avatar name={name} size={'9'} />
        <div>
          <div className="text-sm font-medium text-gray-800">{name}</div>
          <div className="text-xs text-green-600">{status}</div>
        </div>
      </div>
      <div className="text-gray-400">
        <Icon name="sparkles" />
      </div>
    </div>
  );
};

export { ChatHeader };
