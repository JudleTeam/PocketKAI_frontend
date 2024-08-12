import { WeekSchedule } from '@/shared';

export const formWeekSchedule = (weekSchedule: WeekSchedule) => {
  const even = {
    parsed_at: weekSchedule.parsed_at,
    week_parity: 'even',
    week_days: {},
  } as WeekSchedule;

  const odd = {
    parsed_at: weekSchedule.parsed_at,
    week_parity: 'odd',
    week_days: {},
  } as WeekSchedule;

  even.week_days = Object.fromEntries(
    Object.entries(weekSchedule.week_days).map(([dayName, lessons]) => {
      return [
        dayName,
        lessons.filter(
          (lesson) =>
            lesson.parsed_parity === 'even' || lesson.parsed_parity === 'any'
        ),
      ];
    })
  );

  odd.week_days = Object.fromEntries(
    Object.entries(weekSchedule.week_days).map(([dayName, lessons]) => {
      return [
        dayName,
        lessons.filter(
          (lesson) =>
            lesson.parsed_parity === 'odd' || lesson.parsed_parity === 'any'
        ),
      ];
    })
  );

  return { odd, even };
};
