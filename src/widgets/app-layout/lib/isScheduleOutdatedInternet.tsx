import { getTodayDate } from '@/shared';
import { DateTime } from 'luxon';

export const isScheduleOutdatedInternet = () => {
    const parsedAt = localStorage.getItem('cacheUpdateDate') 
  const today = getTodayDate();
  if(parsedAt){
    const scheduleParsedDate =
        DateTime.fromISO(parsedAt).setZone('Europe/Moscow');
    const todayDate = DateTime.fromISO(today).setZone('Europe/Moscow');
    return todayDate.diff(scheduleParsedDate, 'days').days > 3;
  }
  return true;
};
