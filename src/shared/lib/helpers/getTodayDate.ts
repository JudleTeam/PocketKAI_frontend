import { DateTime } from 'luxon';

export const getTodayDate = () => {
  return DateTime.now().setZone('Europe/Moscow').toFormat('yyyy-LL-dd');
};
