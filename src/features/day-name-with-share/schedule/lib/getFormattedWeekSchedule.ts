import { Day, Nullable, Schedule, WeekParity } from '@/shared';
import { DateTime } from 'luxon';
import { getFormattedDaySchedule } from './getFormattedDaySchedule';

export const getFormattedWeekSchedule = (
  dayFromWeek: Day,
  parity: Nullable<WeekParity>,
  schedule: Schedule
) => {
  const requiredWeekNumber = DateTime.fromISO(dayFromWeek.date).weekNumber;
  const requiredWeekSchedule = schedule.days.filter((day) => {
    const currentDay = DateTime.fromISO(day.date);
    return currentDay.weekNumber === requiredWeekNumber;
  });
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
    return header + getFormattedDaySchedule(day, parity, '', true) + footer;
  });
  return (
    result.join('\n') + `Отправлено из Pocket KAI: ${window.location.origin}`
  );
};
