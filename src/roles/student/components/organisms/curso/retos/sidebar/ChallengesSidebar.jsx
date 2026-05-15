import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CheckCircle2, Trophy, Flame, BarChart3, Star, Brain, BookOpen } from 'lucide-react';

const ChallengesSidebar = () => {
  return (
    <aside className="sticky top-32 space-y-4 self-start">

      {/* CARD PRINCIPAL */}
      <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-950">Tu progreso</h2>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
            Nivel 7
          </span>
        </div>

        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-600">XP actual</span>
          <span className="font-bold text-slate-900">650 / 1000</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-sky-600 to-cyan-500" />
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Siguiente nivel: 350 XP
        </p>
      </section>

      {/* ANIMACIÓN ENTER */}
      <style>
        {`
          @keyframes enterUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        className="relative flex justify-center"
        style={{ animation: "enterUp 500ms ease-out both" }}
      >

        {/* CONTENEDOR LOTTIE */}
        <div className="relative h-72 w-full flex items-center justify-center">

          {/* MUÑECO (BAJADO UN POCO con translateY) */}
          <div className="translate-y-10">
            <DotLottieReact
              src="/mascot.json"
              loop
              autoplay
              style={{ width: "240px", height: "240px" }}
            />
          </div>

          {/* TEXTO CURVO 2 LÍNEAS */}
          <svg
            viewBox="0 0 200 140"
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[260px] h-[140px] pointer-events-none"
          >
            <defs>
              <path id="arc1" d="M 20 90 Q 100 10 180 90" />
              <path id="arc2" d="M 30 110 Q 100 40 170 110" />
            </defs>

            {/* Línea 1 */}
            <text className="fill-sky-600 text-[12px] font-semibold">
              <textPath href="#arc1" startOffset="50%" textAnchor="middle">
                Elige un reto y demuestra
              </textPath>
            </text>

            {/* Línea 2 */}
            <text className="fill-sky-600 text-[12px] font-semibold">
              <textPath href="#arc2" startOffset="50%" textAnchor="middle">
                 lo que sabes ❤️
              </textPath>
            </text>
          </svg>

        </div>
      </div>

    </aside>
  );
};

export default ChallengesSidebar;