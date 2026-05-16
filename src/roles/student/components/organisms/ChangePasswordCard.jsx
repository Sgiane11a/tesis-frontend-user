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
  const [saving, setSaving] = useState(false);

  const validate = () => {
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return false;
    }

    if (newPassword.length < 8) {
      setError('La nueva contrasena debe tener al menos 8 caracteres.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contrasenas no coinciden.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSaving(true);
      await onChangePassword?.({ currentPassword, newPassword });
      setSuccess('Contrasena actualizada correctamente.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (e) {
      setError(e.message || 'No se pudo actualizar la contrasena.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6">
      <div>
        <Text as="h2" size="lg" weight="bold">Cambia tu contrasena</Text>
        <Text size="sm" color="muted" className="mt-1">Protege tu cuenta con una contrasena segura</Text>
      </div>

      <div className="mt-6 space-y-4 rounded-xl border border-gray-100 bg-white p-4">
        {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
        {success && <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}

        <div>
          <Text size="xs" color="muted" className="uppercase">Contrasena actual</Text>
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-2" />
          <Text size="xs" color="muted" className="mt-1">Introduce tu contrasena actual para confirmar.</Text>
        </div>

        <div>
          <Text size="xs" color="muted" className="uppercase">Nueva contrasena</Text>
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-2" />
          <Text size="xs" color="muted" className="mt-1">Minimo 8 caracteres. Usa numeros y letras para mayor seguridad.</Text>
        </div>

        <div>
          <Text size="xs" color="muted" className="uppercase">Confirmar nueva contrasena</Text>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2" />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" onClick={handleSubmit} disabled={saving}>
            {saving ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { ChangePasswordCard };
