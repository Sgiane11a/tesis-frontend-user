import React from 'react';
import { BookOpen, MessageSquare, Brain, Search, Filter } from 'lucide-react';
import { Text, Avatar } from '../../atoms';
import StudentMetricSection from './StudentMetricSection';

const StudentDetailMetrics = ({ student }) => (
  <div className="flex flex-col h-full">
    <div className="p-5 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar name={student.nombre} size="lg" />
        <div>
          <Text weight="bold" size="lg">{student.nombre}</Text>
          <Text size="sm" color="muted">{student.correo}</Text>
        </div>
      </div>
    </div>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <StudentMetricSection
        icon={BookOpen}
        title="Quizzes"
        iconClassName="text-primary"
        columns={3}
        metrics={[
          { label: 'Total', value: student.metrics.quizzes.total, color: 'primary' },
          { label: 'Completados', value: student.metrics.quizzes.completados, color: 'success' },
          { label: 'Promedio', value: `${student.metrics.quizzes.promedio}%`, color: 'warning' },
        ]}
      />

      <StudentMetricSection
        icon={Brain}
        title="Intentos Quiz"
        iconClassName="text-blue-500"
        metrics={[
          { label: 'Total Intentos', value: student.metrics.intentosQuiz.total, color: 'blue' },
          { label: 'Correctos', value: student.metrics.intentosQuiz.correctos, color: 'green' },
        ]}
      />

      <StudentMetricSection
        icon={Filter}
        title="Opciones"
        iconClassName="text-purple-500"
        metrics={[
          { label: 'Total', value: student.metrics.opciones.total, color: 'purple' },
          { label: 'Correctas', value: student.metrics.opciones.correctas, color: 'green' },
        ]}
      />

      <StudentMetricSection
        icon={Search}
        title="Respuesta Intento"
        iconClassName="text-indigo-500"
        metrics={[
          { label: 'Total', value: student.metrics.respuestaIntento.total, color: 'indigo' },
          { label: 'Correctas', value: student.metrics.respuestaIntento.correctas, color: 'green' },
        ]}
      />

      <StudentMetricSection
        icon={Brain}
        title="Sopa de Letras"
        iconClassName="text-orange-500"
        columns={3}
        metrics={[
          { label: 'Jugados', value: student.metrics.sopasLetras.jugados, color: 'orange' },
          { label: 'Completados', value: student.metrics.sopasLetras.completados, color: 'green' },
          { label: 'Tiempo Prom.', value: student.metrics.sopasLetras.tiempoPromedio, color: 'gray' },
        ]}
      />

      <StudentMetricSection
        icon={BookOpen}
        title="Tarjetas de Estudio"
        iconClassName="text-teal-500"
        columns={3}
        metrics={[
          { label: 'Creadas', value: student.metrics.tarjetasEstudio.creadas, color: 'teal' },
          { label: 'Estudiadas', value: student.metrics.tarjetasEstudio.estudiadas, color: 'blue' },
          { label: 'Precision', value: `${student.metrics.tarjetasEstudio.precision}%`, color: 'green' },
        ]}
      />

      <StudentMetricSection
        icon={Brain}
        title="Mapas Mentales IA"
        iconClassName="text-violet-500"
        metrics={[
          { label: 'Creados', value: student.metrics.mapasMentales.creados, color: 'violet' },
          { label: 'Calidad Prom.', value: `${student.metrics.mapasMentales.promedioCalidad}%`, color: 'purple' },
        ]}
      />

      <StudentMetricSection
        icon={MessageSquare}
        title="Chat IA"
        iconClassName="text-cyan-500"
        columns={3}
        metrics={[
          { label: 'Mensajes', value: student.metrics.chat.mensajes, color: 'cyan' },
          { label: 'Preguntas', value: student.metrics.chat.preguntas, color: 'blue' },
          { label: 'Prompts IA', value: student.metrics.chat.promptsIA, color: 'indigo' },
        ]}
      />
    </div>
  </div>
);

export default StudentDetailMetrics;
