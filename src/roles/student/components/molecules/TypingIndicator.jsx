import React from 'react';
import { Avatar } from '../atoms/Avatar';

const TUTOR_AVATAR_URL = 'https://i.imgur.com/3j3Rf7T.png';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={TUTOR_AVATAR_URL} alt="Tutor" />
      <div className="flex items-center space-x-1.5 p-3 rounded-lg bg-gray-200">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
      </div>
    </div>
  );
};

export { TypingIndicator };
export {};