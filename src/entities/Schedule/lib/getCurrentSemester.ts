import { SEMESTER_BREAKPOINTS } from '@/shared/constants';
import { DateTime } from 'luxon';

export const getCurrentSemester = () => {
  const today = DateTime.now().setZone('Europe/Moscow');
  if (SEMESTER_BREAKPOINTS.firstSemester.contains(today)) {
    return 'first';
  }
  if (SEMESTER_BREAKPOINTS.secondSemester.contains(today)) {
    return 'second';
  }
  return 'holiday';
};
