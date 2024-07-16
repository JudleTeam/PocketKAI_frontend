import { Lesson } from '@/shared';
import { DateTime } from 'luxon';

type LessonState = 'upcoming' | 'past' | 'current' | 'unknown';
export function getLessonState(lesson: Lesson, lessonDay: string): LessonState {
  const currentTime = DateTime.now();
  const hasDayPassed =
    DateTime.fromISO(lessonDay).startOf('day') < currentTime.startOf('day');

  const isNextDay =
    DateTime.fromISO(lessonDay).startOf('day') > currentTime.startOf('day');
  if (hasDayPassed) return 'past';
  if (isNextDay) return 'upcoming';
  if (!lesson.end_time || !lesson.start_time) return 'unknown';
  if (
    DateTime.fromISO(lesson.end_time) > currentTime &&
    DateTime.fromISO(lesson.start_time) < currentTime
  ) {
    console.log(DateTime.fromISO(lesson.end_time));
    return 'current';
  }

  if (DateTime.fromISO(lesson.end_time) > currentTime) {
    return 'upcoming';
  }

  if (DateTime.fromISO(lesson.end_time) < currentTime) {
    return 'past';
  }

  return 'unknown';
}
