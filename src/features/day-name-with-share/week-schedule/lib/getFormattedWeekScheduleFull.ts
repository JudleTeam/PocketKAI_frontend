import { FullWeekSchedule, Nullable } from '@/shared';
import { getFormattedDayScheduleFull } from './getFormattedDayScheduleFull';
import { WEEK_DAYS } from '@/shared/constants';

export const getFormattedWeekScheduleFull = (
  weekSchedule: Nullable<FullWeekSchedule>,
  weekParity: 'even' | 'odd'
) => {
  if (!weekSchedule) return '';
  const requiredWeekSchedule = weekSchedule[weekParity];
  const result = Object.entries(requiredWeekSchedule.week_days).map(
    ([dayName, dayLessons], index) => {
      if (index === 6) return '';
      const formattedDayName = WEEK_DAYS[dayName as keyof typeof WEEK_DAYS];
      const header = `${
        formattedDayName.charAt(0).toUpperCase() + formattedDayName.slice(1)
      }\n————————————————————\n`;
      const footer = `————————————————————\n`;
      if (!dayLessons.length) return header + 'Выходной\n' + footer;
      return (
        header +
        getFormattedDayScheduleFull(dayName, dayLessons, weekParity, '', true) +
        footer
      );
    }
  );
  return (
    `${weekParity === 'even' ? 'Чётная' : 'Нечётная'} неделя\n\n` +
    result.join('\n') +
    `Отправлено из Pocket KAI: ${window.location.origin}`
  );
};
