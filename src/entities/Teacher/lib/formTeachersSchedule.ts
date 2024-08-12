import { TeacherLesson } from '@/shared';

export const formTeachersSchedule = (teachersSchedule: TeacherLesson[]) => {
  const odd: TeacherLesson[] = [];
  const even: TeacherLesson[] = [];
  teachersSchedule.forEach((lesson) => {
    if (lesson.parsed_parity === 'any') {
      odd.push(lesson);
      even.push(lesson);
    }
    if (lesson.parsed_parity === 'odd') {
      odd.push(lesson);
    }
    if (lesson.parsed_parity === 'even') {
      even.push(lesson);
    }
  });
  return { odd, even };
};
