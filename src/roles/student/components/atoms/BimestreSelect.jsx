import React from 'react';

const BimestreSelect = ({ value, onChange, className }) => {
  return (
    <select value={value} onChange={onChange} className={className || 'bg-white border rounded-lg px-3 py-1 text-sm'}>
      <option>Bimestre - I</option>
      <option>Bimestre - II</option>
      <option>Bimestre - III</option>
      <option>Bimestre - IV</option>
    </select>
  );
};

export default BimestreSelect;
