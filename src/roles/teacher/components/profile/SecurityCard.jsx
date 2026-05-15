import React, { useState } from 'react';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';

const SecurityCard = ({ items }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    next: '',
    confirm: '',
  });

  const handleChange = (field, value) => {
    setPasswords((current) => ({ ...current, [field]: value }));
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Seguridad de la cuenta</h2>
          <p className="mt-1 text-sm text-gray-500">Administra tu acceso y revisa senales importantes.</p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2">
            <div>
              <div className="text-sm font-semibold text-gray-800">{item.label}</div>
              <div className="text-xs text-gray-500">{item.value}</div>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              {item.status}
            </span>
          </div>
        ))}
      </div>

      <form className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <KeyRound className="h-4 w-4 text-gray-500" />
          Cambiar contrasena
        </div>
        {[
          ['current', 'Contrasena actual'],
          ['next', 'Nueva contrasena'],
          ['confirm', 'Confirmar contrasena'],
        ].map(([field, label]) => (
          <label key={field} className="block">
            <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={passwords[field]}
                onChange={(event) => handleChange(field, event.target.value)}
                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-800 outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                placeholder="********"
              />
            </div>
          </label>
        ))}

        <button
          type="button"
          className="mt-1 inline-flex h-9 w-full items-center justify-center rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Actualizar contrasena
        </button>
      </form>
    </section>
  );
};

export default SecurityCard;
