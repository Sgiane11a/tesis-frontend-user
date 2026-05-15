import React from 'react';
import { Sparkles } from 'lucide-react';

const ChatAvatar = ({ type = 'assistant' }) => {
  if (type === 'teacher') {
    return (
      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white text-xs font-semibold">
        P
      </div>
    );
  }

  return (
    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
      <Sparkles className="w-4 h-4" />
    </div>
  );
};

export default ChatAvatar;
