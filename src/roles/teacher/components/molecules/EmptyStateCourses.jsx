import React from 'react';
import { BookOpen } from 'lucide-react';
import { Text } from '../atoms';

const EmptyStateCourses = ({ message = 'No tienes cursos asignados aún.' }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
      <BookOpen className="w-10 h-10 text-primary/40" strokeWidth={1.5} />
    </div>
    <Text as="h3" size="lg" weight="semibold" className="mb-2">
      Sin cursos disponibles
    </Text>
    <Text size="sm" color="muted" className="max-w-sm">
      {message}
    </Text>
  </div>
);

export { EmptyStateCourses };
