import './PWABadge.css';

import { useRegisterSW } from 'virtual:pwa-register/react';

function PWABadge() {
  // check for updates every hour
  const period = 60 * 60 * 1000;
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target as ServiceWorker;
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }
  // (offlineReady || needRefresh)
  return (
    <div className="PWABadge" role="alert" aria-labelledby="toast-message">
      {needRefresh && (
        <div className="PWABadge-toast border-1 space-y-3 bg-l-account-actions w-9/12 h-fit dark:bg-d-account-actions">
          <div className="PWABadge-message">
            <span id="toast-message" className="text-[16px]">
              Доступно обновление!
            </span>
          </div>
          <div className="PWABadge-buttons">
            {needRefresh && (
              <button
                className="PWABadge-toast-button rounded px-4 py-1.5 text-white bg-l-blue-element dark:bg-d-blue-element"
                onClick={() => updateServiceWorker(true)}
              >
                Обновить
              </button>
            )}
            <button
              className="PWABadge-toast-button rounded px-4 py-1.5  bg-transparent dark:bg-transparent dark:text-white"
              onClick={() => close()}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 */
function registerPeriodicSync(
  period: number,
  swUrl: string,
  r: ServiceWorkerRegistration
) {
  if (period <= 0) return;

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
