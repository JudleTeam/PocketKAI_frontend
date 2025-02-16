import { DateTime } from 'luxon';

export const getCurrentDayOfWeek = () => {
  const currentDayOfWeek = DateTime.now()
    .setLocale('en')
    .setZone('Europe/Moscow')
    .weekdayLong?.toLowerCase();

  return currentDayOfWeek;
};
