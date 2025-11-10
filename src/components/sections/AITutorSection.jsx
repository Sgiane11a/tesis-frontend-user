import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Brain, Zap, Target, BarChart3 } from "lucide-react";

export default function AITutorSection() {
  const features = [
    {
      title: "Comprensión Contextual",
      description: "La IA comprende el contexto específico de cada materia y adapta sus respuestas",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Respuestas Instantáneas", 
      description: "Obtén explicaciones inmediatas sin esperar los horarios de clases",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Aprendizaje personalizado",
      description: "Se adapta al nivel y estilo de aprendizaje de cada estudiante",
      icon: Target,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Analíticas Educativas",
      description: "Los profesores pueden ver qué temas generan más preguntas y así poder explicar más a fondo durante clases.",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-6 px-4 py-2">
            Inteligencia Artificial
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tu Tutor IA Personal
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Nuestra avanzada Inteligencia Artificial ha sido entrenada
            específicamente para la educación, proporcionando asistencia
            personalizada basada en el material de cada curso.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Imagen/Mockup de AI */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
              {/* Texto AI grande */}
              <div className="text-center mb-8">
                <div className="text-8xl lg:text-9xl font-bold text-white opacity-90 tracking-wider">
                  AI
                </div>
              </div>
              
              {/* Chat bubble */}
              <div className="bg-white rounded-xl p-4 shadow-lg max-w-sm">
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">EduIA Asistente</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  "Basándome en el PDF de matemáticas que subió tu profesor, te explico las derivadas paso a paso..."
                </p>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-40 animate-pulse delay-700"></div>
          </div>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 flexborder-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="space-y-4">
                  {/* Icono */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-xl`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  {/* Título */}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  
                  {/* Descripción */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}