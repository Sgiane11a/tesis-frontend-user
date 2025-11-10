import { Badge } from "../ui/badge";
import { Shield, Globe, Zap, GraduationCap } from "lucide-react";

export default function TechnologySection() {
    const pillars = [
        {
            title: "Seguridad",
            mainTitle: "Seguro y Privado",
            description: "Todos los datos personales de alumnos y profesores están totalmente protegidos",
            icon: Shield,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            badgeColor: "bg-purple-100 text-purple-700"
        },
        {
            title: "Accesibilidad",
            mainTitle: "Acceso Universal",
            description: "Compatible con todos los navegadores y dispositivos modernos",
            icon: Globe,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
            badgeColor: "bg-blue-100 text-blue-700"
        },
        {
            title: "Rendimiento",
            mainTitle: "Alto rendimiento",
            description: "Respuestas de la IA en menos tiempo, optimizado únicamente para la educación",
            icon: Zap,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
            badgeColor: "bg-yellow-100 text-yellow-700"
        }
    ];

    return (
        <section className="w-full py-20 bg-gradient-to-br from-gray-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título principal */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Tecnología de Vanguardia
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Construido con las mejores prácticas de seguridad, rendimiento y
                        accesibilidad
                    </p>
                </div>

                {/* Tres pilares */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {pillars.map((pillar, index) => (
                        <div key={index} className="text-center space-y-6">
                            <div className="flex flex-col items-center space-y-4">
                                {/* Badge */}
                                <Badge className={`${pillar.badgeColor} hover:${pillar.badgeColor} px-4 py-2 font-medium`}>
                                    {pillar.title}
                                </Badge>

                                {/* Icono */}
                                <div className={`inline-flex items-center justify-center w-20 h-20 ${pillar.bgColor} rounded-2xl mx-auto`}>
                                    <pillar.icon className={`w-10 h-10 ${pillar.color}`} />
                                </div>
                            </div>

                            {/* Título */}
                            <h3 className="text-2xl font-bold text-gray-900">
                                {pillar.mainTitle}
                            </h3>

                            {/* Descripción */}
                            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Badge de colaboración */}
                <div className="text-center">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 px-6 py-3 text-base font-medium">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        En colaboración con tu institución educativa
                    </Badge>
                </div>
            </div>
        </section>
    );
}