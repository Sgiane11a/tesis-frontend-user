import React from 'react';
import { Text } from '../atoms';

// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: IconComponent, label, value, color = 'primary', trend }) => {
  const colorMap = {
    primary: {
      bg: 'bg-primary-light',
      iconBg: 'bg-primary/10',
      icon: 'text-primary',
      value: 'text-primary-dark',
      border: 'border-primary/10',
    },
    success: {
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      icon: 'text-emerald-600',
      value: 'text-emerald-700',
      border: 'border-emerald-100',
    },
    danger: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      icon: 'text-red-500',
      value: 'text-red-600',
      border: 'border-red-100',
    },
    info: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600',
      value: 'text-blue-700',
      border: 'border-blue-100',
    },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div
      className={`${c.bg} border ${c.border} rounded-2xl p-4 flex items-center gap-4 animate-fadeIn`}
    >
      <div className={`${c.iconBg} p-2.5 rounded-xl`}>
        <IconComponent className={`w-5 h-5 ${c.icon}`} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <Text size="xs" color="muted" weight="medium" className="uppercase tracking-wider">
          {label}
        </Text>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-extrabold ${c.value} tabular-nums`}>
            {value}
          </span>
          {trend && (
            <span className="text-[11px] font-semibold text-emerald-500">
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export { StatCard };
