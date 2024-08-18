import { FullWeekSchedule, Lesson, Nullable, Schedule } from '@/shared';
import { DateTime } from 'luxon';
import { ScheduleParams } from '../model/types';
import { SEMESTER_BREAKPOINTS } from '@/shared/constants';

type WeekDays =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export async function generateDateSchedule(
  fullSchedule: Nullable<FullWeekSchedule>,
  params: ScheduleParams
): Promise<Schedule> {
  if (!fullSchedule || !params.date_from)
    return {
      parsed_at: '',
      days: [],
    };

  const dateFrom = DateTime.fromISO(params.date_from);
  const daysOfWeek: Record<number, WeekDays> = {
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
    const targetDate = dateFrom.startOf('week').plus({ days: i });

    let lessons: Lesson[] = [];
    if (
      SEMESTER_BREAKPOINTS.firstSemester.contains(targetDate) ||
      SEMESTER_BREAKPOINTS.secondSemester.contains(targetDate)
    ) {
      const targetWeekParity = targetDate.weekNumber % 2 === 0 ? 'even' : 'odd';
      const dayName = daysOfWeek[targetDate.weekday];
      lessons = fullSchedule[targetWeekParity]?.week_days[dayName] || [];
    }

    dateSchedule.days.push({
      date: targetDate.toISODate() || '',
      lessons: lessons || [],
    });
  }

  return dateSchedule;
}
