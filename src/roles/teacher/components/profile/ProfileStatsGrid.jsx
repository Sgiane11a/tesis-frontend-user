import React from 'react';

const ProfileStatsGrid = ({ stats }) => (
  <section className="grid gap-3 sm:grid-cols-3">
    {stats.map((stat) => (
      <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
        <div className="mt-1 text-sm font-semibold text-gray-700">{stat.label}</div>
        <div className="mt-1 text-xs text-gray-500">{stat.helper}</div>
      </article>
    ))}
  </section>
);

export default ProfileStatsGrid;
