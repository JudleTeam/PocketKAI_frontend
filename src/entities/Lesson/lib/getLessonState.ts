import { Lesson } from '@/shared';
import { DateTime } from 'luxon';
type LessonState = {
  state: 'upcoming' | 'past' | 'current' | 'unknown';
  color: string;
};
export function getLessonState(lesson: Lesson, lessonDay: string, fadedLesson?: boolean): LessonState {
  const currentTime = DateTime.now();
  const lessonNeedCheck =
    lesson.parsed_dates || lesson.parsed_dates_status === 'need_check';
  const hasDayPassed =
    DateTime.fromISO(lessonDay).startOf('day') < currentTime.startOf('day');
  const isNextDay =
    DateTime.fromISO(lessonDay).startOf('day') > currentTime.startOf('day');

  if (hasDayPassed) return { state: 'past', color: '#3182ce80' };

  if (isNextDay && !lessonNeedCheck)
    return { state: 'upcoming', color: '#3182CE' };

  if (isNextDay && lessonNeedCheck)
    return { state: 'unknown', color: '#3182CE' };

  if (!lesson.end_time || !lesson.start_time)
    return { state: 'unknown', color: '#3182CE' };

  if (fadedLesson){
    return {state: 'unknown', color: '#3182CE'}
  }
  // Lesson is ongoing
  if (
    DateTime.fromISO(lesson.end_time) > currentTime &&
    DateTime.fromISO(lesson.start_time) < currentTime
  ) {
    return { state: 'current', color: '#3182CE' };
  }

  if (lesson.parsed_lesson_type === 'military') {
    return { state: 'upcoming', color: '#3182ce' };
  }

  if (DateTime.fromISO(lesson.end_time) < currentTime) {
    return { state: 'past', color: '#3182ce80' };
  }

  if (lessonNeedCheck) {
    return { state: 'unknown', color: '#3182ce' };
  }

  if (DateTime.fromISO(lesson.end_time) > currentTime) {
    return { state: 'upcoming', color: '#3182CE' };
  }

  return { state: 'unknown', color: '#3182CE' };
}
