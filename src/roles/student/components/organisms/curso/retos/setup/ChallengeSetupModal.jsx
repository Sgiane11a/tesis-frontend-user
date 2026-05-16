import React, { useEffect, useState } from 'react';
import {
  Bot,
  Check,
  Clock,
  Layers3,
  Play,
  ListChecks,
  Shield,
  Sparkles,
  Timer,
  X,
} from 'lucide-react';

const moduleScopeOptions = [
  {
    id: 'single',
    title: 'Solo este modulo',
    description: 'Elige un modulo publicado por el profesor.',
  },
  {
    id: 'combined',
    title: 'Combinar modulos',
    description: 'Elige dos o mas modulos para mezclar temas.',
  },
];

const questionCountOptions = [10, 15, 20];

const modeOptions = [
  {
    id: 'normal',
    title: 'Normal',
    description: 'Avanza a tu ritmo.',
    icon: Play,
  },
  {
    id: 'timed',
    title: 'Contra reloj',
    description: 'Responde antes de que termine el tiempo.',
    icon: Timer,
  },
  {
    id: 'practice',
    title: 'Practica',
    description: 'Sin penalizaciones, ideal para repasar.',
    icon: Sparkles,
  },
  {
    id: 'survival',
    title: 'Supervivencia',
    description: 'Sigue mientras mantengas respuestas correctas.',
    icon: Shield,
  },
];

const companionOptions = [
  {
    id: 'ai-tutor',
    title: 'Tutor IA',
    description: 'Pistas claras cuando te atasques.',
    swatch: 'bg-sky-500',
  },
  {
    id: 'fun-mascot',
    title: 'Mascota divertida',
    description: 'Animo visual y mensajes ligeros.',
    swatch: 'bg-amber-400',
  },
  {
    id: 'virtual-teacher',
    title: 'Profesor virtual',
    description: 'Explicaciones formales y paso a paso.',
    swatch: 'bg-emerald-500',
  },
];

const selectableCardClass = (isSelected) =>
  [
    'relative rounded-xl border p-3 text-left transition',
    isSelected
      ? 'border-sky-400 bg-sky-50 shadow-sm ring-2 ring-sky-100'
      : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50',
  ].join(' ');

const SelectionMark = () => (
  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-white">
    <Check className="h-3.5 w-3.5" />
  </span>
);

const getModuleId = (module) => module?.id_modulo ?? module?.id;

