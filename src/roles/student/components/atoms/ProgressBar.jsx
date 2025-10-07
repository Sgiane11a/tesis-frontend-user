import React from 'react';

const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full bg-primary-light rounded-full h-2.5">
      <div
        className="bg-primary h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export { ProgressBar };
export {};