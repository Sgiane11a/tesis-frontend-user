import React from 'react';
import { Play, Star } from 'lucide-react';

const difficultyStyles = {
  Fácil: 'bg-emerald-50 text-emerald-700',
  Medio: 'bg-amber-50 text-amber-700',
  Difícil: 'bg-rose-50 text-rose-700',
};

const ChallengeCard = ({ challenge, accent = 'from-sky-500 to-indigo-500', onPlay }) => {
  const Icon = challenge.icon;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-bold leading-snug text-slate-900">{challenge.title}</h3>
            <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
              {challenge.status}
            </span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{challenge.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          +{challenge.xp} XP
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyStyles[challenge.difficulty]}`}>
          {challenge.difficulty}
        </span>
        <span className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
          {challenge.category}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onPlay?.(challenge)}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-sky-600 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
      >
        <Play className="h-4 w-4" />
        Jugar
      </button>
    </article>
  );
};

export default ChallengeCard;
