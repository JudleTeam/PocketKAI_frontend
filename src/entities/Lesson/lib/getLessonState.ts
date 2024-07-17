import { Lesson } from '@/shared';
import { DateTime } from 'luxon';
//type LessonState = 'upcoming' | 'past' | 'current' | 'unknown';
type LessonState = {
  state: 'upcoming' | 'past' | 'current' | 'unknown',
  color: string;
}
export function getLessonState(lesson: Lesson, lessonDay: string): LessonState {
  const currentTime = DateTime.now();
  const hasDayPassed =
    DateTime.fromISO(lessonDay).startOf('day') < currentTime.startOf('day');

  const isNextDay =
    DateTime.fromISO(lessonDay).startOf('day') > currentTime.startOf('day');
  if (hasDayPassed) return {state: 'past', color: '#3182ce80'};
  if (isNextDay) return {state: 'upcoming', color: '#3182CE'};
  if (!lesson.end_time || !lesson.start_time) return {state: 'unknown', color: '#3182CE'};
  if (
    DateTime.fromISO(lesson.end_time) > currentTime &&
    DateTime.fromISO(lesson.start_time) < currentTime
  ) {
    console.log(DateTime.fromISO(lesson.end_time));
    return {state: 'current', color: '#3182CE'};
  }

  if (DateTime.fromISO(lesson.end_time) > currentTime) {
    return {state: 'upcoming', color: '#3182CE'};
  }

  if (DateTime.fromISO(lesson.end_time) < currentTime) {
    return {state: 'past', color: '#3182ce80'};
  }

  return {state: 'unknown', color: '#3182CE'};
}
