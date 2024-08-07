import { getTodayDate } from './getTodayDate';

export const scrollToToday = (isSmooth: boolean = true) => {
  document
    .getElementById(getTodayDate())
    ?.scrollIntoView({ behavior: isSmooth ? 'smooth' : 'auto' });
};
