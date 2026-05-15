import React from 'react';
import { moduleBimesterOptions } from '../../../mocks';
import ModalShell from './ModalShell';

const ModuleFormModal = ({ bimestre, form, onClose, onSubmit, onUpdate }) => {
  const closeForm = () => onClose(bimestre);

  return (
    <ModalShell
      title="Cuestionario: Crear modulo"
      subtitle="Define el nombre, la descripcion y si el modulo quedara visible para tus estudiantes."
      onClose={closeForm}
      footer={(
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={closeForm} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100">
            Cancelar
          </button>
          <button type="submit" form="create-module-form" disabled={form.saving} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60">
            {form.saving ? 'Guardando...' : 'Guardar modulo'}
          </button>
        </div>
      )}
    >
      <form id="create-module-form" onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bimestre</label>
          <select
            value={form.id_bimestre}
            onChange={(event) => onUpdate({ id_bimestre: Number(event.target.value) })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
          >
            {moduleBimesterOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titulo del modulo</label>
          <input
            type="text"
            value={form.titulo}
            onChange={(event) => onUpdate({ titulo: event.target.value })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
            placeholder="Semana01-Este es el primer modulo"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripcion</label>
          <textarea
            value={form.descripcion}
            onChange={(event) => onUpdate({ descripcion: event.target.value })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm min-h-24 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
            placeholder="Descripcion opcional"
          />
        </div>
        <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(event) => onUpdate({ visible: event.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-200"
          />
          <span className="font-medium">Publicar modulo al guardar</span>
        </label>
      </form>
    </ModalShell>
  );
};

export default ModuleFormModal;
