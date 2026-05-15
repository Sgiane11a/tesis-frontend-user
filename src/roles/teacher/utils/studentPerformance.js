export const pageSize = 7;

export const statusStyles = {
  good: {
    label: 'Buen Rendimiento',
    className: 'bg-emerald-100 text-emerald-700',
  },
  follow: {
    label: 'Seguimiento',
    className: 'bg-orange-100 text-orange-700',
  },
  attention: {
    label: 'Requiere Atencion',
    className: 'bg-red-100 text-red-700',
  },
};

export const averageClassName = (average) => {
  if (average >= 14) return 'text-emerald-700';
  if (average >= 11) return 'text-orange-500';
  return 'text-red-500';
};
