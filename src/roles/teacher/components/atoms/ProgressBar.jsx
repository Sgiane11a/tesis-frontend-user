import React from 'react';

const ProgressBar = ({ progress = 0, size = 'md', showLabel = false }) => {
  const heights = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-gray-100 rounded-full ${heights[size] || heights.md} overflow-hidden`}>
        <div
          className={`${heights[size] || heights.md} rounded-full bg-gradient-to-r from-primary to-indigo-400 transition-all duration-500 ease-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-gray-500 min-w-[2.5rem] text-right">
          {clampedProgress}%
        </span>
      )}
    </div>
  );
};

export { ProgressBar };
