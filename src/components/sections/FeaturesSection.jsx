import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { MessageSquare, FolderOpen, Zap, Smartphone, Upload, BarChart3, Users, Headphones } from "lucide-react";

export default function FeaturesSection() {
  const studentFeatures = [
    {
      title: "Chat Inteligente 24/7",
      description: "Haz preguntas sobre cualquier tema de tus materias en cualquier momento del día",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Acceso a todo el Material",
      description: "Consulta todas las presentaciones, PDFs y recursos que han subido tus profesores",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Respuestas Instantáneas",
      description: "Recibe explicaciones detalladas basadas en el contenido específico de cada curso",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Multiplataforma",
      description: "Accede desde cualquier dispositivo: computadora, tablet o smartphone",
      icon: Smartphone,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ];

  const teacherFeatures = [
    {
      title: "Fácil Carga de Material",
      description: "Sube presentaciones PPT, documentos PDF y otros recursos con solo arrastrar y soltar",
      icon: Upload,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Analíticas Detalladas",
      description: "Ve qué temas generan más preguntas y ajusta tu enseñanza según las necesidades",
      icon: BarChart3,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Gestión de Estudiantes",
      description: "Administra fácilmente tu clase y mantén el material organizado por cursos",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Soporte Automático",
      description: "La IA responde por ti las dudas básicas, liberando tu tiempo para lo importante",
      icon: Headphones,
      color: "text-green-600",
      bgColor: "bg-green-50"
    }
  ];

  return (
  <section id="caracteristicas" style={{scrollMarginTop: '4rem'}} className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Características Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Una plataforma completa diseñada para revolucionar la experiencia
            tanto para estudiantes como para profesores
          </p>
        </div>

        {/* Sección Para Estudiantes */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-4 px-4 py-2">
              Para estudiantes
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900">
              Aprende Sin Límites
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentFeatures.map((feature, index) => (
              <Card key={index} className="p-6 flex  flex-col items-center text-center border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-xl mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Sección Para Profesores */}
        <div>
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-4 px-4 py-2">
              Para Profesores
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900">
              Enseña con Inteligencia
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teacherFeatures.map((feature, index) => (
              <Card key={index} className="p-6 flex flex-col items-center text-center border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-xl mb-4`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}