import { ExamType } from '@/shared';
import { DateTime } from 'luxon';
type ExamState = {
  state: 'upcoming' | 'past' | 'current' | 'unknown';
  color: string;
};
export function getExamState(exam: ExamType): ExamState {
  const dayExam = exam.parsed_date ? exam.parsed_date : exam.original_date;
  const currentTime = DateTime.now().setZone('Europe/Moscow');
  const hasDayPassed =
    DateTime.fromISO(dayExam).startOf('day') < currentTime.startOf('day');

  const isNextDay =
    DateTime.fromISO(dayExam).startOf('day') > currentTime.startOf('day');

  if (hasDayPassed) return { state: 'past', color: '#3182ce80' };
  if (isNextDay) return { state: 'upcoming', color: '#3182CE' };
  if (!exam.time) return { state: 'unknown', color: '#3182CE' };

  if (DateTime.fromISO(exam.time) > currentTime) {
    return { state: 'upcoming', color: '#3182CE' };
  }

  if (DateTime.fromISO(exam.time) < currentTime) {
    return { state: 'past', color: '#3182ce80' };
  }

  return { state: 'unknown', color: '#3182CE' };
}
