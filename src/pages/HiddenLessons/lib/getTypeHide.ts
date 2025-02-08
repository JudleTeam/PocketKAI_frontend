import { DateTime } from 'luxon';

export const getTypeHide = (type: string) => {
  if (type === 'always') return 'Каждая неделя';
  if (type === 'odd') return 'Нечётная неделя';
  if (type === 'even') return 'Чётная неделя';
  return `${DateTime.fromISO(type).setLocale('ru').toFormat('d MMMM')}`;
};
