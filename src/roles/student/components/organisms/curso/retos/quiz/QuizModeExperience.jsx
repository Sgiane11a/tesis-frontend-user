import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { CheckCircle2, Clock, Heart, RotateCcw, Star, Trophy, X, Zap } from 'lucide-react';
import { companionColors, quizModeCopy, quizQuestions } from './data/quizMock';
import TrueFalseModeExperience from './TrueFalseModeExperience';

const Motion = motion;

const modeShell = {
  normal: 'bg-slate-50 text-slate-950',
  timed: 'bg-slate-950 text-white',
  practice: 'bg-emerald-50 text-slate-950',
  survival: 'bg-rose-50 text-slate-950',
};

const modeSurface = {
  normal: 'border-slate-200 bg-white',
  timed: 'border-white/10 bg-white/10 text-white backdrop-blur',
  practice: 'border-emerald-100 bg-white',
  survival: 'border-rose-100 bg-white',
};

const optionBase =
  'group relative w-full overflow-hidden rounded-2xl border p-4 text-left text-sm font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-sky-200';

const getTimerColor = (seconds) => {
  if (seconds <= 5) return 'text-rose-400';
  if (seconds <= 10) return 'text-amber-300';
  return 'text-sky-300';
};

const popTransition = { type: 'spring', stiffness: 420, damping: 24 };

const AnimatedNumber = ({ value, suffix = '' }) => {
  const motionValue = useMotionValue(value);
  const roundedValue = useTransform(motionValue, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.55, ease: 'easeOut' });
    return controls.stop;
  }, [motionValue, value]);

  return <Motion.span>{roundedValue}</Motion.span>;
};

const ProgressBar = ({ value, intense = false }) => (
  <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
    <Motion.div
      className={`h-full rounded-full transition-all duration-500 ${intense ? 'bg-gradient-to-r from-sky-400 via-amber-300 to-rose-500' : 'bg-sky-500'}`}
      initial={false}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

const QuestionDots = ({ currentIndex, questionCount }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: questionCount }, (_, index) => (
      <Motion.span
        key={index}
        className={`h-2 rounded-full ${index === currentIndex ? 'bg-sky-500' : index < currentIndex ? 'bg-emerald-400' : 'bg-slate-300'}`}
        initial={false}
        animate={{ width: index === currentIndex ? 32 : 8, scale: index === currentIndex ? 1.08 : 1 }}
        transition={popTransition}
      />
    ))}
  </div>
);

const CompanionBlock = ({ companion, message, intense = false, reaction = 'idle', streak = 0 }) => (
  <Motion.div
    className={`rounded-3xl border p-4 text-center shadow-sm ${intense ? 'border-amber-300/40 bg-white/10 text-white' : 'border-slate-200 bg-white'}`}
    animate={reaction === 'happy' ? { scale: [1, 1.03, 1] } : reaction === 'sad' ? { y: [0, 3, 0] } : { scale: 1 }}
    transition={{ duration: 0.55 }}
  >
    <div className="flex flex-col items-center gap-3">
      <Motion.p
        key={message}
        className={`text-sm font-bold leading-relaxed ${intense ? 'text-white' : 'text-slate-700'}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {message}
      </Motion.p>
      <Motion.div
        className={`relative h-24 w-24 shrink-0 rounded-3xl ${companionColors[companion] || 'bg-sky-500'} ${intense ? 'shadow-[0_0_25px_rgba(251,191,36,0.35)]' : 'shadow-md'}`}
        animate={
          reaction === 'happy'
            ? { rotate: [-4, 4, -2, 0], scale: [1, 1.1, 1] }
            : reaction === 'sad'
              ? { rotate: [0, -3, 3, 0], scale: [1, 0.96, 1] }
              : { y: [0, -3, 0] }
        }
        transition={{ duration: reaction === 'idle' ? 2.6 : 0.7, repeat: reaction === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
      >
        <span className="absolute left-6 top-7 h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-6 top-7 h-3 w-3 rounded-full bg-white" />
        <Motion.span
          className="absolute bottom-6 left-1/2 h-2 w-8 -translate-x-1/2 rounded-full bg-white"
          animate={reaction === 'happy' ? { width: 42 } : reaction === 'sad' ? { width: 18, y: 3 } : { width: 32 }}
        />
        {streak >= 3 && <span className="absolute -right-2 -top-2 rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-black text-slate-950">x{streak}</span>}
      </Motion.div>
    </div>
  </Motion.div>
);

const AnswerFooterFeedback = ({ feedback }) => (
  <AnimatePresence>
    {feedback && (
      <Motion.div
        key={feedback.id}
        className={`absolute inset-x-0 bottom-0 z-30 flex min-h-28 items-center justify-between gap-4 px-6 py-4 shadow-2xl md:min-h-32 md:px-10 ${
          feedback.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
        }`}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="h-24 w-24 shrink-0 md:h-28 md:w-28">
            <DotLottieReact
              src={feedback.isCorrect ? '/acierto.json' : '/falla.json'}
              autoplay
              loop
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-3xl font-black leading-none md:text-5xl">
              {feedback.isCorrect ? 'Correcto' : 'Incorrecto'}
            </p>
            <p className="mt-2 truncate text-sm font-bold text-white/85 md:text-base">{feedback.message}</p>
          </div>
        </div>
        <Motion.div
          className="shrink-0 rounded-3xl bg-white px-5 py-3 text-center shadow-xl md:px-7 md:py-4"
          initial={{ scale: 0.7, rotate: -3 }}
          animate={{ scale: [0.7, 1.12, 1], rotate: 0 }}
          transition={popTransition}
        >
          <p className={`text-4xl font-black leading-none md:text-6xl ${feedback.isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            {feedback.xp > 0 ? `+${feedback.xp}` : '0'}
          </p>
          <p className="mt-1 text-xs font-black uppercase tracking-wide text-slate-500">XP</p>
        </Motion.div>
      </Motion.div>
    )}
  </AnimatePresence>
);

