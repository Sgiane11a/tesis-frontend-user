import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bell, KeyRound, Menu, Settings, UserPen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../molecules/UserProfile';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useAuth } from '../../../../hooks/useAuth';
import { NotificationsService, ProfileService } from '../../../../api';

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
          <Button type="submit" variant="primary" disabled={saving}>
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
  const displayName = user ? `${user.nombre ?? ''} ${user.apellido ?? ''}`.trim() || 'Alumno' : 'Alumno';
  const displayRole = user?.rol === 'alumno' ? 'Alumno(a)' : user?.rol || 'Usuario';
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [lastSeenKey, setLastSeenKey] = useState(null);
  const [dismissedIds, setDismissedIds] = useState([]);
  const notificationsRef = useRef(null);
  const settingsRef = useRef(null);
  const dismissedStorageKey = useMemo(
    () => (user?.id ? `student_notifications_dismissed_${user.id}` : null),
    [user?.id]
  );

  useEffect(() => {
    if (!dismissedStorageKey) {
      setDismissedIds([]);
      return;
    }

    try {
      const saved = localStorage.getItem(dismissedStorageKey);
      const parsed = saved ? JSON.parse(saved) : [];
      setDismissedIds(Array.isArray(parsed) ? parsed : []);
    } catch {
      setDismissedIds([]);
    }
  }, [dismissedStorageKey]);

  const loadNotifications = useCallback(async () => {
    if (!user?.id || user?.rol !== 'alumno') return;
    setLoadingNotifications(true);
    try {
      const response = await NotificationsService.getByStudent(user.id, 20);
      const items = Array.isArray(response.items) ? response.items : [];
      setNotifications(items);
      if (!lastSeenKey && items[0]?.id) {
        setLastSeenKey(items[0].id);
      }
    } catch {
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  }, [user?.id, user?.rol, lastSeenKey]);

  useEffect(() => {
    if (!user?.id || user?.rol !== 'alumno') return;

    let mounted = true;
    const safeLoad = async () => {
      if (!mounted) return;
      await loadNotifications();
    };

    safeLoad();
    const intervalId = setInterval(safeLoad, 10000);
    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, [user?.id, user?.rol, loadNotifications]);

  const visibleNotifications = useMemo(
    () => notifications.filter((n) => !dismissedIds.includes(n.id)),
    [notifications, dismissedIds]
  );

  useEffect(() => {
    const closeOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setOpenNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setOpenSettings(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  const unreadCount = useMemo(() => {
    if (!lastSeenKey) return visibleNotifications.length;
    const idx = visibleNotifications.findIndex((n) => n.id === lastSeenKey);
    if (idx === -1) return visibleNotifications.length;
    return idx;
  }, [visibleNotifications, lastSeenKey]);

  const markAllAsRead = () => {
    if (visibleNotifications[0]?.id) {
      setLastSeenKey(visibleNotifications[0].id);
    }
  };

  const dismissNotification = (notificationId) => {
    const next = Array.from(new Set([...dismissedIds, notificationId])).slice(-300);
    setDismissedIds(next);

    if (dismissedStorageKey) {
      try {
        localStorage.setItem(dismissedStorageKey, JSON.stringify(next));
      } catch {
        // Ignore localStorage failures silently.
      }
    }
  };

  const toggleNotifications = () => {
    const next = !openNotifications;
    setOpenNotifications(next);
    setOpenSettings(false);
    if (next && visibleNotifications[0]?.id) {
      setLastSeenKey(visibleNotifications[0].id);
      loadNotifications();
    }
  };

  const goToEditProfile = () => {
    setOpenSettings(false);
    navigate('/student/profile?edit=1');
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

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative" ref={notificationsRef}>
            <button
              type="button"
              onClick={toggleNotifications}
              className="relative rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] font-semibold leading-4 text-white">
                  {unreadCount > 9 ? '+9' : `+${unreadCount}`}
                </span>
              )}
            </button>

            {openNotifications && (
              <div className="absolute right-0 z-50 mt-2 max-h-[28rem] w-80 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
                <div className="border-b border-gray-100 bg-slate-50 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-800">Notificaciones</h3>
                    {unreadCount > 0 && (
                      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-100 px-2 text-xs font-semibold text-rose-700">
                        +{unreadCount > 9 ? '9' : unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[11px] text-gray-500">Actualizacion automatica cada 10 segundos</p>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllAsRead}
                        className="text-[11px] font-semibold text-gray-600 transition-colors hover:text-gray-900"
                      >
                        Marcar todo como leido
                      </button>
                    )}
                  </div>
                </div>

                {loadingNotifications ? (
                  <div className="px-4 py-6 text-sm text-gray-500">Cargando...</div>
                ) : visibleNotifications.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-500">No hay notificaciones por ahora.</div>
                ) : (
                  <ul className="max-h-[22rem] divide-y divide-gray-100 overflow-auto">
                    {visibleNotifications.map((n, index) => {
                      const isUnread = index < unreadCount;
                      return (
                        <li
                          key={n.id}
                          className={`border-l-4 px-4 py-3 transition-colors ${
                            isUnread
                              ? 'border-rose-400 bg-rose-50/80 hover:bg-rose-100/80'
                              : 'border-transparent bg-white hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${isUnread ? 'bg-rose-500' : 'bg-gray-300'}`} />
                            <div className="min-w-0 flex-1">
                              <p className={`text-sm font-medium ${isUnread ? 'text-rose-900' : 'text-gray-700'}`}>
                                {n.mensaje}
                              </p>
                              <p className={`mt-0.5 text-xs ${isUnread ? 'text-rose-700' : 'text-gray-500'}`}>
                                {n.cursoNombre}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => dismissNotification(n.id)}
                              className="mt-0.5 rounded-md p-1 text-gray-400 transition-colors hover:bg-white/80 hover:text-gray-700"
                              aria-label="Eliminar notificacion"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="relative" ref={settingsRef}>
            <button
              type="button"
              onClick={() => {
                setOpenSettings((current) => !current);
                setOpenNotifications(false);
              }}
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
