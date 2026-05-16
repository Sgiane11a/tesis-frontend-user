import React from 'react';
import ChallengeCard from './ChallengeCard';

const ChallengeLevelSection = ({ level, challenges, onPlayChallenge }) => (
  <section className={`rounded-2xl border ${level.border} ${level.bg} p-4`}>
    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{level.eyebrow}</p>
        <h2 className="text-lg font-bold text-slate-950">{level.title}</h2>
        <p className="mt-1 text-sm text-slate-600">{level.subtitle}</p>
      </div>
      <span className="text-xs font-semibold text-slate-500">{challenges.length} retos</span>
    </div>

    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          accent={level.accent}
          onPlay={onPlayChallenge}
        />
      ))}
    </div>
  </section>
);

export default ChallengeLevelSection;
