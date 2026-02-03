/**
 * Service Worker registration utility
 * Registers SW for caching static resources and API responses
 */

export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Every hour

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, optionally notify user
                console.log('New content available, refresh for updates');
              }
            });
          }
        });
      } catch (error) {
        console.warn('SW registration failed:', error);
      }
    });
  }
}
