import { DateTime } from 'luxon';

export function isToday(date: string) {
  const day = DateTime.now().setZone('Europe/Moscow').toFormat('yyyy-LL-dd');
  return day === date;
}
