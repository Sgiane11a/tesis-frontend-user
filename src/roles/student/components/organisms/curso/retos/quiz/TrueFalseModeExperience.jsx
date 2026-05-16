import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, Heart, RotateCcw, Shield, Sparkles, Timer, Trophy, X, Zap } from 'lucide-react';
import { companionColors, quizModeCopy, trueFalseQuestions } from './data/quizMock';

const Motion = motion;

const shellByMode = {
  normal: 'bg-sky-50 text-slate-950',
  timed: 'bg-slate-950 text-white',
  practice: 'bg-emerald-50 text-slate-950',
  survival: 'bg-rose-50 text-slate-950',
};

const AnimatedNumber = ({ value, suffix = '' }) => {
  const motionValue = useMotionValue(value);
  const rounded = useTransform(motionValue, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.45, ease: 'easeOut' });
    return controls.stop;
  }, [motionValue, value]);

  return <Motion.span>{rounded}</Motion.span>;
};

const ProgressBar = ({ value, intense }) => (
  <div className="h-3 overflow-hidden rounded-full bg-white/50 shadow-inner">
    <Motion.div
      className={`h-full rounded-full ${intense ? 'bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-400' : 'bg-gradient-to-r from-sky-500 to-emerald-400'}`}
      initial={false}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

const Mascot = ({ companion, reaction, message, intense }) => (
  <Motion.aside
    className={`rounded-3xl border p-4 text-center shadow-lg ${intense ? 'border-white/10 bg-white/10 text-white' : 'border-white bg-white/80 text-slate-700'}`}
    animate={reaction === 'happy' ? { scale: [1, 1.04, 1] } : reaction === 'sad' ? { y: [0, 4, 0] } : { y: [0, -3, 0] }}
    transition={{ duration: reaction === 'idle' ? 2.8 : 0.7, repeat: reaction === 'idle' ? Infinity : 0 }}
  >
    <p className="text-sm font-black leading-relaxed">{message}</p>
    <Motion.div
      className={`mx-auto mt-4 h-28 w-28 rounded-[2rem] ${companionColors[companion] || 'bg-sky-500'} shadow-xl`}
      animate={
        reaction === 'happy'
          ? { rotate: [-5, 5, -2, 0], scale: [1, 1.12, 1] }
          : reaction === 'sad'
            ? { rotate: [0, -4, 4, 0], scale: [1, 0.96, 1] }
            : { y: [0, -4, 0] }
      }
      transition={{ duration: reaction === 'idle' ? 2.4 : 0.6, repeat: reaction === 'idle' ? Infinity : 0 }}
    >
      <span className="absolute" />
      <div className="relative h-full w-full">
        <span className="absolute left-7 top-9 h-3 w-3 rounded-full bg-white" />
        <span className="absolute right-7 top-9 h-3 w-3 rounded-full bg-white" />
        <span className={`absolute bottom-8 left-1/2 h-2 -translate-x-1/2 rounded-full bg-white ${reaction === 'sad' ? 'w-5' : 'w-10'}`} />
      </div>
    </Motion.div>
  </Motion.aside>
);

const FeedbackFooter = ({ feedback }) => (
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
            <DotLottieReact src={feedback.isCorrect ? '/acierto.json' : '/falla.json'} autoplay loop style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="min-w-0">
            <p className="text-3xl font-black leading-none md:text-5xl">{feedback.isCorrect ? 'Correcto' : 'Incorrecto'}</p>
            <p className="mt-2 truncate text-sm font-bold text-white/90 md:text-base">{feedback.message}</p>
          </div>
        </div>
        <div className="shrink-0 rounded-3xl bg-white px-5 py-3 text-center shadow-xl md:px-7 md:py-4">
          <p className={`text-4xl font-black leading-none md:text-6xl ${feedback.isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
            {feedback.xp > 0 ? `+${feedback.xp}` : '0'}
          </p>
          <p className="mt-1 text-xs font-black uppercase tracking-wide text-slate-500">XP</p>
        </div>
      </Motion.div>
    )}
  </AnimatePresence>
);

const SummaryModal = ({ answers, modeLabel, onBack, onRetry, questionCount, score, streak }) => {
  const correct = answers.filter((answer) => answer.isCorrect).length;
  const accuracy = questionCount ? Math.round((correct / questionCount) * 100) : 0;

  return (
    <Motion.div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Motion.section
        className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white text-slate-950 shadow-2xl"
        initial={{ y: 40, scale: 0.92, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      >
        <div className="bg-sky-600 px-6 py-6 text-white">
          <p className="text-xs font-black uppercase text-sky-100">{modeLabel}</p>
          <div className="mt-2 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-black">Reto completado</h2>
            <Motion.div animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.12, 1] }} transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.6 }}>
              <Trophy className="h-14 w-14 text-amber-300" />
            </Motion.div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              ['Aciertos', correct, 'bg-emerald-50 text-emerald-700'],
              ['Errores', answers.length - correct, 'bg-rose-50 text-rose-700'],
              ['Precision', `${accuracy}%`, 'bg-sky-50 text-sky-700'],
              ['XP', score, 'bg-amber-50 text-amber-700'],
            ].map(([label, value, tone], index) => (
              <Motion.div key={label} className={`rounded-2xl p-4 text-center ${tone}`} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.08 }}>
                <p className="text-3xl font-black">{typeof value === 'number' ? <AnimatedNumber value={value} /> : value}</p>
                <p className="mt-1 text-[11px] font-black uppercase">{label}</p>
              </Motion.div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-black uppercase text-slate-400">Mejor racha</p>
              <p className="mt-1 text-2xl font-black">{streak}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-700">
              <p className="text-xs font-black uppercase">Badge</p>
              <p className="mt-1 font-black">{accuracy >= 80 ? 'Dominio brillante' : 'Sigue subiendo'}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 p-4 text-sky-700">
              <p className="text-xs font-black uppercase">Recompensa</p>
              <p className="mt-1 font-black">Pensamiento rapido</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Motion.button type="button" onClick={onBack} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600" whileTap={{ scale: 0.97 }}>
              Salir
            </Motion.button>
            <Motion.button type="button" onClick={onRetry} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-bold text-white shadow-sm" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <RotateCcw className="h-4 w-4" />
              Reintentar
            </Motion.button>
          </div>
        </div>
      </Motion.section>
    </Motion.div>
  );
};

const TrueFalseModeExperience = ({ setup, onBack }) => {
  const mode = setup?.mode || 'normal';
  const config = quizModeCopy[mode] || quizModeCopy.normal;
  const questionCount = Number(setup?.questionCount) || 10;
  const questions = useMemo(
    () => Array.from({ length: questionCount }, (_, index) => trueFalseQuestions[index % trueFalseQuestions.length]),
    [questionCount]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [seconds, setSeconds] = useState(18);
  const [lives, setLives] = useState(3);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isTimed = mode === 'timed';
  const isPractice = mode === 'practice';
  const isSurvival = mode === 'survival';
  const answered = selectedAnswer !== null;
  const selectedIsCorrect = selectedAnswer === question.answer;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const reaction = answered ? (selectedIsCorrect ? 'happy' : 'sad') : 'idle';
  const mascotMessage = answered
    ? selectedIsCorrect
      ? 'Buen ojo. Esa afirmacion estaba bien analizada.'
      : 'Respira. El error tambien revela que parte revisar.'
    : isTimed
      ? 'Lee rapido, pero decide con calma.'
      : 'Lee la afirmacion y decide si se sostiene o no.';

  const recordAnswer = useCallback((answer, timedOut = false) => {
    const isCorrect = !timedOut && answer === question.answer;
    const gainedXp = isCorrect ? 8 * (isTimed ? Math.max(1, streak + 1) : 1) : 0;
    setSelectedAnswer(answer);
    setAnswers((current) => [...current, { ...question, selectedAnswer: timedOut ? null : answer, isCorrect }]);
    setFeedback({
      id: `${currentIndex}-${answer}-${timedOut ? 'time' : 'pick'}`,
      isCorrect,
      xp: gainedXp,
      message: isCorrect ? question.tip : question.explanation,
    });

    if (isCorrect) {
      setScore((current) => current + gainedXp);
      setStreak((current) => {
        const next = current + 1;
        setBestStreak((best) => Math.max(best, next));
        return next;
      });
      return;
    }

    setStreak(0);
    if (isSurvival) {
      setLives((current) => {
        const next = Math.max(0, current - 1);
        if (next === 0) setFinished(true);
        return next;
      });
    }
  }, [currentIndex, isSurvival, isTimed, question, streak]);

  useEffect(() => {
    if (!isTimed || answered || finished) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          recordAnswer(!question.answer, true);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [answered, finished, isTimed, question.answer, recordAnswer]);

  useEffect(() => {
    if (!feedback) return undefined;
    const timeout = window.setTimeout(() => setFeedback(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const handleAnswer = (answer, timedOut = false) => {
    if (answered || finished) return;
    recordAnswer(answer, timedOut);
  };

  const goNext = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrentIndex((current) => current + 1);
    setSelectedAnswer(null);
    setFeedback(null);
    setSeconds(18);
  };

  const retry = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSeconds(18);
    setLives(3);
    setAnswers([]);
    setFeedback(null);
    setFinished(false);
  };

  const answerButtonClass = (value) => {
    const base = 'relative flex min-h-40 flex-1 items-center justify-center overflow-hidden rounded-[2rem] border-4 px-6 text-4xl font-black shadow-xl transition focus:outline-none';
    if (!answered) {
      return value
        ? `${base} border-emerald-300 bg-emerald-400 text-white hover:-translate-y-1 hover:shadow-emerald-300/50`
        : `${base} border-rose-300 bg-rose-400 text-white hover:-translate-y-1 hover:shadow-rose-300/50`;
    }
    if (value === question.answer) return `${base} border-emerald-300 bg-emerald-100 text-emerald-800 shadow-emerald-300/40`;
    if (value === selectedAnswer) return `${base} border-rose-300 bg-rose-100 text-rose-800 shadow-rose-300/40`;
    return `${base} border-slate-200 bg-slate-100 text-slate-400 opacity-70`;
  };

  return (
    <div className={`relative h-[calc(100vh-4.5rem)] overflow-hidden rounded-3xl ${shellByMode[mode]}`}>
      <div className="pointer-events-none absolute inset-0">
        {mode === 'timed' && <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-amber-400/20 to-transparent" />}
        {mode === 'survival' && <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl" />}
        {mode === 'practice' && <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />}
      </div>

      <button type="button" onClick={onBack} className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/70 text-slate-600 shadow-sm">
        <X className="h-5 w-5" />
      </button>

      <div className="relative z-10 flex h-full min-h-0 flex-col gap-4 p-4 pb-20 md:p-6 md:pb-20">
        <Motion.header layout className={`rounded-3xl border p-4 shadow-xl backdrop-blur ${mode === 'timed' ? 'border-white/10 bg-white/10 text-white' : 'border-white bg-white/80'}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase opacity-60">Verdadero o Falso</p>
              <p className="mt-1 text-sm font-bold">Pregunta {currentIndex + 1} de {questions.length}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-black">
              <span className="rounded-full bg-amber-300 px-3 py-1 text-slate-950"><AnimatedNumber value={score} /> XP</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-sky-700"><Zap className="h-4 w-4" /> x{Math.max(1, streak)}</span>
              {isTimed && <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-rose-700"><Timer className="h-4 w-4" /> {seconds}s</span>}
              {isSurvival && <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-rose-700"><Heart className="h-4 w-4 fill-rose-500" /> {lives}</span>}
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={progress} intense={isTimed} />
          </div>
        </Motion.header>

        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="flex min-h-0 flex-col gap-4">
            <AnimatePresence mode="wait">
              <Motion.section
                key={question.id + currentIndex}
                className={`flex min-h-0 flex-1 flex-col justify-center rounded-[2rem] border p-6 text-center shadow-2xl ${mode === 'timed' ? 'border-white/10 bg-white/10 text-white' : 'border-white bg-white/90'}`}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              >
                <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-xs font-black text-sky-700">
                  <Sparkles className="h-4 w-4" />
                  {question.concept}
                </div>
                <h1 className="mx-auto max-w-4xl text-3xl font-black leading-tight md:text-5xl">{question.statement}</h1>
              </Motion.section>
            </AnimatePresence>

            <div className="grid gap-4 md:grid-cols-2">
              {[true, false].map((value) => (
                <Motion.button
                  key={String(value)}
                  type="button"
                  onClick={() => handleAnswer(value)}
                  disabled={answered}
                  className={answerButtonClass(value)}
                  animate={
                    answered && value === selectedAnswer && !selectedIsCorrect
                      ? { x: [0, -10, 10, -6, 6, 0] }
                      : answered && value === question.answer
                        ? { scale: [1, 1.04, 1], boxShadow: '0 0 36px rgba(16,185,129,0.35)' }
                        : { x: 0, scale: 1 }
                  }
                  whileHover={!answered ? { y: -4, scale: 1.02 } : undefined}
                  whileTap={!answered ? { scale: 0.97 } : undefined}
                >
                  {value ? 'Verdadero' : 'Falso'}
                  {answered && value === question.answer && (
                    <Motion.span className="absolute right-5 top-5 rounded-full bg-white/80 p-2 text-emerald-600" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="h-7 w-7" />
                    </Motion.span>
                  )}
                </Motion.button>
              ))}
            </div>
          </main>

          <aside className="min-h-0 space-y-4 overflow-hidden">
            <Mascot companion={setup?.companion} reaction={reaction} message={mascotMessage} intense={mode === 'timed'} />
            <AnimatePresence>
              {answered && (
                <Motion.div className="rounded-3xl border border-sky-100 bg-white/90 p-4 shadow-lg" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 14 }}>
                  <p className="text-xs font-black uppercase text-sky-700">Feedback IA</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700">{selectedIsCorrect ? question.tip : question.explanation}</p>
                  {isPractice && (
                    <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700">
                      Consejo: compara la afirmacion con la idea central, no solo con una palabra suelta.
                    </p>
                  )}
                </Motion.div>
              )}
            </AnimatePresence>
            {isSurvival && (
              <div className="rounded-3xl border border-rose-100 bg-white/90 p-4 shadow-lg">
                <p className="flex items-center gap-2 text-sm font-black text-rose-700"><Shield className="h-4 w-4" /> Vidas</p>
                <div className="mt-3 flex gap-2">
                  {[0, 1, 2].map((item) => <Heart key={item} className={`h-7 w-7 ${item < lives ? 'fill-rose-500 text-rose-500' : 'text-slate-200'}`} />)}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      <div className={`absolute inset-x-0 bottom-0 z-20 border-t px-4 py-3 backdrop-blur ${mode === 'timed' ? 'border-white/10 bg-slate-950/85 text-white' : 'border-slate-200 bg-white/90 text-slate-600'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <p className="text-xs font-bold">{answered ? 'Listo. Revisa el feedback y continua.' : 'Elige Verdadero o Falso.'}</p>
          <Motion.button
            type="button"
            onClick={goNext}
            disabled={!answered || finished}
            className="h-11 min-w-44 rounded-xl bg-sky-600 px-5 text-sm font-black text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
            animate={answered ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            whileTap={{ scale: 0.97 }}
          >
            {currentIndex === questions.length - 1 ? 'Ver resumen' : 'Siguiente'}
          </Motion.button>
        </div>
      </div>

      <FeedbackFooter feedback={feedback} />

      {finished && (
        <SummaryModal
          answers={answers}
          modeLabel={config.label}
          onBack={onBack}
          onRetry={retry}
          questionCount={questions.length}
          score={score}
          streak={bestStreak}
        />
      )}
    </div>
  );
};

export default TrueFalseModeExperience;
