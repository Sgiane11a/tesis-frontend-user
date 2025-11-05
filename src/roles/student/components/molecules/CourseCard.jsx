import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { ProgressBar } from '../atoms/ProgressBar';
import { Icon } from '../atoms/Icon';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';

const CourseCard = ({ id, title, progress, imageUrl, teacher, year }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEnter = () => {
    // Navegar a la página del curso
    // Si estamos ya dentro de /student usamos ruta relativa para respetar el routing anidado
    const inStudent = location.pathname.startsWith('/student');
    const target = inStudent ? `course/${id}` : `/student/course/${id}`;
    // debug: navegación interna — deshabilitado en producción
    if (process.env.NODE_ENV !== 'production') {
      console.log('[CourseCard] navigating to', target, 'from', location.pathname);
    }
    navigate(target);
  };
  return (
    <Card className="overflow-hidden">
      <div className="w-full h-44 bg-gray-100">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <Text as="h3" size="lg" weight="semibold" className="leading-tight">{title}</Text>
          <div className="flex items-center gap-3 mt-3">
            <Avatar name={teacher} size={'8'} />
            <div>
              <Text size="sm" weight="medium">{teacher}</Text>
              <Text size="sm" color="muted">{year}</Text>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <ProgressBar progress={progress} />
            </div>
            <div className="w-14 text-right">
              <Text size="sm" weight="semibold">{progress}%</Text>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center gap-3">
            <div className="flex-1">
            <Button variant="primary" className="w-full" onClick={handleEnter}>Entrar</Button>
          </div>
          <div>
            <button className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
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