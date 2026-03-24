import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Target, Zap } from 'lucide-react';
import { Text } from '../atoms/Text';
import { Card } from '../atoms/Card';

const motivationalQuotes = [
  {
    quote: "El aprendizaje es un tesoro que seguirá a su dueño en todas partes.",
    author: "Proverbio Chino",
    icon: Sparkles,
    color: "text-yellow-500"
  },
  {
    quote: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.",
    author: "Nelson Mandela",
    icon: Target,
    color: "text-blue-500"
  },
  {
    quote: "El éxito no es final, el fracaso no es fatal: es el coraje para continuar lo que cuenta.",
    author: "Winston Churchill",
    icon: Zap,
    color: "text-purple-500"
  },
  {
    quote: "La mente es todo. Lo que pienses, te conviertes.",
    author: "Buda",
    icon: Heart,
    color: "text-pink-500"
  },
  {
    quote: "El futuro pertenece a quienes creen en la belleza de sus sueños.",
    author: "Eleanor Roosevelt",
    icon: Sparkles,
    color: "text-green-500"
  },
  {
    quote: "Aprende como si fueras a vivir para siempre, vive como si fueras a morir mañana.",
    author: "Mahatma Gandhi",
    icon: Target,
    color: "text-indigo-500"
  }
];

const studyTips = [
  "Estudia en bloques de 25 minutos con descansos de 5 minutos (Técnica Pomodoro)",
  "Repasa tus notas dentro de las 24 horas después de la clase",
  "Enseña lo que aprendiste a alguien más para reforzar el conocimiento",
  "Duerme 7-8 horas para mejorar la memoria y concentración",
  "Haz ejercicio regularmente para aumentar el rendimiento cognitivo"
];

const MotivationPanel = ({ horizontal = false }) => {
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [currentTip, setCurrentTip] = useState(studyTips[0]);

  useEffect(() => {
    // Cambiar frase cada 30 segundos
    const quoteInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
    }, 30000);

    // Cambiar tip cada 45 segundos
    const tipInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * studyTips.length);
      setCurrentTip(studyTips[randomIndex]);
    }, 45000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const IconComponent = currentQuote.icon;

  return (
    <div className="space-y-6">
      {/* Sección de Motivación */}
      <div>
        {/* Título */}
        <div className="px-1 mb-4">
          <Text size="xs" color="muted" weight="semibold" className="uppercase tracking-widest">
            Motivación IA
          </Text>
        </div>

        {/* Card de motivación */}
        <Card className={`p-6 bg-gradient-to-br from-primary-light/10 via-indigo-50/50 to-blue-50/30 border-primary-light/20 ${horizontal ? 'w-full' : ''}`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-full bg-white shadow-sm ${currentQuote.color}`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <blockquote className="text-sm font-medium text-gray-800 leading-relaxed mb-3">
                "{currentQuote.quote}"
              </blockquote>
              <cite className="text-xs text-gray-500 font-medium">
                — {currentQuote.author}
              </cite>
            </div>
          </div>

          {/* Indicador de IA */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <Text size="xs" color="muted">
                Generado por IA • Se actualiza automáticamente
              </Text>
            </div>
          </div>
        </Card>
      </div>

      {/* Sección de Consejos de Estudio */}
      <div>
        {/* Título */}
        <div className="px-1 mb-4">
          <Text size="xs" color="muted" weight="semibold" className="uppercase tracking-widest">
            Consejos de Estudio
          </Text>
        </div>

        {/* Card de consejos */}
        <Card className={`p-5 bg-gradient-to-br from-emerald-50/50 to-green-50/30 border-emerald-200/30 ${horizontal ? 'w-full' : ''}`}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-emerald-100 shadow-sm">
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800 leading-relaxed">
                {currentTip}
              </p>
            </div>
          </div>

          {/* Indicador de rotación */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <Text size="xs" color="muted">
                Consejo inteligente • Cambia cada 45s
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { MotivationPanel };