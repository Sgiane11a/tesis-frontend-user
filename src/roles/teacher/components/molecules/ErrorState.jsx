import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Text, Button } from '../atoms';

const ErrorState = ({ message = 'Ocurrió un error al cargar los datos.', onRetry }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center mb-6">
      <AlertCircle className="w-10 h-10 text-red-400" strokeWidth={1.5} />
    </div>
    <Text as="h3" size="lg" weight="semibold" className="mb-2">
      Error de carga
    </Text>
    <Text size="sm" color="muted" className="max-w-sm mb-6">
      {message}
    </Text>
    {onRetry && (
      <Button variant="primary" onClick={onRetry}>
        <RefreshCw className="w-4 h-4" />
        Reintentar
      </Button>
    )}
  </div>
);

export { ErrorState };
