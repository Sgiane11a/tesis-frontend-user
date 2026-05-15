import React from 'react';
import { Text } from '../../atoms';

const StudentMetricMiniCard = ({ icon: Icon, label, value, subValue, color = 'primary' }) => (
  <div className="bg-gray-50 rounded-lg p-3 flex flex-col items-center text-center hover:bg-gray-100 transition-colors">
    <Icon className={`w-5 h-5 text-${color} mb-1`} />
    <Text size="xs" weight="semibold" className="text-gray-700">{label}</Text>
    <Text size="lg" weight="bold" className="text-gray-900">{value}</Text>
    {subValue && <Text size="xs" color="muted">{subValue}</Text>}
  </div>
);

export default StudentMetricMiniCard;
