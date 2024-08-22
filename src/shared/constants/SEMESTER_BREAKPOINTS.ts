import { DateTime, Interval } from 'luxon';
const currentYear = DateTime.now().year;
const firstSemesterStart = DateTime.fromISO(`${currentYear}-09-01`);
const firstSemesterEnd = DateTime.fromISO(`${currentYear}-12-31`);
const secondSemesterStart = DateTime.fromISO(`${currentYear}-02-01`);
const secondSemesterEnd = DateTime.fromISO(`${currentYear}-05-31`);
const winterHolidayStart = DateTime.fromISO(`${currentYear}-01-01`);
const winterHolidayEnd = DateTime.fromISO(`${currentYear}-01-31`);
const summerHolidayStart = DateTime.fromISO(`${currentYear}-06-01`);
const summerHolidayEnd = DateTime.fromISO(`${currentYear}-08-31`);

export const SEMESTER_BREAKPOINTS = {
  firstSemesterStart,
  firstSemesterEnd,
  secondSemesterStart,
  secondSemesterEnd,
  firstSemester: Interval.fromDateTimes(firstSemesterStart, firstSemesterEnd),
  secondSemester: Interval.fromDateTimes(
    secondSemesterStart,
    secondSemesterEnd
  ),
  winterHoliday: Interval.fromDateTimes(winterHolidayStart, winterHolidayEnd),
  summerHoliday: Interval.fromDateTimes(summerHolidayStart, summerHolidayEnd),
};
