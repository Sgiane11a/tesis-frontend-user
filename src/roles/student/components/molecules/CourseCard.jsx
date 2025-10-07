import React from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { ProgressBar } from '../atoms/ProgressBar';
import { Icon } from '../atoms/Icon';

const CourseCard = ({ title, progress, imageUrl, teacher, year }) => {
  return (
    <Card>
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col gap-4">
        <div>
          <Text weight="semibold">{title}</Text>
          <Text size="sm" color="muted" className="mt-1">
            {teacher}
          </Text>
          <Text size="sm" color="muted">
            {year}
          </Text>
        </div>

        {/* --- BLOQUE MODIFICADO --- */}
        {/* Ahora la barra de progreso y el texto están en un contenedor de bloque normal, no flex. */}
        <div>
          <ProgressBar progress={progress} />
          {/* El texto del porcentaje ahora está debajo y alineado a la derecha */}
          <Text size="sm" color="muted" className="text-right mt-1">
            {progress}%
          </Text>
        </div>
        {/* --- FIN DEL BLOQUE MODIFICADO --- */}

        <div className="flex justify-between text-gray-500 pt-2">
            <Icon name="book" className="cursor-pointer hover:text-primary" />
            <Icon name="video" className="cursor-pointer hover:text-primary" />
            <Icon name="test" className="cursor-pointer hover:text-primary" />
            <Icon name="chat" className="cursor-pointer hover:text-primary" />
        </div>
      </div>
    </Card>
  );
};

export { CourseCard };
export {};