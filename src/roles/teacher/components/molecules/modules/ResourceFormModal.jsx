import React from 'react';
import { acceptedResourceFileTypes, resourceSourceOptions } from '../../../mocks';
import ModalShell from './ModalShell';

const ResourceFormModal = ({ form, onClose, onSubmit, onUpdate }) => (
  <ModalShell
    title="Cuestionario: Agregar recurso"
    subtitle="Carga un archivo local o registra una URL para mostrar el material dentro del modulo."
    onClose={onClose}
    footer={(
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100">
          Cancelar
        </button>
        <button type="submit" form="create-resource-form" disabled={form.saving} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-sky-700 disabled:opacity-60">
          {form.saving ? 'Guardando...' : 'Guardar recurso'}
        </button>
      </div>
    )}
  >
    <form id="create-resource-form" onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titulo del recurso</label>
        <input
          type="text"
          value={form.titulo}
          onChange={(event) => onUpdate({ titulo: event.target.value })}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
          placeholder="Guia, PPT, video, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de carga</label>
        <div className="flex gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
          {resourceSourceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onUpdate(option.value === 'file' ? { sourceType: 'file', url: '' } : { sourceType: 'url', file: null })}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${form.sourceType === option.value ? 'bg-white border-gray-300 text-gray-800 shadow-sm' : 'border-transparent text-gray-600 hover:bg-white/70'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {form.sourceType === 'file' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Archivo</label>
          <input
            type="file"
            accept={acceptedResourceFileTypes}
            onChange={(event) => onUpdate({ file: event.target.files?.[0] || null })}
            className="w-full rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-800 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-gray-900"
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL del recurso</label>
          <input
            type="url"
            value={form.url}
            onChange={(event) => onUpdate({ url: event.target.value })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
            placeholder="https://..."
          />
        </div>
      )}

      <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.visible}
          onChange={(event) => onUpdate({ visible: event.target.checked })}
          className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-200"
        />
        <span className="font-medium">Publicar recurso al guardar</span>
      </label>
    </form>
  </ModalShell>
);

export default ResourceFormModal;
