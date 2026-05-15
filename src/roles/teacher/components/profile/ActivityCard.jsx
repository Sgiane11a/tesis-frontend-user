import React from 'react';
import { Clock3 } from 'lucide-react';

const ActivityCard = ({ activity }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center gap-2">
      <Clock3 className="h-5 w-5 text-sky-600" />
      <h2 className="text-base font-semibold text-gray-900">Actividad reciente</h2>
    </div>

    <div className="space-y-3">
      {activity.map((item) => (
        <div key={`${item.title}-${item.time}`} className="border-l-2 border-sky-100 pl-3">
          <div className="text-sm font-semibold text-gray-800">{item.title}</div>
          <div className="mt-0.5 text-xs text-gray-500">{item.time}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ActivityCard;
