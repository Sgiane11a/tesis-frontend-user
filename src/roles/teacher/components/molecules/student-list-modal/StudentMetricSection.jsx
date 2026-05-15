import React from 'react';
import { Text } from '../../atoms';
import StudentMetricMiniCard from './StudentMetricMiniCard';

const StudentMetricSection = ({ icon: Icon, title, iconClassName, metrics, columns = 2 }) => (
  <section>
    <Text weight="semibold" className="mb-2 flex items-center gap-2">
      <Icon className={`w-4 h-4 ${iconClassName}`} />
      {title}
    </Text>
    <div className={`grid gap-2 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {metrics.map((metric) => (
        <StudentMetricMiniCard key={`${title}-${metric.label}`} icon={Icon} {...metric} />
      ))}
    </div>
  </section>
);

export default StudentMetricSection;
