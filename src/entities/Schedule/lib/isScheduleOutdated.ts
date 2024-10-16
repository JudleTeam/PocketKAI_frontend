import { getTodayDate } from '@/shared';
import { DateTime } from 'luxon';

export const isScheduleOutdated = (parsedAt: string) => {
  const today = getTodayDate();
  const scheduleParsedDate =
    DateTime.fromISO(parsedAt).setZone('Europe/Moscow');
  const todayDate = DateTime.fromISO(today).setZone('Europe/Moscow');
  return todayDate.diff(scheduleParsedDate, 'days').days > 3;
};
