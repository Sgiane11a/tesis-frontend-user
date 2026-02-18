import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const bimesters = [
  { value: 1, label: 'Bimestre - I' },
  { value: 2, label: 'Bimestre - II' },
  { value: 3, label: 'Bimestre - III' },
  { value: 4, label: 'Bimestre - IV' },
];

const BimesterSelector = ({ value = 1, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = bimesters.find((b) => b.value === value) || bimesters[0];

  // Cerrar al clickear fuera
  useEffect(() => {
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm shadow-primary/20"
      >
        {selected.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
          {bimesters.map((b) => (
            <button
              key={b.value}
              onClick={() => { onChange(b.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                ${b.value === value
                  ? 'bg-primary-light text-primary font-semibold'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { BimesterSelector };
