
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { UserProfile } from '../molecules/UserProfile';
import { useAuth } from '../../../../hooks/useAuth';
import { NotificationsService } from '../../../../api';

const Header = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const displayName = user ? `${user.nombre}` : 'Alumno';
  const displayRole = user?.rol === 'alumno' ? 'Alumno(a)' : user?.rol || 'Usuario';
  const [openNotifications, setOpenNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [lastSeenKey, setLastSeenKey] = useState(null);
  const [dismissedIds, setDismissedIds] = useState([]);
  const wrapperRef = useRef(null);
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
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenNotifications(false);
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
    if (next && visibleNotifications[0]?.id) {
      setLastSeenKey(visibleNotifications[0].id);
      loadNotifications();
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[250px] h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
      {/* Lado izquierdo - Menú hamburguesa en móvil */}
      <button
        onClick={onToggleSidebar}
        className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="hidden lg:block" />

      {/* Lado derecho */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notificaciones */}
        <div className="relative" ref={wrapperRef}>
          <button
            type="button"
            onClick={toggleNotifications}
            className="relative p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] leading-4 rounded-full text-center font-semibold">
                {unreadCount > 9 ? '+9' : `+${unreadCount}`}
              </span>
            )}
          </button>

          {openNotifications && (
            <div className="absolute right-0 mt-2 w-80 max-h-[28rem] overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-2xl z-50">
              <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-gray-800">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
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
                      className="text-[11px] font-semibold text-gray-600 hover:text-gray-900 transition-colors"
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
                <ul className="max-h-[22rem] overflow-auto divide-y divide-gray-100">
                  {visibleNotifications.map((n, index) => {
                    const isUnread = index < unreadCount;
                    return (
                    <li
                      key={n.id}
                      className={`px-4 py-3 transition-colors ${
                        isUnread
                          ? 'bg-rose-50/80 hover:bg-rose-100/80 border-l-4 border-rose-400'
                          : 'bg-white hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                            isUnread ? 'bg-rose-500' : 'bg-gray-300'
                          }`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium ${isUnread ? 'text-rose-900' : 'text-gray-700'}`}>
                            {n.mensaje}
                          </p>
                          <p className={`text-xs mt-0.5 ${isUnread ? 'text-rose-700' : 'text-gray-500'}`}>
                            {n.cursoNombre}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => dismissNotification(n.id)}
                          className="mt-0.5 p-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-white/80 transition-colors"
                          aria-label="Eliminar notificacion"
                        >
                          <X className="w-3.5 h-3.5" />
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

        {/* Separador */}
        <div className="w-px h-8 bg-gray-200 hidden sm:block" />

        {/* Perfil */}
        <UserProfile name={displayName} role={displayRole} />
      </div>
    </header>
  );
};

export { Header };
export {};