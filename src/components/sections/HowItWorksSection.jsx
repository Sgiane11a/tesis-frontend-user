import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { BookOpen, MessageCircle, Lightbulb, Upload, Cpu, Users } from "lucide-react";

export default function HowItWorksSection() {
  const studentSteps = [
    {
      number: "01",
      title: "Accede A Tus Materias",
      description: "Ingresa a tus cursos matriculados y en donde tus profesores han subido material educativo",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      number: "02", 
      title: "Haz Preguntas a la IA",
      description: "Chatea con Nuestro asistente de inteligencia sobre cualquier tema del material brindado por los profesores",
      icon: MessageCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      number: "03",
      title: "Recibe Respuestas Personalizadas",
      description: "L IA analiza el contenido y te da explicaciones adaptadas a tu nivel de rendimiento",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  ];

  const teacherSteps = [
    {
      number: "01",
      title: "Sube Tu Material",
      description: "Carga presentaciones PPT, documentos PDF y otros recursos educativos",
      icon: Upload,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      number: "02",
      title: "IA Procesa el Contenido", 
      description: "Nuestra inteligencia Artificial analiza y comprende tu material automáticamente",
      icon: Cpu,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      number: "03",
      title: "Estudiantes Interactúan",
      description: "Tus alumnos pueden hacer preguntas específicas sobre tu contenido subido",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            ¿Cómo Funciona?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Una plataforma simple pero poderosa que conecta profesores,
            estudiantes e inteligencia artificial para una experiencia educativa
            revolucionario.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Columna Para Estudiantes */}
          <div className="space-y-8">
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 px-4 py-2">
                Para estudiantes
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Aprende de Manera Inteligente
              </h3>
              <p className="text-gray-600">
                Haz preguntas específicas sobre el material de clase y
                recibe explicaciones personalizadas
              </p>
            </div>

            <div className="space-y-6">
              {studentSteps.map((step, index) => (
                <Card key={index} className={`p-6 ${step.borderColor} border-2 hover:shadow-lg transition-all duration-300 h-36`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-sm font-semibold ${step.color}`}>
                          {step.number}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Columna Para Profesores */}
          <div className="space-y-8">
            <div className="text-center">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-4 px-4 py-2">
                Para Profesores
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enseña con IA
              </h3>
              <p className="text-gray-600">
                Sube tu material y deja que la IA pueda ayudar a todos tus
                estudiantes en cualquier día y a cualquier hora.
              </p>
            </div>

            <div className="space-y-6">
              {teacherSteps.map((step, index) => (
                <Card key={index} className={`p-6 ${step.borderColor} border-2 hover:shadow-lg transition-all duration-300 h-36`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 ${step.color}`} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-sm font-semibold ${step.color}`}>
                          {step.number}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}