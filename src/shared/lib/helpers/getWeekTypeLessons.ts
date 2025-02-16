import { HiddenLesson } from '@/shared';

export const getWeekTypeLessons = (lessons: HiddenLesson[]) => {
  return lessons.reduce(
    (acc, lesson) => {
      if (lesson.type_hide === 'odd') acc.odd.push(lesson);
      else if (lesson.type_hide === 'even') acc.even.push(lesson);
      else {
        acc.even.push(lesson);
        acc.odd.push(lesson);
      }
      return acc;
    },
    { odd: [], even: [] } as Record<string, HiddenLesson[]>
  );
};