const LevelUpToast = ({ level, visible }) => (
  <AnimatePresence>
    {visible && (
      <Motion.div
        className="pointer-events-none absolute left-1/2 top-24 z-30 -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-center text-white shadow-2xl"
        initial={{ opacity: 0, y: -18, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: [0.85, 1.08, 1] }}
        exit={{ opacity: 0, y: -18, scale: 0.9 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        <p className="text-[11px] font-black uppercase text-amber-300">Subiste de nivel</p>
        <p className="text-lg font-black">Nivel {level}</p>
      </Motion.div>
    )}
  </AnimatePresence>
);

const QuizHeader = ({ config, currentIndex, mode, progress, questionCount, score, seconds, streak, lives }) => {
  const level = Math.floor(score / 100) + 1;

  if (mode === 'timed') {
    return (
      <Motion.header layout className="grid shrink-0 gap-4 rounded-3xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur md:grid-cols-[1fr_210px]">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-white/80">
            <span>Pregunta {currentIndex + 1} de {questionCount}</span>
            <Motion.span key={score} initial={{ scale: 1 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.35 }}>
              +<AnimatedNumber value={score} /> XP
            </Motion.span>
            <Motion.span
              className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-slate-950"
              animate={streak >= 2 ? { scale: [1, 1.12, 1], rotate: [-1, 1, 0] } : { scale: 1 }}
              transition={{ duration: 0.45 }}
            >
              <Zap className="h-4 w-4" />
              Combo x{Math.max(1, streak)}
            </Motion.span>
          </div>
          <ProgressBar value={progress} intense />
          <QuestionDots currentIndex={currentIndex} questionCount={questionCount} />
        </div>
        <div className={`rounded-3xl bg-slate-950/70 p-3 text-center shadow-inner ${seconds <= 5 ? 'animate-pulse ring-2 ring-rose-400' : ''}`}>
          <p className="text-xs font-black uppercase tracking-wide text-white/60">Tiempo</p>
          <p className={`mt-1 text-5xl font-black leading-none ${getTimerColor(seconds)}`}>{seconds}s</p>
        </div>
      </Motion.header>
    );
  }

  if (mode === 'survival') {
    return (
      <Motion.header layout className="shrink-0 rounded-3xl border border-rose-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-rose-700">Supervivencia</p>
            <p className="text-xs font-bold text-slate-500">Pregunta {currentIndex + 1} de {questionCount}</p>
          </div>
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((item) => (
              <Heart key={item} className={`h-7 w-7 transition ${item < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-200'}`} />
            ))}
          </div>
          <Motion.div
            className="rounded-2xl bg-amber-50 px-4 py-2 text-sm font-black text-amber-700"
            animate={streak > 0 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            Racha {streak}
          </Motion.div>
        </div>
        <div className="mt-4 space-y-3">
          <ProgressBar value={progress} />
          <QuestionDots currentIndex={currentIndex} questionCount={questionCount} />
        </div>
      </Motion.header>
    );
  }

  return (
    <Motion.header layout className="shrink-0 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-black text-sky-700">{config.label}</p>
          <p className="text-xs font-bold text-slate-500">Pregunta {currentIndex + 1} de {questionCount}</p>
        </div>
        <div className="flex items-center gap-3 text-sm font-black text-slate-700">
          <Motion.span
            key={score}
            className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5 text-sky-700"
            animate={{ scale: [1, 1.16, 1] }}
            transition={{ duration: 0.35 }}
          >
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            <AnimatedNumber value={score} /> XP
          </Motion.span>
          <span>Nivel {level}</span>
          <span><AnimatedNumber value={Math.round(progress)} suffix="%" /></span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <ProgressBar value={progress} />
        <QuestionDots currentIndex={currentIndex} questionCount={questionCount} />
      </div>
    </Motion.header>
  );
};

const PracticeFeedback = ({ question, selectedIndex }) => {
  if (selectedIndex === null) {
    return (
      <aside className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-black text-emerald-700">Zona de aprendizaje</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Responde y aqui apareceran una explicacion, un ejemplo y un resumen para reforzar el concepto.
        </p>
      </aside>
    );
  }

  const isCorrect = selectedIndex === question.correctIndex;

  return (
    <aside className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
      <p className={`text-sm font-black ${isCorrect ? 'text-emerald-700' : 'text-amber-700'}`}>
        {isCorrect ? 'Respuesta correcta' : 'Vamos a revisarlo'}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{question.explanation}</p>
      <div className="mt-4 rounded-2xl bg-emerald-50 p-4">
        <p className="text-xs font-bold uppercase text-emerald-700">Ejemplo</p>
        <p className="mt-1 text-sm text-slate-700">{question.example}</p>
      </div>
      <div className="mt-3 rounded-2xl bg-sky-50 p-4">
        <p className="text-xs font-bold uppercase text-sky-700">Mini resumen</p>
        <p className="mt-1 text-sm text-slate-700">{question.summary}</p>
      </div>
    </aside>
  );
};

const QuizSummaryModal = ({ answers, endReason, modeLabel, onBack, onRetry, questionCount, score, streak }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(answers[0] ?? null);
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const answeredCount = answers.length;
  const wrongCount = answeredCount - correctCount;
  const pendingCount = Math.max(0, questionCount - answeredCount);
  const accuracy = questionCount > 0 ? Math.round((correctCount / questionCount) * 100) : 0;
  const isCompleted = endReason === 'completed';

  const stats = [
    { label: 'Aciertos', value: correctCount, tone: 'bg-emerald-50 text-emerald-700' },
    { label: 'Errores', value: wrongCount, tone: 'bg-rose-50 text-rose-700' },
    { label: 'Sin responder', value: pendingCount, tone: 'bg-slate-100 text-slate-600' },
    { label: 'Precision', value: `${accuracy}%`, tone: 'bg-sky-50 text-sky-700' },
  ];
  const badges = [
    { label: accuracy >= 80 ? 'Dominio alto' : 'En progreso', icon: Trophy, tone: 'bg-amber-50 text-amber-700' },
    { label: streak >= 3 ? 'Racha encendida' : 'Racha inicial', icon: Zap, tone: 'bg-sky-50 text-sky-700' },
    { label: correctCount > wrongCount ? 'Buen ritmo' : 'Sigue practicando', icon: Star, tone: 'bg-emerald-50 text-emerald-700' },
  ];

  return (
    <Motion.div
      className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <Motion.section
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white text-slate-950 shadow-2xl"
        initial={{ opacity: 0, y: 38, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={popTransition}
      >
        <div className="bg-sky-600 px-6 py-6 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-sky-100">{modeLabel}</p>
              <Motion.h2 className="mt-2 text-3xl font-black" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                {isCompleted ? 'Quiz completado' : 'Partida terminada'}
              </Motion.h2>
              <Motion.p className="mt-2 text-sm font-semibold text-sky-100" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {isCompleted ? 'Buen trabajo. Este es tu resumen final.' : 'Te quedaste sin energia. Revisa tu avance y vuelve a intentarlo.'}
              </Motion.p>
            </div>
            <Motion.div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15"
              animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.12, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.6 }}
            >
              <Trophy className="h-9 w-9 text-amber-300" />
            </Motion.div>
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto p-6">
          <div className="grid gap-3 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <Motion.div
                key={stat.label}
                className={`rounded-2xl p-4 text-center ${stat.tone}`}
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.12 + index * 0.08, ...popTransition }}
              >
                <p className="text-2xl font-black">{typeof stat.value === 'number' ? <AnimatedNumber value={stat.value} /> : stat.value}</p>
                <p className="mt-1 text-[11px] font-black uppercase">{stat.label}</p>
              </Motion.div>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <Motion.div
                  key={badge.label}
                  className={`flex items-center gap-3 rounded-2xl p-4 ${badge.tone}`}
                  initial={{ opacity: 0, y: 18, rotate: -2, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                  transition={{ delay: 0.46 + index * 0.1, ...popTransition }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-black">{badge.label}</span>
                </Motion.div>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Motion.div className="rounded-2xl border border-slate-200 p-4" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.48 }}>
              <p className="text-xs font-black uppercase text-slate-400">XP final</p>
              <p className="mt-1 text-2xl font-black text-slate-950"><AnimatedNumber value={score} /></p>
            </Motion.div>
            <Motion.div className="rounded-2xl border border-slate-200 p-4" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
              <p className="text-xs font-black uppercase text-slate-400">Mejor racha</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{streak}</p>
            </Motion.div>
          </div>

          <Motion.div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62 }}>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-black text-slate-950">Resumen de respuestas</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">Presiona una pregunta para ver el detalle.</p>
              <div className="mt-3 grid max-h-72 gap-2 overflow-y-auto pr-1">
              {answers.map((answer, index) => (
                <Motion.button
                  key={answer.questionNumber}
                  type="button"
                  onClick={() => setSelectedAnswer(answer)}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-left transition ${
                    selectedAnswer?.questionNumber === answer.questionNumber ? 'bg-sky-50 ring-2 ring-sky-200' : 'bg-slate-50 hover:bg-slate-100'
                  }`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.035 }}
                >
                  <span className="min-w-0 truncate text-sm font-bold text-slate-700">
                    {answer.questionNumber}. {answer.question}
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-black ${answer.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                    {answer.isCorrect ? 'Correcta' : 'Incorrecta'}
                  </span>
                </Motion.button>
              ))}
              </div>
            </div>

            {selectedAnswer && (
              <Motion.div
                key={selectedAnswer.questionNumber}
                className="rounded-2xl border border-sky-100 bg-sky-50/70 p-4"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={popTransition}
              >
                <p className="text-xs font-black uppercase text-sky-700">Detalle de pregunta</p>
                <h3 className="mt-2 text-sm font-black leading-snug text-slate-950">
                  {selectedAnswer.questionNumber}. {selectedAnswer.question}
                </h3>

                <div className="mt-4 space-y-3">
                  <div className={`rounded-xl p-3 ${selectedAnswer.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                    <p className="text-[11px] font-black uppercase">{selectedAnswer.isCorrect ? 'Tu respuesta' : 'Marcaste'}</p>
                    <p className="mt-1 text-sm font-bold">
                      {selectedAnswer.selectedIndex >= 0 ? selectedAnswer.options?.[selectedAnswer.selectedIndex] : 'Sin respuesta'}
                    </p>
                  </div>

                  {!selectedAnswer.isCorrect && (
                    <div className="rounded-xl bg-emerald-100 p-3 text-emerald-800">
                      <p className="text-[11px] font-black uppercase">Respuesta correcta</p>
                      <p className="mt-1 text-sm font-bold">{selectedAnswer.options?.[selectedAnswer.correctIndex]}</p>
                    </div>
                  )}

                  <div className="rounded-xl bg-white p-3 text-slate-700 shadow-sm">
                    <p className="text-[11px] font-black uppercase text-sky-700">Explicacion IA</p>
                    <p className="mt-2 text-sm leading-relaxed">
                      {selectedAnswer.isCorrect
                        ? `Bien elegido. Esta opcion conecta con la idea principal porque ${selectedAnswer.explanation}`
                        : `La respuesta marcada no era la mas precisa. ${selectedAnswer.explanation}`}
                    </p>
                  </div>
                </div>
              </Motion.div>
            )}
          </Motion.div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Motion.button
              type="button"
              onClick={onBack}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Salir
            </Motion.button>
            <Motion.button
              type="button"
              onClick={onRetry}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <RotateCcw className="h-4 w-4" />
              Reintentar
            </Motion.button>
          </div>
        </div>
      </Motion.section>
    </Motion.div>
  );
};

const QuizModeExperience = ({ setup, onBack }) => {
  if (setup?.challenge?.id === 'true-false') {
    return <TrueFalseModeExperience setup={setup} onBack={onBack} />;
  }

  const mode = setup?.mode || 'normal';
  const config = quizModeCopy[mode] || quizModeCopy.normal;
  const questionCount = Number(setup?.questionCount) || 10;
  const questions = useMemo(
    () => Array.from({ length: questionCount }, (_, index) => quizQuestions[index % quizQuestions.length]),
    [questionCount]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [seconds, setSeconds] = useState(20);
  const [gameOver, setGameOver] = useState(false);
  const [endReason, setEndReason] = useState('completed');
  const [bestStreak, setBestStreak] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [levelUp, setLevelUp] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isTimed = mode === 'timed';
  const isPractice = mode === 'practice';
  const isSurvival = mode === 'survival';
  const selectedIsCorrect = selectedIndex === question.correctIndex;
  const answered = selectedIndex !== null;
  const companionReaction = answered ? (selectedIsCorrect ? 'happy' : 'sad') : 'idle';

  useEffect(() => {
    if (!isTimed || answered || gameOver) return undefined;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setAnswers((currentAnswers) => {
            if (currentAnswers.some((answer) => answer.questionNumber === currentIndex + 1)) return currentAnswers;
            return [
              ...currentAnswers,
              {
                questionNumber: currentIndex + 1,
                question: question.question,
                selectedIndex: -1,
                correctIndex: question.correctIndex,
                isCorrect: false,
                options: question.options,
                explanation: question.explanation,
              },
            ];
          });
          setStreak(0);
          setAnswerFeedback({
            id: `${currentIndex}-timeout`,
            isCorrect: false,
            xp: 0,
            message: 'Se acabo el tiempo. Revisa la idea clave antes de continuar.',
          });
          setSelectedIndex(-1);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [answered, currentIndex, gameOver, isTimed, question.correctIndex, question.explanation, question.options, question.question]);

  useEffect(() => {
    if (!answerFeedback) return undefined;

    const timeout = window.setTimeout(() => {
      setAnswerFeedback(null);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [answerFeedback]);

  const companionMessage = useMemo(() => {
    if (isTimed && seconds <= 5) return config.lowTimeMessage;
    if (isSurvival && streak >= 3) return config.streakMessage;
    if (answered && selectedIsCorrect) return config.resultMessage;
    return config.companionMessage;
  }, [answered, config, isSurvival, isTimed, seconds, selectedIsCorrect, streak]);

  const handleAnswer = (optionIndex) => {
    if (answered || gameOver) return;

    const correct = optionIndex === question.correctIndex;
    setSelectedIndex(optionIndex);
    setAnswers((current) => [
      ...current,
      {
        questionNumber: currentIndex + 1,
        question: question.question,
        selectedIndex: optionIndex,
        correctIndex: question.correctIndex,
        isCorrect: correct,
        options: question.options,
        explanation: question.explanation,
      },
    ]);

    if (correct) {
      const combo = isTimed ? Math.max(1, streak + 1) : 1;
      const gainedXp = 10 * combo;
      setAnswerFeedback({
        id: `${currentIndex}-${optionIndex}`,
        isCorrect: true,
        xp: gainedXp,
        message: 'Excelente. Sumaste puntos para tu progreso.',
      });
      setScore((current) => {
        const nextScore = current + gainedXp;
        const currentLevel = Math.floor(current / 100) + 1;
        const nextLevel = Math.floor(nextScore / 100) + 1;
        if (nextLevel > currentLevel) {
          setLevelUp(nextLevel);
          window.setTimeout(() => setLevelUp(null), 1400);
        }
        return nextScore;
      });
      setStreak((current) => {
        const nextStreak = current + 1;
        setBestStreak((best) => Math.max(best, nextStreak));
        return nextStreak;
      });
      return;
    }

    setStreak(0);
    setAnswerFeedback({
      id: `${currentIndex}-${optionIndex}`,
      isCorrect: false,
      xp: 0,
      message: question.summary,
    });
    if (isSurvival) {
      setLives((current) => {
        const nextLives = current - 1;
        if (nextLives <= 0) {
          setEndReason('survival');
          setGameOver(true);
        }
        return Math.max(0, nextLives);
      });
    }
  };

  const goNext = () => {
    if (currentIndex === questions.length - 1) {
      setEndReason('completed');
      setGameOver(true);
      return;
    }
    setCurrentIndex((current) => current + 1);
    setSelectedIndex(null);
    setAnswerFeedback(null);
    setSeconds(20);
  };

  const retryQuiz = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setLives(3);
    setSeconds(20);
    setAnswers([]);
    setLevelUp(null);
    setAnswerFeedback(null);
    setEndReason('completed');
    setGameOver(false);
  };

  const optionClass = (optionIndex) => {
    if (!answered) {
      if (isTimed) return `${optionBase} border-white/10 bg-white/10 text-white hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lg`;
      return `${optionBase} border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:shadow-md`;
    }

    if (optionIndex === question.correctIndex) {
      return `${optionBase} scale-[1.01] border-emerald-300 bg-emerald-50 text-emerald-800 shadow-md`;
    }

    if (optionIndex === selectedIndex) {
      return `${optionBase} border-rose-300 bg-rose-50 text-rose-800 ${isSurvival ? 'animate-pulse' : ''}`;
    }

    return `${optionBase} border-slate-200 bg-slate-50 text-slate-400 opacity-70`;
  };

  return (
    <div className={`relative h-[calc(100vh-4.5rem)] overflow-hidden rounded-3xl ${modeShell[mode]} ${isSurvival && answered && !selectedIsCorrect ? 'ring-4 ring-inset ring-rose-300' : ''}`}>
      <div className="pointer-events-none absolute inset-0 opacity-70">
        {isTimed && <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-500/20 to-transparent" />}
        {isPractice && <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl" />}
        {isSurvival && <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-rose-200/50 blur-3xl" />}
      </div>

      <button
        type="button"
        onClick={onBack}
        className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition ${isTimed ? 'border-white/10 bg-white/10 text-white hover:bg-white/15' : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900'}`}
        aria-label="Salir del quiz"
      >
        <X className="h-5 w-5" />
      </button>

      <LevelUpToast level={levelUp} visible={Boolean(levelUp)} />

      <div className="relative z-10 flex h-full min-h-0 flex-col gap-4 p-4 pb-20 md:p-2 md:pb-20">
        <QuizHeader
          config={config}
          currentIndex={currentIndex}
          lives={lives}
          mode={mode}
          progress={progress}
          questionCount={questions.length}
          score={score}
          seconds={seconds}
          streak={streak}
        />

        <div className={`grid min-h-0 flex-1 gap-4 ${isPractice ? 'xl:grid-cols-[minmax(0,1fr)_390px]' : 'xl:grid-cols-[minmax(0,1fr)_320px]'}`}>
          <main className={`relative flex min-h-0 flex-col overflow-hidden rounded-3xl border p-5 shadow-sm ${modeSurface[mode]}`}>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-black ${isTimed ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {setup?.challenge?.title || 'Quiz'}
              </span>
              {isTimed && <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">Multiplicador x{Math.max(1, streak)}</span>}
              {isPractice && <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">Concepto: {question.concept}</span>}
            </div>

            <div className={`mt-4 grid gap-3 text-sm font-black ${isTimed ? 'text-white' : 'text-slate-700'} sm:grid-cols-3`}>
              <div className={`rounded-2xl px-4 py-3 ${isTimed ? 'bg-white/10' : 'bg-sky-50'}`}>
                <p className="text-[11px] uppercase opacity-60">Modo</p>
                <p className="mt-1">{config.label}</p>
              </div>
              <div className={`rounded-2xl px-4 py-3 ${isTimed ? 'bg-white/10' : 'bg-amber-50'}`}>
                <p className="text-[11px] uppercase opacity-60">Racha</p>
                <p className="mt-1">x{Math.max(1, streak)}</p>
              </div>
              <div className={`rounded-2xl px-4 py-3 ${isTimed ? 'bg-white/10' : 'bg-emerald-50'}`}>
                <p className="text-[11px] uppercase opacity-60">Progreso</p>
                <p className="mt-1">{Math.round(progress)}%</p>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden pr-1">
              <h1 className={`mt-5 text-2xl font-black leading-tight md:text-4xl ${isTimed ? 'text-white' : 'text-slate-950'}`}>
                {question.question}
              </h1>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {question.options.map((option, index) => (
                  <Motion.button
                    key={`${question.id}-${currentIndex}-${option}`}
                    type="button"
                    onClick={() => handleAnswer(index)}
                    className={optionClass(index)}
                    animate={
                      answered && index === selectedIndex && !selectedIsCorrect
                        ? { x: [0, -8, 8, -5, 5, 0], boxShadow: '0 0 0 4px rgba(244,63,94,0.16)' }
                        : answered && index === question.correctIndex
                          ? { scale: [1, 1.03, 1], boxShadow: '0 0 35px rgba(16,185,129,0.28)' }
                          : { x: 0, scale: 1 }
                    }
                    transition={{ duration: 0.48 }}
                    whileHover={!answered ? { y: -3, scale: 1.01 } : undefined}
                    whileTap={!answered ? { scale: 0.98 } : undefined}
                  >
                    <span className={`mb-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${isTimed ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="relative z-10 block leading-relaxed">{option}</span>
                    {!answered && <span className="absolute inset-y-0 left-0 w-1 bg-sky-400 opacity-0 transition group-hover:opacity-100" />}
                    {answered && index === question.correctIndex && (
                      <Motion.span
                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={popTransition}
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </Motion.span>
                    )}
                  </Motion.button>
                ))}
              </div>

            </div>
          </main>

          <aside className="min-h-0 space-y-4 overflow-hidden pr-1">
            <CompanionBlock companion={setup?.companion} intense={isTimed} message={companionMessage} reaction={companionReaction} streak={streak} />

            {isTimed && (
              <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-white shadow-sm">
                <p className="flex items-center gap-2 text-sm font-black"><Clock className="h-4 w-4" /> Barra de tiempo</p>
                <div className="mt-3">
                  <ProgressBar value={(seconds / 20) * 100} intense />
                </div>
              </div>
            )}

            {isPractice && <PracticeFeedback question={question} selectedIndex={selectedIndex} />}

            {isSurvival && (
              <div className="rounded-3xl border border-rose-100 bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-rose-700">Energia</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-rose-100">
                  <div className="h-full rounded-full bg-rose-500 transition-all" style={{ width: `${(lives / 3) * 100}%` }} />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">Mientras mas aciertos seguidos, mas sube el brillo de tu racha.</p>
              </div>
            )}
          </aside>
        </div>
      </div>

      <div className={`absolute inset-x-0 bottom-0 z-20 border-t px-4 py-3 backdrop-blur ${isTimed ? 'border-white/10 bg-slate-950/85' : 'border-slate-200 bg-white/90'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className={`text-xs font-bold ${isTimed ? 'text-white/70' : 'text-slate-500'}`}>
            {answered ? 'Listo. Continua cuando quieras.' : 'Elige una alternativa para avanzar.'}
          </p>
          <Motion.button
            type="button"
            onClick={goNext}
            disabled={!answered || gameOver}
            className={`inline-flex h-11 min-w-44 items-center justify-center rounded-xl px-5 text-sm font-black shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${isTimed ? 'bg-amber-300 text-slate-950 hover:bg-amber-200' : 'bg-sky-600 text-white hover:bg-sky-700'}`}
            animate={answered ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            whileHover={answered && !gameOver ? { y: -2, scale: 1.03 } : undefined}
            whileTap={answered && !gameOver ? { scale: 0.97 } : undefined}
          >
            {currentIndex === questions.length - 1 ? 'Ver resumen' : 'Siguiente'}
          </Motion.button>
        </div>
      </div>

      <AnswerFooterFeedback feedback={answerFeedback} />

      {gameOver && (
        <QuizSummaryModal
          answers={answers}
          endReason={endReason}
          modeLabel={config.label}
          onBack={onBack}
          onRetry={retryQuiz}
          questionCount={questions.length}
          score={score}
          streak={bestStreak}
        />
      )}
    </div>
  );
};

export default QuizModeExperience;
