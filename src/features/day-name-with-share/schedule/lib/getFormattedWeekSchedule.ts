import { Day, Schedule } from '@/shared';
import { DateTime } from 'luxon';
import { getFormattedDaySchedule } from './getFormattedDaySchedule';

export const getFormattedWeekSchedule = (
  dayFromWeek: Day,
  schedule: Schedule,
  groupName: string = ''
) => {
  const requiredWeekNumber = DateTime.fromISO(dayFromWeek.date).weekNumber;
  const requiredWeekSchedule = schedule.days.filter((day) => {
    const currentDay = DateTime.fromISO(day.date);
    return currentDay.weekNumber === requiredWeekNumber;
  });
  const header = `${
    requiredWeekNumber % 2 === 0 ? 'Четная' : 'Нечётная'
  } неделя, гр.${groupName}\n\n`;
  const result = requiredWeekSchedule.map((day, index) => {
    const formattedDate = DateTime.fromISO(day.date)
      .setLocale('ru')
      .toFormat('cccc, dd.MM.yyyy');
    const header = `${
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }\n————————————————————\n`;
    const footer = `————————————————————\n`;
    if (index === 6) return '';
    if (!day.lessons.length) return header + 'Выходной\n' + footer;
    return header + getFormattedDaySchedule(day, '', true) + footer;
  });
  return (
    header +
    result.join('\n') +
    `Отправлено из Pocket KAI: ${window.location.href}`
  );
};
