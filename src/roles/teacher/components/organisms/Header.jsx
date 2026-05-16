import React, { useEffect, useRef, useState } from 'react';
import { Bell, KeyRound, Menu, Settings, UserPen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../molecules';
import { Button, Input } from '../atoms';
import { useAuth } from '../../../../hooks/useAuth';
import { ProfileService } from '../../../../api';

const PasswordModal = ({ open, onClose, onSaved }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (newPassword.length < 8) {
      setError('La nueva contrasena debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contrasenas no coinciden.');
      return;
    }

    try {
      setSaving(true);
      await onSaved?.({ currentPassword, newPassword });
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
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Cambiar contrasena</h2>
            <p className="mt-1 text-sm text-slate-500">Actualiza tu clave de acceso de forma segura.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</div>}
          {success && <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{success}</div>}

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Contrasena actual</span>
            <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="mt-1.5" />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Nueva contrasena</span>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1.5" />
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Confirmar nueva contrasena</span>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1.5" />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

const Header = ({ isSidebarPinned = false, onToggleSidebar }) => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const displayName = user ? `${user.nombre}` : 'Profesor';
  const displayRole = user?.rol === 'profesor' ? 'Profesor' : user?.rol || 'Usuario';
  const [openSettings, setOpenSettings] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const closeOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setOpenSettings(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  const goToEditProfile = () => {
    setOpenSettings(false);
    navigate('/teacher/perfil?edit=1');
  };

  const openPassword = () => {
    setOpenSettings(false);
    setOpenPasswordModal(true);
  };

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    const updated = await ProfileService.changeOwnPassword({ currentPassword, newPassword });
    if (updated) updateUser(updated);
  };

  return (
    <>
      <header className={`fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8 ${isSidebarPinned ? 'lg:left-[17rem]' : 'lg:left-20'}`}>
        <button
          onClick={onToggleSidebar}
          className="rounded-xl p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden lg:block" />

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="relative rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-400" />
          </button>

          <div className="relative" ref={settingsRef}>
            <button
              type="button"
              onClick={() => setOpenSettings((current) => !current)}
              className="rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Ajustes"
            >
              <Settings className="h-5 w-5" />
            </button>

            {openSettings && (
              <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-2xl">
                <button
                  type="button"
                  onClick={goToEditProfile}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <UserPen className="h-4 w-4 text-slate-500" />
                  Editar perfil
                </button>
                <button
                  type="button"
                  onClick={openPassword}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <KeyRound className="h-4 w-4 text-slate-500" />
                  Cambiar contrasena
                </button>
              </div>
            )}
          </div>

          <div className="hidden h-8 w-px bg-gray-200 sm:block" />
          <UserProfile name={displayName} role={displayRole} avatarUrl={user?.avatarUrl} />
        </div>
      </header>

      <PasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onSaved={handleChangePassword}
      />
    </>
  );
};

export { Header };
