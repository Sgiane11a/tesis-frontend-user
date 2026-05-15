import React from 'react';
import ModalShell from './ModalShell';

const FeedbackDialog = ({ dialog, onClose }) => (
  <ModalShell
    title={dialog.title}
    onClose={onClose}
    tone={dialog.tone === 'error' ? 'error' : 'success'}
    subtitle={dialog.tone === 'error' ? 'Revisa el detalle y vuelve a intentarlo.' : 'La informacion ya fue actualizada en el modulo.'}
    footer={(
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          className={`px-4 py-2 rounded-xl text-sm font-semibold text-white ${dialog.tone === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-sky-600 hover:bg-sky-700'}`}
        >
          Entendido
        </button>
      </div>
    )}
  >
    <div className={`rounded-xl border px-4 py-4 text-sm leading-relaxed ${dialog.tone === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
      {dialog.description}
    </div>
  </ModalShell>
);

export default FeedbackDialog;
