import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, BarChart3, ArrowRight, GraduationCap } from 'lucide-react';
import { Card, Text, ProgressBar, Badge } from '../atoms';

const gradoLabels = {
  1: '1er Año',
  2: '2do Año',
  3: '3er Año',
  4: '4to Año',
  5: '5to Año',
};

const CourseCard = ({ id, title, description, imageUrl, grado, seccion, studentCount = 0, averageScore = 0, progress = 0 }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate(`/teacher/dashboard/course/${id}`);
  };

  const gradoLabel = grado ? (gradoLabels[grado] || `${grado}° Año`) : null;

  return (
    <div className="transition-transform duration-300 hover:-translate-y-1">
      <Card className="h-full group cursor-pointer" onClick={handleEnter}>
        {/* Imagen del curso */}
        <div className="relative h-40 bg-gradient-to-br from-primary-light via-indigo-50 to-blue-50 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-14 h-14 text-primary/25" strokeWidth={1.2} />
            </div>
          )}
          {/* Badge grado + sección sobre la imagen */}
          {gradoLabel && seccion && (
            <div className="absolute top-3 left-3">
              <Badge color="primary" size="sm" className="bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
                <GraduationCap className="w-3.5 h-3.5" />
                {gradoLabel} - {seccion}
              </Badge>
            </div>
          )}
          {/* Overlay con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Título */}
          <div className="min-h-[2.5rem]">
            <Text as="h3" size="lg" weight="semibold" className="leading-snug line-clamp-2">
              {title}
            </Text>
            {description && (
              <Text size="xs" color="muted" className="mt-1 line-clamp-1">
                {description}
              </Text>
            )}
          </div>

          {/* Estadísticas */}
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-primary" />
              <Text size="sm" weight="semibold" color="secondary">{averageScore}</Text>
            </div>
            <div className="flex-1">
              <ProgressBar progress={progress} size="sm" />
            </div>
            <Text size="xs" weight="semibold" color="muted">{progress}%</Text>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <Text size="xs" color="secondary" weight="medium">{studentCount} alumnos</Text>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnter();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark transition-colors group/btn"
            >
              Entrar
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export { CourseCard };
