import { create } from 'zustand';

import { AnalyticsEvent } from '@/shared';

type YaMetrikaStore = {
  id: number;
  initialized: boolean;
  sendEvent: (event: AnalyticsEvent, payload?: Record<string, any>) => void;
  viewPage: (url: string) => void;
}

const ymCounter = import.meta.env.VITE_YA_METRIKA_COUNTER;

export const useYaMetrika = create<YaMetrikaStore>()((_, get) => ({
  id: Number(ymCounter) ?? 0,
  initialized: !!window.ym,
  sendEvent: (event: AnalyticsEvent, payload?: Record<string, any>) => {
    if (!get().initialized) {
      console.log('no');
      console.log(window);
      return;
    }
    console.log('event!')

    // https://yandex.ru/support/metrica/objects/reachgoal.html
    window.ym(get().id, 'reachGoal', event, payload);
  },
  viewPage: (url: string) => {
    if (!get().initialized) {
      return;
    }

    // https://yandex.ru/support/metrica/objects/hit.html
    window.ym(get().id, 'hit', url);
  }
}))