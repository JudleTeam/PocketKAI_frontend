import { FullWeekSchedule, Nullable, Schedule } from '@/shared';
import { DateTime } from 'luxon';
import { ScheduleParams } from '../model/types';

export function generateDateSchedule(
  fullSchedule: Nullable<FullWeekSchedule>,
  params: ScheduleParams
) {
  if (!fullSchedule || !params.date_from)
    return {
      parsed_at: '',
      days: [],
    };
  const currentDate = DateTime.fromISO(params.date_from);

  const currentWeekNumber = currentDate.weekNumber;
  const weekParity = currentWeekNumber % 2 === 0 ? 'even' : 'odd';

  const currentSchedule =
    weekParity === 'even' ? fullSchedule?.even : fullSchedule?.odd;
  const daysOfWeek: { [key: number]: keyof typeof currentSchedule.week_days } =
    {
      1: 'monday',
      2: 'tuesday',
      3: 'wednesday',
      4: 'thursday',
      5: 'friday',
      6: 'saturday',
      7: 'sunday',
    };

  const dateSchedule: Schedule = {
    parsed_at: '',
    days: [],
  };

  for (let i = 0; i < params.days_count; i++) {
    const targetDate = currentDate.startOf('week').plus({ days: i });
    const dayName = daysOfWeek[targetDate.weekday];
    const lessons = currentSchedule?.week_days[dayName];

    dateSchedule.days.push({
      date: targetDate.toISODate() || '',
      lessons: lessons || [],
    });
  }

  return dateSchedule;
}
