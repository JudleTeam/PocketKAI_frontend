import {
  getFullDayOfWeek,
  Group,
  GroupShort,
  HiddenLesson,
  IHiddenLessons,
  Nullable,
} from '@/shared';
import { DateTime } from 'luxon';

export const getLessonsForGroup = (
  hiddenLessons: IHiddenLessons[],
  currentGroup: Nullable<Group | GroupShort>
):
  | {
    week_parity: 'odd' | 'even';
    week_days: { dayName: string; lessons: HiddenLesson[] }[];
  }[]
  | null => {
  if (!currentGroup) return null;

  const groupedLessons: Record<
    'odd' | 'even',
    Record<string, HiddenLesson[]>
  > = {
    odd: {},
    even: {},
  };

  hiddenLessons
    .filter(({ group }) => group?.id === currentGroup.id)
    .forEach(({ lesson }) => {
      const dayName = getFullDayOfWeek(lesson.number_of_day);
      if (!dayName) return;

      const typeHide = lesson.type_hide;

      const addLessonToWeek = (week: 'odd' | 'even') => {
        if (!groupedLessons[week][dayName]) {
          groupedLessons[week][dayName] = [];
        }
        groupedLessons[week][dayName].push(lesson);
      };

      if (typeHide === 'always') {
        addLessonToWeek('odd');
        addLessonToWeek('even');
      } else if (typeHide === 'odd' || typeHide === 'even') {
        addLessonToWeek(typeHide);
      } else if (typeHide && DateTime.fromISO(typeHide).isValid) {
        const lessonDate = DateTime.fromISO(typeHide);
        const parity: 'odd' | 'even' =
          lessonDate.weekNumber % 2 === 0 ? 'even' : 'odd';
        addLessonToWeek(parity);
      }
    });

  const daysOrder = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  const result = (['even', 'odd'] as const)
    .map((weekParity) => {
      const weekDays = daysOrder
        .filter((day) => groupedLessons[weekParity][day])
        .map((dayName) => ({
          dayName,
          lessons: groupedLessons[weekParity][dayName].sort(
            (a, b) => a.number_of_day - b.number_of_day
          ),
        }));

      return {
        week_parity: weekParity,
        week_days: weekDays.length > 0 ? weekDays : [],
      };
    });

  return result.every(({ week_days }) => week_days.length === 0) ? null : result;
};
