import React from 'react';

const TrendChart = ({ values }) => {
  const width = 560;
  const height = 220;
  const padding = 28;
  const max = 100;
  const stepX = (width - padding * 2) / (values.length - 1);
  const points = values.map((value, index) => {
    const x = padding + index * stepX;
    const y = height - padding - (value / max) * (height - padding * 2);
    return { x, y, value };
  });
  const polyline = points.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-base font-semibold text-gray-900">Tendencia general</h2>
        <p className="text-sm text-gray-500">Avance agregado por semanas.</p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
        {[0, 25, 50, 75, 100].map((line) => {
          const y = height - padding - (line / max) * (height - padding * 2);
          return (
            <g key={line}>
              <line x1={padding} x2={width - padding} y1={y} y2={y} stroke="#e5e7eb" strokeDasharray="4 4" />
              <text x={4} y={y + 4} className="fill-gray-400 text-[10px]">{line}</text>
            </g>
          );
        })}
        <polyline fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" points={polyline} />
        {points.map((point) => (
          <g key={`${point.x}-${point.y}`}>
            <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#0ea5e9" strokeWidth="3" />
            <text x={point.x - 8} y={point.y - 12} className="fill-gray-500 text-[10px]">{point.value}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TrendChart;
