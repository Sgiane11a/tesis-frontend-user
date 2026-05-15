import React from 'react';
import { BellRing } from 'lucide-react';

const PreferencesCard = ({ preferences }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
    <div className="mb-4 flex items-center gap-2">
      <BellRing className="h-5 w-5 text-sky-600" />
      <h2 className="text-base font-semibold text-gray-900">Preferencias</h2>
    </div>

    <div className="space-y-3">
      {preferences.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700">{item.label}</span>
          <span
            className={`relative h-6 w-11 rounded-full transition-colors ${
              item.enabled ? 'bg-sky-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                item.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default PreferencesCard;
