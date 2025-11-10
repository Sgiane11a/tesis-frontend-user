export default function Footer() {
  const navigationLinks = [
    "Cómo funciona",
    "Características", 
    "IA Educativa",
    "Cómo funciona"
  ];

  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5zM10.5 17L7 13.5l1.5-1.5L10.5 14l5.5-5.5L17.5 10 10.5 17z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">EduIA</h3>
                <p className="text-sm text-gray-600">Plataforma Educativa</p>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-md leading-relaxed">
              Revolucionamos la educación combinando inteligencia artificial
              avanzada con metodologías pedagógicas probadas para crear
              experiencias de aprendizaje únicas.
            </p>
          </div>

          {/* Enlaces de navegación */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Plataforma</h4>
            <nav className="space-y-3">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="block text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="text-center text-gray-500 text-sm">
            © 2025 EduIA. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}