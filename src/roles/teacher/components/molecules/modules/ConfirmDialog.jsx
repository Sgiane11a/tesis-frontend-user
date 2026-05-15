import React from 'react';
import ModalShell from './ModalShell';

const ConfirmDialog = ({ dialog, onCancel, onConfirm }) => (
  <ModalShell
    title={dialog.title}
    subtitle="Esta accion afectara la informacion publicada en el modulo."
    onClose={onCancel}
    tone="error"
    footer={(
      <div className="flex items-center justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100" disabled={dialog.saving}>
          Cancelar
        </button>
        <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-red-700 disabled:opacity-60" disabled={dialog.saving}>
          {dialog.saving ? 'Procesando...' : 'Confirmar'}
        </button>
      </div>
    )}
  >
    <p className="text-sm text-gray-600">{dialog.description}</p>
  </ModalShell>
);

export default ConfirmDialog;
