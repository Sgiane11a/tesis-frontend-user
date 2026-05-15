import React from 'react';
import { Gift, Trophy } from 'lucide-react';

const RewardsBanner = () => (
  <section className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 to-cyan-50 p-5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-600 shadow-sm">
        <Trophy className="h-6 w-6" />
      </div>
      <div>
        <h2 className="text-sm font-bold text-slate-900">¡Completa retos y gana recompensas!</h2>
        <p className="mt-1 text-sm text-slate-500">Sigue practicando para desbloquear insignias, niveles y beneficios.</p>
      </div>
    </div>
    <button
      type="button"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 text-sm font-bold text-white shadow-sm hover:bg-sky-700"
    >
      <Gift className="h-4 w-4" />
      Ver recompensas
    </button>
  </section>
);

export default RewardsBanner;
