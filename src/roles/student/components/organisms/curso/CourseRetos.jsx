import React, { useEffect, useMemo, useState } from 'react';
import BaseChallengesSection from './retos/base/BaseChallengesSection';
import IntermediateChallengesSection from './retos/intermedio/IntermediateChallengesSection';
import AdvancedChallengesSection from './retos/avanzado/AdvancedChallengesSection';
import GamifiedChallengesSection from './retos/gamificado/GamifiedChallengesSection';
import ChallengesHero from './retos/hero/ChallengesHero';
import ChallengeFilters from './retos/filters/ChallengeFilters';
import ChallengesSidebar from './retos/sidebar/ChallengesSidebar';
import ChallengeSetupModal from './retos/setup/ChallengeSetupModal';
import { challengesByLevel, challengeLevels } from './retos/data/challengeCatalog';
import { TeacherModulesService } from '../../../../../api';

const sectionComponentMap = {
  base: BaseChallengesSection,
  intermedio: IntermediateChallengesSection,
  avanzado: AdvancedChallengesSection,
  gamificado: GamifiedChallengesSection,
};

const getDifficultyRank = (difficulty = '') => {
  const value = String(difficulty).toLowerCase();
  if (value.includes('medio')) return 2;
  if (value.includes('dif')) return 3;
  return 1;
};

const toBimestreNumber = (label) => {
  if (typeof label === 'number') return label;
  const text = String(label || '').toUpperCase();
  if (text.includes('TODOS')) return null;
  if (text.includes('I') && !text.includes('II') && !text.includes('III') && !text.includes('IV')) return 1;
  if (text.includes('II') && !text.includes('III') && !text.includes('IV')) return 2;
  if (text.includes('III') && !text.includes('IV')) return 3;
  if (text.includes('IV')) return 4;
  return 1;
};

const CourseRetos = ({ aulaId, bimestre, course, courseId }) => {
  const [activeFilter, setActiveFilter] = useState('base');
  const [sort, setSort] = useState('recommended');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modules, setModules] = useState([]);
  const [modulesLoading, setModulesLoading] = useState(false);
  const [modulesError, setModulesError] = useState('');

  const visibleLevels = useMemo(
    () => challengeLevels.filter((level) => level.id === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    if (!courseId) return;

    let mounted = true;

    const loadModules = async () => {
      setModulesLoading(true);
      setModulesError('');

      try {
        const bimestreNumber = toBimestreNumber(bimestre);
        const idCurso = Number(courseId);
        const idAula = aulaId ? Number(aulaId) : null;

        if (bimestreNumber) {
          const data = await TeacherModulesService.getByBimesterAndCourse({
            idBimestre: bimestreNumber,
            idCurso,
            idAula,
          });
          if (mounted) setModules(Array.isArray(data) ? data : []);
          return;
        }

        const results = await Promise.all(
          [1, 2, 3, 4].map((item) =>
            TeacherModulesService.getByBimesterAndCourse({
              idBimestre: item,
              idCurso,
              idAula,
            })
          )
        );
        const combined = results.flat().filter(Boolean);
        const unique = Array.from(new Map(combined.map((item) => [item.id_modulo, item])).values());
        if (mounted) setModules(unique);
      } catch (err) {
        if (mounted) setModulesError(err?.message || 'No se pudieron cargar los modulos.');
      } finally {
        if (mounted) setModulesLoading(false);
      }
    };

    loadModules();

    return () => {
      mounted = false;
    };
  }, [aulaId, bimestre, courseId]);

  const sortedModules = useMemo(
    () => [...modules].sort((a, b) => (a.id_modulo || 0) - (b.id_modulo || 0)),
    [modules]
  );

  const getChallenges = (levelId) => {
    const challenges = [...(challengesByLevel[levelId] || [])];

    if (sort === 'xp') {
      return challenges.sort((a, b) => b.xp - a.xp);
    }

    if (sort === 'difficulty') {
      return challenges.sort((a, b) => getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty));
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
                  onPlayChallenge={setSelectedChallenge}
                />
              );
            })}
          </div>
        </main>

        <ChallengesSidebar />
      </div>

      <ChallengeSetupModal
        challenge={selectedChallenge}
        courseTitle={course?.title}
        modules={sortedModules}
        modulesLoading={modulesLoading}
        modulesError={modulesError}
        onClose={() => setSelectedChallenge(null)}
        onStart={() => setSelectedChallenge(null)}
      />
    </div>
  );
};

export default CourseRetos;
