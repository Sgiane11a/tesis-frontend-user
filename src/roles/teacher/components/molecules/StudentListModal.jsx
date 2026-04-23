import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, User, BookOpen, MessageSquare, Brain, Search, Filter } from 'lucide-react';
import { Text, Avatar, Badge } from '../atoms';

// Mock data de estudiantes con rendimiento
const mockStudents = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    correo: 'juan.perez@colegio.edu',
    avatar: null,
    metrics: {
      quizzes: { total: 10, completados: 8, promedio: 85 },
      intentosQuiz: { total: 15, correctos: 12 },
      opciones: { total: 50, correctas: 42 },
      respuestaIntento: { total: 30, correctas: 25 },
      sopasLetras: { jugados: 5, completados: 4, tiempoPromedio: '4:30' },
      tarjetasEstudio: { creadas: 20, estudiadas: 18, precision: 90 },
      mapasMentales: { creados: 3, promedioCalidad: 88 },
      chat: { mensajes: 45, preguntas: 12, promptsIA: 8 }
    }
  },
  {
    id: 2,
    nombre: 'María García',
    correo: 'maria.garcia@colegio.edu',
    avatar: null,
    metrics: {
      quizzes: { total: 10, completados: 10, promedio: 92 },
      intentosQuiz: { total: 18, correctos: 16 },
      opciones: { total: 60, correctas: 55 },
      respuestaIntento: { total: 40, correctas: 36 },
      sopasLetras: { jugados: 8, completados: 8, tiempoPromedio: '3:15' },
      tarjetasEstudio: { creadas: 35, estudiadas: 32, precision: 95 },
      mapasMentales: { creados: 5, promedioCalidad: 94 },
      chat: { mensajes: 78, preguntas: 20, promptsIA: 15 }
    }
  },
  {
    id: 3,
    nombre: 'Carlos López',
    correo: 'carlos.lopez@colegio.edu',
    avatar: null,
    metrics: {
      quizzes: { total: 10, completados: 6, promedio: 65 },
      intentosQuiz: { total: 10, correctos: 6 },
      opciones: { total: 35, correctas: 22 },
      respuestaIntento: { total: 20, correctas: 12 },
      sopasLetras: { jugados: 3, completados: 2, tiempoPromedio: '6:45' },
      tarjetasEstudio: { creadas: 10, estudiadas: 8, precision: 70 },
      mapasMentales: { creados: 1, promedioCalidad: 60 },
      chat: { mensajes: 25, preguntas: 5, promptsIA: 3 }
    }
  },
  {
    id: 4,
    nombre: 'Ana Martínez',
    correo: 'ana.martinez@colegio.edu',
    avatar: null,
    metrics: {
      quizzes: { total: 10, completados: 9, promedio: 88 },
      intentosQuiz: { total: 16, correctos: 14 },
      opciones: { total: 55, correctas: 48 },
      respuestaIntento: { total: 35, correctas: 30 },
      sopasLetras: { jugados: 6, completados: 5, tiempoPromedio: '4:00' },
      tarjetasEstudio: { creadas: 28, estudiadas: 25, precision: 88 },
      mapasMentales: { creados: 4, promedioCalidad: 85 },
      chat: { mensajes: 52, preguntas: 15, promptsIA: 10 }
    }
  },
  {
    id: 5,
    nombre: 'Pedro Sánchez',
    correo: 'pedro.sanchez@colegio.edu',
    avatar: null,
    metrics: {
      quizzes: { total: 10, completados: 7, promedio: 72 },
      intentosQuiz: { total: 12, correctos: 8 },
      opciones: { total: 40, correctas: 28 },
      respuestaIntento: { total: 25, correctas: 18 },
      sopasLetras: { jugados: 4, completados: 3, tiempoPromedio: '5:20' },
      tarjetasEstudio: { creadas: 15, estudiadas: 12, precision: 75 },
      mapasMentales: { creados: 2, promedioCalidad: 72 },
      chat: { mensajes: 30, preguntas: 8, promptsIA: 5 }
    }
  }
];

