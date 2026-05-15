import React from 'react';
import ModalShell from './ModalShell';

const EditModuleModal = ({ form, onClose, onSubmit, onUpdate }) => (
  <ModalShell
    title="Editar modulo"
    subtitle="Modifica el titulo o la descripcion del modulo."
    onClose={onClose}
    footer={(
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" form="edit-module-form" disabled={form.saving} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60">
          {form.saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>
    )}
  >
    <form id="edit-module-form" onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo del modulo</label>
        <input
          type="text"
          value={form.titulo}
          onChange={(event) => onUpdate({ titulo: event.target.value })}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
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
    </form>
  </ModalShell>
);

export default EditModuleModal;
