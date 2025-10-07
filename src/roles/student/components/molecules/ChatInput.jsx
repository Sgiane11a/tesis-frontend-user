// src/roles/student/components/molecules/ChatInput.jsx (ACTUALIZADO)
import React from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

const ChatInput = ({ value, onChange, onSend, disabled }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disabled) {
      onSend();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative p-3 border-t border-gray-200 bg-white">
      <Input
        placeholder={disabled ? "EduIA está escribiendo..." : "Escribe tu pregunta aquí..."}
        className="w-full pr-24 bg-gray-100 border-transparent focus:ring-2 focus:ring-primary"
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
        <Button iconName="mic" variant="icon" type="button" className="bg-gray-200 text-gray-600 hover:bg-gray-300" />
        <Button iconName="send" variant="primary" type="submit" />
      </div>
    </form>
  );
};

export { ChatInput };
export {};