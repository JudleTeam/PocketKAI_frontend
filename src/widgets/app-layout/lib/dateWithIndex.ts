import { Day } from '@/shared';
import { DateTime } from 'luxon';

export const dateWithIndex = (days: Day[], newDay: string) => {
  const day = days.find((day) => {
    return day.date === newDay;
  });
  if (!day) return { dateIndex: 0, isStartOfWeek: false };

  const dateIndex = days.findIndex((day) => {
    return day.date === newDay;
  });
  const isStartOfWeek =
    DateTime.fromISO(day.date).setLocale('ru').weekday === 1;
  return { dateIndex, isStartOfWeek };
};
