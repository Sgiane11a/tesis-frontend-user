import React, { useState } from 'react';
import { HistoryItem } from './HistoryItem';

const HistoryList = ({ items = [], onSelect, onCreate, onEdit, onDelete }) => {
  const [local, setLocal] = useState(items);

  const handleCreate = () => {
    const newItem = { id: `h_${Date.now()}`, title: `Nuevo chat ${local.length + 1}`, date: 'Ahora' };
    const next = [...local, newItem];
    setLocal(next);
    onCreate?.(newItem);
  };

  const handleDelete = (it) => {
    const next = local.filter(i => i.id !== it.id);
    setLocal(next);
    onDelete?.(it);
  };

  const handleEdit = (it) => {
    const newTitle = prompt('Nuevo nombre del chat', it.title);
    if (!newTitle) return;
    const next = local.map(i => i.id === it.id ? { ...i, title: newTitle } : i);
    setLocal(next);
    onEdit?.({ ...it, title: newTitle });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Chats</div>
        <button className="text-sm text-sky-600" onClick={handleCreate}>Nuevo Chat</button>
      </div>

      <div className="space-y-2 overflow-x-hidden">
        {local.map((it) => (
          <HistoryItem key={it.id} title={it.title} date={it.date} onClick={() => onSelect?.(it)} onEdit={() => handleEdit(it)} onDelete={() => handleDelete(it)} />
        ))}
      </div>
    </div>
  );
};

export { HistoryList };
