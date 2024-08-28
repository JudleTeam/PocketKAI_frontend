import { DateTime } from 'luxon';

export function getFormattedDate(date: string) {
  const formattedDate = DateTime.fromISO(date)
    .setLocale('ru')
    .toFormat('cccc, d MMMM');
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}
