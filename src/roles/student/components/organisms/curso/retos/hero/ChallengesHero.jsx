import React from 'react';
import { Flame, Gift, Sparkles, Trophy } from 'lucide-react';

const ChallengesHero = ({ courseTitle }) => (
  <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500 p-4 text-white shadow-md">
    <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_240px] lg:items-center">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          <Trophy className="h-4 w-4" />
          Retos del curso
        </div>
        <h1 className="text-2xl font-bold">¡Aprende jugando {courseTitle && `${courseTitle}`.toUpperCase()}!</h1>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/85">
          Completa retos de {courseTitle || 'este curso'}, gana XP y desbloquea desafíos más difíciles mientras practicas.
        </p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-white/15 p-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-white/85">Racha actual</span>
          <Flame className="h-5 w-5 text-amber-200" />
        </div>
        <div className="text-3xl font-black">7 días</div>
        <p className="mt-1 text-xs text-white/75">Sigue así. Hoy tienes 3 retos recomendados.</p>
        <div className="mt-4 h-2 rounded-full bg-white/20">
          <div className="h-full w-3/4 rounded-full bg-white" />
        </div>
      </div>
    </div>

    <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
    <div className="absolute bottom-0 right-1/4 h-24 w-24 rounded-full bg-cyan-200/20" />
  </section>
);

export default ChallengesHero;
