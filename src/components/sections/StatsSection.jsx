import { Card } from "../ui/card";

export default function StatsSection() {
  const stats = [
    {
      number: "500+",
      label: "Estudiantes activos",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      number: "50+",
      label: "Profesores",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      number: "24/7",
      label: "IA Disponible",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.bgColor} mb-4`}>
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.number.includes('+') ? stat.number.slice(0, -1) : stat.number}
                  {stat.number.includes('+') && <span className="text-lg">+</span>}
                </span>
              </div>
              <h3 className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}