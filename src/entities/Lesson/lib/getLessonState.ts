import { Lesson } from '@/shared';
import { DateTime } from 'luxon';

type LessonState = 'upcoming' | 'past' | 'current' | 'unknown';
export function getLessonState(lesson: Lesson, lessonDay: string): LessonState {
  const currentTime = DateTime.now();
  const hasDayPassed = DateTime.fromISO(lessonDay) < currentTime;
  if (hasDayPassed) return 'past';
  if (!lesson.end_time || !lesson.start_time) return 'unknown';
  if (
    DateTime.fromISO(lesson.end_time) > currentTime &&
    DateTime.fromISO(lesson.start_time) < currentTime
  ) {
    return 'current';
  }

  if (DateTime.fromISO(lesson.end_time) < currentTime) {
    return 'past';
  }
  if (DateTime.fromISO(lesson.end_time) > currentTime) {
    return 'upcoming';
  }
  return 'unknown';
}
