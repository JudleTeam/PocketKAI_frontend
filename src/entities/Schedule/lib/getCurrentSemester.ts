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
  if (SEMESTER_BREAKPOINTS.winterHoliday.contains(today)) {
    return 'winterHoliday';
  }
  if (SEMESTER_BREAKPOINTS.summerHoliday.contains(today)) {
    return 'summerHoliday';
  }
  return 'holiday';
};
