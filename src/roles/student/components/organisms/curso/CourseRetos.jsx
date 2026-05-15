import React, { useMemo, useState } from 'react';
import BaseChallengesSection from './retos/base/BaseChallengesSection';
import IntermediateChallengesSection from './retos/intermedio/IntermediateChallengesSection';
import AdvancedChallengesSection from './retos/avanzado/AdvancedChallengesSection';
import GamifiedChallengesSection from './retos/gamificado/GamifiedChallengesSection';
import ChallengesHero from './retos/hero/ChallengesHero';
import ChallengeFilters from './retos/filters/ChallengeFilters';
import ChallengesSidebar from './retos/sidebar/ChallengesSidebar';
import { challengesByLevel, challengeLevels } from './retos/data/challengeCatalog';

const sectionComponentMap = {
  base: BaseChallengesSection,
  intermedio: IntermediateChallengesSection,
  avanzado: AdvancedChallengesSection,
  gamificado: GamifiedChallengesSection,
};

const difficultyOrder = {
  Fácil: 1,
  Medio: 2,
  Difícil: 3,
};

const CourseRetos = ({ course }) => {
  const [activeFilter, setActiveFilter] = useState('base');
  const [sort, setSort] = useState('recommended');

  const visibleLevels = useMemo(
    () => challengeLevels.filter((level) => level.id === activeFilter),
    [activeFilter]
  );

  const getChallenges = (levelId) => {
    const challenges = [...(challengesByLevel[levelId] || [])];

    if (sort === 'xp') {
      return challenges.sort((a, b) => b.xp - a.xp);
    }

    if (sort === 'difficulty') {
      return challenges.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }

    return challenges;
  };

  return (
    <div className="space-y-4">
      <ChallengesHero courseTitle={course?.title} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <main className="min-w-0 space-y-4">
          <ChallengeFilters
            activeFilter={activeFilter}
            sort={sort}
            onFilterChange={setActiveFilter}
            onSortChange={setSort}
          />

          <div className="space-y-4">
            {visibleLevels.map((level) => {
              const SectionComponent = sectionComponentMap[level.id];
              return (
                <SectionComponent
                  key={level.id}
                  level={level}
                  challenges={getChallenges(level.id)}
                />
              );
            })}
          </div>
        </main>

        <ChallengesSidebar />
      </div>
    </div>
  );
};

export default CourseRetos;
