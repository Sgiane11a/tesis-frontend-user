import React from 'react';
import { AlertCircle, CheckCircle2, FileText, X } from 'lucide-react';

const toneStyles = {
  default: {
    badge: 'bg-gray-100 text-gray-700 border-gray-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
  success: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
  error: {
    badge: 'bg-red-50 text-red-700 border-red-200',
    panel: 'bg-white',
    subtitle: 'text-gray-500',
  },
};

const modalIcons = {
  default: FileText,
  success: CheckCircle2,
  error: AlertCircle,
};

const ModalShell = ({
  title,
  onClose,
  children,
  footer,
  panelClassName = '',
  bodyClassName = '',
  tone = 'default',
  subtitle = 'Completa la accion dentro del sistema.',
}) => {
  const styles = toneStyles[tone] || toneStyles.default;
  const Icon = modalIcons[tone] || modalIcons.default;

  return (
    <div className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className={`w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden ${panelClassName}`}>
        <div className={`px-6 py-5 border-b border-gray-200 ${styles.panel}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 min-w-0">
              <div className={`shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center ${styles.badge}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h3>
                <p className={`text-sm mt-1 ${styles.subtitle}`}>{subtitle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className={`px-6 py-5 ${bodyClassName}`}>{children}</div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{footer}</div>
      </div>
    </div>
  );
};

export default ModalShell;
