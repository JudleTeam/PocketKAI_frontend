import { DateTime } from 'luxon';

export const getTodayDate = () => {
  return DateTime.now().toFormat('yyyy-LL-dd');
};
