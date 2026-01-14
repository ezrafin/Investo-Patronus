import { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * OfflineIndicator component
 * Shows a banner when the user goes offline and provides cached content when available
 */
export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const queryClient = useQueryClient();
  const { t } = useTranslation({ namespace: 'ui' });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        // Refetch queries when coming back online
        queryClient.refetchQueries();
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [queryClient, wasOffline]);

  if (isOnline) {
    return null;
  }

  return (
    <Alert variant="default" className="border-yellow-500/50 bg-yellow-500/10 mb-4">
      <WifiOff className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-600 dark:text-yellow-400">
        {t('offline.title', 'You are offline')}
      </AlertTitle>
      <AlertDescription className="text-yellow-600/80 dark:text-yellow-400/80">
        {t('offline.message', 'Some features may be limited. Content will refresh when you reconnect.')}
      </AlertDescription>
    </Alert>
  );
}

