import React from 'react';
import { Text, Avatar, Badge } from '../../atoms';

const StudentListRow = ({ student, onClick, isSelected }) => (
  <button
    type="button"
    onClick={() => onClick(student)}
    className={`w-full text-left p-4 border-b border-slate-200 cursor-pointer transition-colors ${isSelected ? 'bg-slate-100 border-l-4 border-primary' : 'hover:bg-slate-50'}`}
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
  </button>
);

export default StudentListRow;
