import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export function NotificationSystem({ notifications, onRemove }: NotificationSystemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-[var(--caja-green)]" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-[var(--caja-yellow)]" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-[var(--caja-green-light)] border-[var(--caja-green)]';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-[var(--caja-yellow-light)] border-[var(--caja-yellow)]';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          index={index}
          onRemove={onRemove}
          getIcon={getIcon}
          getBgColor={getBgColor}
        />
      ))}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  index: number;
  onRemove: (id: string) => void;
  getIcon: (type: string) => JSX.Element;
  getBgColor: (type: string) => string;
}

function NotificationItem({ 
  notification, 
  index, 
  onRemove, 
  getIcon, 
  getBgColor 
}: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    
    // Auto remove
    if (notification.duration !== 0) {
      const removeTimer = setTimeout(() => {
        handleRemove();
      }, notification.duration || 5000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(removeTimer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [notification.duration, index]);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  return (
    <div
      className={`
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${isRemoving ? 'translate-x-full opacity-0 scale-95' : ''}
      `}
    >
      <div className={`
        min-w-80 max-w-md p-4 rounded-lg border shadow-lg backdrop-blur-sm 
        ${getBgColor(notification.type)}
        hover:shadow-xl transition-shadow duration-200
      `}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 pt-0.5">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-[var(--foreground)]">
              {notification.title}
            </h4>
            {notification.message && (
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                {notification.message}
              </p>
            )}
          </div>
          <button
            onClick={handleRemove}
            className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 text-[var(--muted-foreground)]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para usar o sistema de notificações
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notification, id }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const showSuccess = (title: string, message?: string) => {
    addNotification({ type: 'success', title, message });
  };

  const showError = (title: string, message?: string) => {
    addNotification({ type: 'error', title, message });
  };

  const showInfo = (title: string, message?: string) => {
    addNotification({ type: 'info', title, message });
  };

  const showWarning = (title: string, message?: string) => {
    addNotification({ type: 'warning', title, message });
  };

  return {
    notifications,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    NotificationSystem: () => (
      <NotificationSystem 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    )
  };
}