import { useEffect, useState } from 'react';
import { usePWAState } from '../PWABadge.store';
import './PWABadge.css';

import { useRegisterSW } from 'virtual:pwa-register/react';
import { useBreakpointValue } from '@chakra-ui/react';

function PWABadge() {
  const { setStoreNeedRefresh, setUpdateServiceWorker } = usePWAState();
  // check for updates every hour

  const period = 60 * 60 * 1000;
  const {
    offlineReady: [, setOfflineReady],
    needRefresh: [needRefresh],
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
  const [isOpen, setIsOpen] = useState(needRefresh);

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const handleUpdate = () => {
    const isUpdated = localStorage.getItem('isUpdated')
    if (!isUpdated) {
      localStorage.clear();
    }
    updateServiceWorker(true)
    localStorage.setItem('isUpdated', 'true')

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }

  useEffect(() => {
    setIsOpen(needRefresh);
  }, [needRefresh]);

  useEffect(() => {
    setUpdateServiceWorker(updateServiceWorker);
  }, [setUpdateServiceWorker]);

  useEffect(() => {
    setStoreNeedRefresh(needRefresh);
  }, [setStoreNeedRefresh, needRefresh]);

  function close() {
    setOfflineReady(false);
    setIsOpen(false);
  }
  return (
    <div className="PWABadge" role="alert" aria-labelledby="toast-message">
      {isOpen && (
        <div className={`PWABadge-toast w-${isDesktop ? '[40%]' : '[70%]'} border-1 space-y-3 bg-l-main w-9/12 h-fit dark:bg-d-main`}>
          <div className="PWABadge-message">
            <span id="toast-message" className="text-[16px]">
              Доступно обновление!
            </span>
          </div>
          <div className="PWABadge-buttons">
            {needRefresh && (
              <button
                className="PWABadge-toast-button rounded-3xl px-4 py-1.5 text-white dark:text-l-main-text font-medium bg-l-main-element"
                onClick={() => handleUpdate()}
              >
                Обновить
              </button>
            )}
            <button
              className="PWABadge-toast-button rounded-3xl px-4 py-1.5  bg-transparent dark:bg-transparent dark:text-white"
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
