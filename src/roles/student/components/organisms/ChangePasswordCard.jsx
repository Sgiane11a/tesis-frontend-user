import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { Text } from '../atoms/Text';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

const ChangePasswordCard = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    setError('');
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return false;
    }
    if (newPassword.length < 8) {
      setError('La nueva contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      // Placeholder para llamada a la API
      // await api.post('/auth/change-password', { currentPassword, newPassword })
      setSuccess('Contraseña actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      if (onChangePassword) onChangePassword();
    } catch (e) {
      setError('No se pudo actualizar la contraseña.');
    }
  };

  return (
    <Card className="p-6">
      <div>
        <Text as="h2" size="lg" weight="bold">Cambia Tú Contraseña</Text>
        <Text size="sm" color="muted" className="mt-1">Protege tu cuenta con una contraseña segura</Text>
      </div>

      <div className="mt-6 space-y-4 bg-white border border-gray-50 rounded-md p-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}

        <div>
          <Text size="xs" color="muted" className="uppercase">Contraseña Actual</Text>
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-2" />
          <Text size="xs" color="muted" className="mt-1">Introduce tu contraseña actual para confirmar.</Text>
        </div>

        <div>
          <Text size="xs" color="muted" className="uppercase">Nueva Contraseña</Text>
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-2" />
          <Text size="xs" color="muted" className="mt-1">Mínimo 8 caracteres. Usa números y letras para mayor seguridad.</Text>
        </div>

        <div>
          <Text size="xs" color="muted" className="uppercase">Confirmar Nueva Contraseña</Text>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2" />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" onClick={handleSubmit}>Actualizar</Button>
        </div>
      </div>
    </Card>
  );
};

export { ChangePasswordCard };
export {};
