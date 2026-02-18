import React from 'react';
import { Card, Text } from '../atoms';

const CourseDescription = ({ title, description }) => {
  // Intentar parsear la descripción en líneas/puntos
  const lines = description
    ? description
        .split(/\n|(?:\.\s)/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
    : [];

  return (
    <Card hover={false} className="p-6">
      <Text as="h3" size="lg" weight="bold" className="mb-4">
        Bienvenido al Curso de {title}
      </Text>

      {lines.length > 1 ? (
        <ul className="space-y-3">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <Text size="sm" color="secondary" className="leading-relaxed">
                {line.endsWith('.') ? line : `${line}.`}
              </Text>
            </li>
          ))}
        </ul>
      ) : (
        <Text size="sm" color="secondary" className="leading-relaxed">
          {description || 'Sin descripción disponible para este curso.'}
        </Text>
      )}
    </Card>
  );
};

export { CourseDescription };