const MetricCard = ({ icon: Icon, label, value, subValue, color = 'primary' }) => (
  <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
    <Icon className={`w-5 h-5 text-${color} mb-1`} />
    <Text size="xs" weight="semibold" className="text-gray-700">{label}</Text>
    <Text size="lg" weight="bold" className="text-gray-900">{value}</Text>
    {subValue && <Text size="xs" color="muted">{subValue}</Text>}
  </div>
);

const StudentRow = ({ student, onClick, isSelected }) => (
  <div 
    onClick={() => onClick(student)}
    className={`p-4 border-b border-slate-200 cursor-pointer transition-colors ${isSelected ? 'bg-slate-100 border-l-4 border-primary' : 'hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-3">
      <Avatar name={student.nombre} size="md" />
      <div className="flex-1 min-w-0">
        <Text weight="semibold" className="truncate">{student.nombre}</Text>
        <Text size="xs" color="muted" className="truncate">{student.correo}</Text>
      </div>
      <div className="flex items-center gap-2">
        <Badge color="success" size="sm">
          {student.metrics.quizzes.promedio}%
        </Badge>
        <Text size="xs" color="muted">quiz</Text>
      </div>
    </div>
  </div>
);

const StudentDetail = ({ student }) => (
  <div className="flex flex-col h-full">
    {/* Header */}
    <div className="p-5 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar name={student.nombre} size="lg" />
        <div>
          <Text weight="bold" size="lg">{student.nombre}</Text>
          <Text size="sm" color="muted">{student.correo}</Text>
        </div>
      </div>
    </div>

    {/* Métricas */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Quizzes */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Quizzes
        </Text>
        <div className="grid grid-cols-3 gap-2">
          <MetricCard 
            icon={BookOpen} 
            label="Total" 
            value={student.metrics.quizzes.total} 
            color="primary"
          />
          <MetricCard 
            icon={BookOpen} 
            label="Completados" 
            value={student.metrics.quizzes.completados} 
            color="success"
          />
          <MetricCard 
            icon={BookOpen} 
            label="Promedio" 
            value={`${student.metrics.quizzes.promedio}%`} 
            color="warning"
          />
        </div>
      </div>

      {/* Intentos Quiz */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4 text-blue-500" />
          Intentos Quiz
        </Text>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard 
            icon={Brain} 
            label="Total Intentos" 
            value={student.metrics.intentosQuiz.total} 
            color="blue"
          />
          <MetricCard 
            icon={Brain} 
            label="Correctos" 
            value={student.metrics.intentosQuiz.correctos} 
            color="green"
          />
        </div>
      </div>

      {/* Opciones */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-500" />
          Opciones
        </Text>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard 
            icon={Filter} 
            label="Total" 
            value={student.metrics.opciones.total} 
            color="purple"
          />
          <MetricCard 
            icon={Filter} 
            label="Correctas" 
            value={student.metrics.opciones.correctas} 
            color="green"
          />
        </div>
      </div>

      {/* Respuesta Intento */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <Search className="w-4 h-4 text-indigo-500" />
          Respuesta Intento
        </Text>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard 
            icon={Search} 
            label="Total" 
            value={student.metrics.respuestaIntento.total} 
            color="indigo"
          />
          <MetricCard 
            icon={Search} 
            label="Correctas" 
            value={student.metrics.respuestaIntento.correctas} 
            color="green"
          />
        </div>
      </div>

      {/* Sopa de Letras */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4 text-orange-500" />
          Sopa de Letras
        </Text>
        <div className="grid grid-cols-3 gap-2">
          <MetricCard 
            icon={Brain} 
            label="Jugados" 
            value={student.metrics.sopasLetras.jugados} 
            color="orange"
          />
          <MetricCard 
            icon={Brain} 
            label="Completados" 
            value={student.metrics.sopasLetras.completados} 
            color="green"
          />
          <MetricCard 
            icon={Brain} 
            label="Tiempo Prom." 
            value={student.metrics.sopasLetras.tiempoPromedio} 
            color="gray"
          />
        </div>
      </div>

      {/* Tarjetas de Estudio */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-500" />
          Tarjetas de Estudio
        </Text>
        <div className="grid grid-cols-3 gap-2">
          <MetricCard 
            icon={BookOpen} 
            label="Creadas" 
            value={student.metrics.tarjetasEstudio.creadas} 
            color="teal"
          />
          <MetricCard 
            icon={BookOpen} 
            label="Estudiadas" 
            value={student.metrics.tarjetasEstudio.estudiadas} 
            color="blue"
          />
          <MetricCard 
            icon={BookOpen} 
            label="Precisión" 
            value={`${student.metrics.tarjetasEstudio.precision}%`} 
            color="green"
          />
        </div>
      </div>

      {/* Mapas Mentales IA */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <Brain className="w-4 h-4 text-violet-500" />
          Mapas Mentales IA
        </Text>
        <div className="grid grid-cols-2 gap-2">
          <MetricCard 
            icon={Brain} 
            label="Creados" 
            value={student.metrics.mapasMentales.creados} 
            color="violet"
          />
          <MetricCard 
            icon={Brain} 
            label="Calidad Prom." 
            value={`${student.metrics.mapasMentales.promedioCalidad}%`} 
            color="purple"
          />
        </div>
      </div>

      {/* Chat y Prompts IA */}
      <div>
        <Text weight="semibold" className="mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-500" />
          Chat IA
        </Text>
        <div className="grid grid-cols-3 gap-2">
          <MetricCard 
            icon={MessageSquare} 
            label="Mensajes" 
            value={student.metrics.chat.mensajes} 
            color="cyan"
          />
          <MetricCard 
            icon={MessageSquare} 
            label="Preguntas" 
            value={student.metrics.chat.preguntas} 
            color="blue"
          />
          <MetricCard 
            icon={MessageSquare} 
            label="Prompts IA" 
            value={student.metrics.chat.promptsIA} 
            color="indigo"
          />
        </div>
      </div>
    </div>
  </div>
);

const StudentListModal = ({ isOpen, onClose, courseTitle, studentCount = 0 }) => {
  const students = mockStudents;
  const [selectedStudent, setSelectedStudent] = useState(students[0] || null);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredStudents = students.filter(student =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[92vw] min-w-[980px] max-w-[1120px] h-[84vh] bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-primary to-slate-900 text-white">
          <div className="flex flex-col gap-3 items-start md:flex-row md:items-center md:justify-between">
            <div>
              <Text weight="bold" size="2xl" className="text-white tracking-tight">
                Alumnos del Curso
              </Text>
              <Text size="sm" className="text-white/75">
                {courseTitle} • {studentCount} alumnos
              </Text>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar alumno por nombre o correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-slate-900 placeholder-slate-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-row overflow-hidden bg-slate-50">
          {/* Lista de estudiantes */}
          <div className="w-2/5 border-r border-slate-200 overflow-y-auto bg-white">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center">
                <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <Text color="muted">No se encontraron alumnos</Text>
              </div>
            ) : (
              filteredStudents.map(student => (
                <StudentRow
                  key={student.id}
                  student={student}
                  onClick={setSelectedStudent}
                  isSelected={selectedStudent?.id === student.id}
                />
              ))
            )}
          </div>

          {/* Detalle del estudiante */}
          <div className="w-3/5 overflow-y-auto bg-slate-50 p-5">
            {selectedStudent ? (
              <StudentDetail student={selectedStudent} />
            ) : (
              <div className="h-full flex flex-col justify-center items-center p-8 text-center">
                <Text weight="semibold" size="lg" className="mb-2">Selecciona un alumno para ver su rendimiento</Text>
                <Text size="sm" color="muted">Haz click en cualquier alumno del listado para abrir sus métricas detalladas.</Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export { StudentListModal };