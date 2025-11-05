import React, { useState } from 'react';
import { Icon } from '../../atoms/Icon';
import { sampleModules } from '../../../data/staticData';

const CourseModules = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-4">
      {sampleModules.map(m => (
        <div key={m.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <button onClick={() => setOpen(open === m.id ? null : m.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-sky-100" />
              <div className="text-sm font-semibold text-gray-800">{m.title}</div>
            </div>
            <div className="text-sky-500"><Icon name={open === m.id ? 'chevrons-up' : 'chevrons-down'} /></div>
          </button>

          {open === m.id && (
            <div className="border-t px-4 py-4 bg-white">
              {m.items.length === 0 ? (
                <div className="text-sm text-gray-500">No hay recursos aún.</div>
              ) : (
                <ul className="space-y-3">
                  {m.items.map(it => (
                    <li key={it.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-gray-800">
                        <div>
                          <Icon name={it.type} size={18} className={`${it.type === 'pdf' ? 'text-red-600' : it.type === 'ppt' ? 'text-orange-600' : it.type === 'video' ? 'text-green-600' : 'text-sky-500'}`} />
                        </div>
                        <span className="text-sm">{it.title}</span>
                      </div>
                      <div>
                        <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-600 text-white rounded text-sm shadow-sm hover:bg-sky-700"><Icon name="download" /> Descargar</button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseModules;
