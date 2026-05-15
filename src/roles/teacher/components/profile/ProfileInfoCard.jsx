import React from 'react';

const ProfileInfoCard = ({ title, description, items }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
    <div className="mb-3">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>

    <div className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
          <div className="text-xs font-medium text-gray-500">{item.label}</div>
          <div className="mt-1 truncate text-sm font-semibold text-gray-800">{item.value}</div>
        </div>
      ))}
    </div>
  </section>
);

export default ProfileInfoCard;
