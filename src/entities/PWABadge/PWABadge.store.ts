import { create } from 'zustand';

type PWAState = {
  storeOfflineReady: boolean;
  storeNeedRefresh: boolean;
  updateServiceWorker: (reloadPage?: boolean) => void;
  setUpdateServiceWorker: (func: (reloadPage?: boolean) => void) => void;
  setStoreOfflineReady: (value: boolean) => void;
  setStoreNeedRefresh: (value: boolean) => void;
};

export const usePWAState = create<PWAState>()((set) => ({
  storeOfflineReady: false,
  storeNeedRefresh: false,
  updateServiceWorker: () => {},
  setUpdateServiceWorker: (func) => {
    set({ updateServiceWorker: func });
  },
  setStoreOfflineReady: (value) => set({ storeOfflineReady: value }),
  setStoreNeedRefresh: (value) => set({ storeNeedRefresh: value }),
}));
