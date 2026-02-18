import React from 'react';

const Skeleton = ({ className = '', rounded = 'rounded-xl' }) => (
  <div
    className={`animate-pulse bg-gray-200/70 ${rounded} ${className}`}
    aria-hidden="true"
  />
);

export { Skeleton };
