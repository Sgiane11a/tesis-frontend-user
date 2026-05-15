import React from 'react';

const StudentMetricCard = ({ icon: Icon, label, value, className = '', iconClassName = '' }) => (
  <div className={`rounded-lg border px-5 py-4 ${className}`}>
    <div className={`flex items-center gap-3 ${iconClassName}`}>
      <Icon className="w-5 h-5" />
      <span className="text-xs">{label}</span>
    </div>
    <div className="mt-2 text-2xl font-bold">{value}</div>
  </div>
);

export default StudentMetricCard;
