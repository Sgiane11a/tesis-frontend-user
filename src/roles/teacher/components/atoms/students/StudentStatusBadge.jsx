import React from 'react';
import { statusStyles } from '../../../utils/studentPerformance';

const StudentStatusBadge = ({ status, label }) => {
  const styles = statusStyles[status] || statusStyles.follow;

  return (
    <span className={`inline-flex min-w-32 justify-center rounded px-3 py-1 text-xs font-semibold ${styles.className}`}>
      {label || styles.label}
    </span>
  );
};

export default StudentStatusBadge;