const ChallengeSetupModal = ({
  challenge,
  courseTitle,
  modules = [],
  modulesError = '',
  modulesLoading = false,
  onClose,
  onStart,
}) => {
  const [moduleScope, setModuleScope] = useState('single');
  const [selectedModuleIds, setSelectedModuleIds] = useState([]);
  const [mode, setMode] = useState('normal');
  const [companion, setCompanion] = useState('ai-tutor');
  const [questionCount, setQuestionCount] = useState(10);

  const canCombineModules = modules.length > 1;
  const availableScopeOptions = canCombineModules
    ? moduleScopeOptions
    : moduleScopeOptions.filter((option) => option.id === 'single');
  const hasSelectedModules = selectedModuleIds.length > 0;

  useEffect(() => {
    if (!challenge) return;

    if (!canCombineModules && moduleScope === 'combined') {
      setModuleScope('single');
    }

    const moduleIds = modules.map(getModuleId).filter(Boolean);
    if (moduleIds.length === 0) {
      setSelectedModuleIds([]);
      return;
    }

    setSelectedModuleIds((current) => {
      const validSelection = current.filter((id) => moduleIds.includes(id));
      if (moduleScope === 'single') {
        return [validSelection[0] ?? moduleIds[0]];
      }
      return validSelection.length > 0 ? validSelection : moduleIds.slice(0, Math.min(2, moduleIds.length));
    });
  }, [canCombineModules, challenge, moduleScope, modules]);

  useEffect(() => {
    if (challenge) setQuestionCount(10);
  }, [challenge]);

  if (!challenge) {
    return null;
  }

  const handleModuleClick = (moduleId) => {
    if (moduleScope === 'single') {
      setSelectedModuleIds([moduleId]);
      return;
    }

    setSelectedModuleIds((current) => {
      if (current.includes(moduleId)) {
        return current.length === 1 ? current : current.filter((id) => id !== moduleId);
      }
      return [...current, moduleId];
    });
  };

  const handleStart = () => {
    const selectedModules = modules.filter((module) => selectedModuleIds.includes(getModuleId(module)));
    onStart?.({
      challenge,
      moduleScope,
      selectedModuleIds,
      selectedModules,
      mode,
      companion,
      questionCount,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <section className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-sky-600">Configurar reto</p>
            <h2 className="mt-1 text-xl font-bold text-slate-950">Antes de iniciar</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Cerrar configuracion"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 gap-0 overflow-hidden lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="border-b border-slate-100 bg-slate-50 p-5 lg:border-b-0 lg:border-r">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Layers3 className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug text-slate-950">{challenge.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{challenge.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase text-slate-400">Dificultad</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{challenge.difficulty}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase text-slate-400">XP</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">+{challenge.xp} XP</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase text-slate-400">Preguntas</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{questionCount}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-[11px] font-bold uppercase text-slate-400">Curso</p>
                  <p className="mt-1 truncate text-sm font-bold text-slate-900">{courseTitle || 'Curso actual'}</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-h-0 space-y-5 overflow-y-auto p-5">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-950">Seleccion de modulos</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {availableScopeOptions.map((option) => {
                  const isSelected = moduleScope === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setModuleScope(option.id)}
                      className={selectableCardClass(isSelected)}
                    >
                      {isSelected && <SelectionMark />}
                      <span className="block pr-7 text-sm font-bold text-slate-950">{option.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{option.description}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                {modulesLoading && <p className="text-sm text-slate-500">Cargando modulos del profesor...</p>}
                {!modulesLoading && modulesError && <p className="text-sm text-rose-600">{modulesError}</p>}
                {!modulesLoading && !modulesError && modules.length === 0 && (
                  <p className="text-sm text-slate-500">No hay modulos visibles para seleccionar.</p>
                )}

                {!modulesLoading && !modulesError && modules.length > 0 && (
                  <div className="grid max-h-56 gap-2 overflow-y-auto pr-1">
                    {modules.map((module) => {
                      const moduleId = getModuleId(module);
                      const isSelected = selectedModuleIds.includes(moduleId);
                      const resourceCount = module.Recursos?.length ?? 0;

                      return (
                        <button
                          key={moduleId}
                          type="button"
                          onClick={() => handleModuleClick(moduleId)}
                          className={selectableCardClass(isSelected)}
                        >
                          {isSelected && <SelectionMark />}
                          <span className="block pr-7 text-sm font-bold text-slate-950">{module.titulo}</span>
                          {module.descripcion && (
                            <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-slate-500">
                              {module.descripcion}
                            </span>
                          )}
                          <span className="mt-2 inline-flex rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-500">
                            {resourceCount} recurso{resourceCount === 1 ? '' : 's'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-950">Cantidad de preguntas</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {questionCountOptions.map((option) => {
                  const isSelected = questionCount === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setQuestionCount(option)}
                      className={selectableCardClass(isSelected)}
                    >
                      {isSelected && <SelectionMark />}
                      <span className="block pr-7 text-lg font-black text-slate-950">{option}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">preguntas</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-950">Modalidad</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {modeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = mode === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setMode(option.id)}
                      className={selectableCardClass(isSelected)}
                    >
                      {isSelected && <SelectionMark />}
                      <Icon className="mb-3 h-5 w-5 text-sky-600" />
                      <span className="block pr-7 text-sm font-bold text-slate-950">{option.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{option.description}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section>
              <div className="mb-3 flex items-center gap-2">
                <Bot className="h-4 w-4 text-sky-600" />
                <h3 className="text-sm font-bold text-slate-950">Personaje acompanante</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {companionOptions.map((option) => {
                  const isSelected = companion === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setCompanion(option.id)}
                      className={selectableCardClass(isSelected)}
                    >
                      {isSelected && <SelectionMark />}
                      <div className={`mb-3 h-20 rounded-lg ${option.swatch}`} />
                      <span className="block pr-7 text-sm font-bold text-slate-950">{option.title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-500">{option.description}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-slate-500">
            {moduleScope === 'single'
              ? 'Selecciona un modulo para esta partida.'
              : 'Puedes seleccionar varios modulos para combinar preguntas.'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleStart}
              disabled={modulesLoading || !hasSelectedModules}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <Play className="h-4 w-4" />
              Iniciar reto
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default ChallengeSetupModal;
