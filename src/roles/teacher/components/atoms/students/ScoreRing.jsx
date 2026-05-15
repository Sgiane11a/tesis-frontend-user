import React from 'react';

const ScoreRing = ({ score }) => {
  const normalized = Math.max(0, Math.min(100, score));
  const background = `conic-gradient(#8bd94f ${normalized * 3.6}deg, #dcf7cc 0deg)`;

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">Puntuacion</h3>
      <div className="relative h-44 w-44 rounded-full" style={{ background }}>
        <div className="absolute inset-8 rounded-full bg-white flex items-center justify-center">
          <span className="text-4xl font-bold text-lime-500">{normalized}%</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreRing;
