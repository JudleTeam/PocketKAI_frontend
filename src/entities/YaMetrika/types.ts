import { AnalyticsEvent } from '@/shared';

export {};

declare global {
  function ym(
    counter: number,
    type: 'hit',
    url: string,
  ): void;
  function ym(
    counter: number,
    type: 'reachGoal',
    event: AnalyticsEvent,
    params?: object,
  ): void;

  interface Window {
    YA_METRIKA_COUNTER: any;
  }

}