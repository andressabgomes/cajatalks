import { useState, useEffect } from 'react';

interface UseConnectionStatusReturn {
  isOnline: boolean;
  connectionChanged: boolean;
}

export function useConnectionStatus(): UseConnectionStatusReturn {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [connectionChanged, setConnectionChanged] = useState(false);

  useEffect(() => {
    const handleConnectionChange = (online: boolean) => {
      setIsOnline(online);
      setConnectionChanged(true);
      
      // Reset the connection changed flag after a delay
      const timer = setTimeout(() => {
        setConnectionChanged(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    const handleOnline = () => handleConnectionChange(true);
    const handleOffline = () => handleConnectionChange(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, connectionChanged };
}