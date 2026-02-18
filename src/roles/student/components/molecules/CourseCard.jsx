import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { ProgressBar } from '../atoms/ProgressBar';
import { Icon } from '../atoms/Icon';
import { Button } from '../atoms/Button';

/** Imagen placeholder educativa cuando el curso no tiene imagen */
const DEFAULT_COURSE_IMG = null;

const CourseCard = ({ id, title, description, progress = 0, imageUrl }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnter = () => {
    const inStudent = location.pathname.startsWith('/student');
    const target = inStudent ? `course/${id}` : `/student/course/${id}`;
    navigate(target);
  };

  const hasImage = !!imageUrl;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      {/* Imagen o placeholder con icono */}
      <div className="w-full h-44 bg-gradient-to-br from-primary-light to-indigo-100 relative overflow-hidden">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-primary/40" strokeWidth={1.2} />
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Título y descripción */}
        <div className="min-h-[4.5rem]">
          <Text as="h3" size="lg" weight="semibold" className="leading-tight line-clamp-2">
            {title}
          </Text>
          {description && (
            <Text size="sm" color="muted" className="mt-1.5 line-clamp-2">
              {description}
            </Text>
          )}
        </div>

        {/* Barra de progreso — anclada al fondo */}
        <div className="mt-auto">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="w-14 text-right">
              <Text size="sm" weight="semibold" color="primary">{progress}%</Text>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Button variant="primary" className="w-full" onClick={handleEnter}>
              Entrar al curso
            </Button>
          </div>
          <div>
            <button className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
              <Icon name="chat" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { CourseCard };
export {};