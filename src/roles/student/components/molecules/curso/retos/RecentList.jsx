import React, { useState } from 'react';

const RecentList = ({ itemsCreated = [], itemsCompleted = [], onDelete, onView }) => {
  const [tab, setTab] = useState('created');

  const items = tab === 'created' ? itemsCreated : itemsCompleted;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setTab('created')} className={`px-3 py-1 rounded ${tab === 'created' ? 'bg-sky-100 text-sky-700' : 'text-gray-600'}`}>Creados</button>
          <button onClick={() => setTab('completed')} className={`px-3 py-1 rounded ${tab === 'completed' ? 'bg-sky-100 text-sky-700' : 'text-gray-600'}`}>Completados</button>
        </div>
        <div className="text-sm text-gray-500">{items.length}</div>
      </div>
      <div className="mt-3 space-y-3 flex-1 overflow-y-auto thin-scroll">
        {items.length === 0 && <div className="text-sm text-gray-500">No hay items en esta pestaña.</div>}
        {items.map(it => (
          <div key={it.id} className="p-3 border rounded flex items-start justify-between">
            <div className="flex-1 pr-3">
              <div className="text-sm font-medium text-gray-800 truncate">{it.title}</div>
              <div className="text-xs text-gray-500">{new Date(it.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => onView(it)} className="px-2 py-1 text-sky-600 border rounded text-sm">Ver</button>
              {tab === 'created' && <button onClick={() => onDelete(it.id)} className="px-2 py-1 text-red-600 border rounded text-sm">Eliminar</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentList;
