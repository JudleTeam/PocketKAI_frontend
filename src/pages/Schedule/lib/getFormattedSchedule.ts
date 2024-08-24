import {
  Day,
  getFormattedDate,
  Group,
  Lesson,
  Nullable,
  WeekParity,
} from '@/shared';
import { lessonTypesEmojis } from '../constants/lessonTypesEmojis';
import { DateTime } from 'luxon';

const weekParityTranslation = {
  odd: 'чет',
  even: 'неч',
  any: 'чет/неч',
};

export const getFormattedSchedule = (
  day: Day,
  weekParity: Nullable<WeekParity>,
  group: Group
) => {
  const { date, lessons } = day;
  const { parity } = weekParity!;
  const header = `${
    parity === 'odd' ? 'Четная неделя' : 'Нечетная неделя'
  }\n${getFormattedDate(date)}, гр. ${group.group_name}\n————————————————\n`;
  const formattedLessons = lessons.map((lesson, index) => {
    const { lessonDuration, lessonLocation, lessonName, teacherName } =
      getLessonInfo(lesson);

    return `${lessonDuration} | ${lessonLocation} | ${
      weekParityTranslation[lesson.parsed_parity]
    }\n${lessonName}\n${teacherName} \n${
      lessons.length === index + 1 ? '' : '\n'
    }`;
  });
  const footer = `————————————————\n\nОтправлено из Pocket KAI: https://pocket-kai.vercel.app/`;
  return header + formattedLessons.join('') + footer;
};

function getLessonInfo(lesson: Lesson) {
  const lessonLocation =
    lesson.audience_number === lesson.building_number
      ? lesson.building_number
      : `${lesson.building_number} зд. ${lesson.audience_number} ауд.`;
  const lessonDuration = `${
    lesson.start_time && DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
  }${
    lesson.end_time
      ? ` - ${DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}`
      : ''
  }`;
  const lessonName = `${
    lesson.original_lesson_type &&
    lessonTypesEmojis[lesson.original_lesson_type]
  } ${lesson.discipline.name}`;
  const teacherNameArr = lesson.teacher?.name.split(' ');
  const teacherName = teacherNameArr?.length
    ? `${teacherNameArr[0]} ${teacherNameArr[1].charAt(
        0
      )}.${teacherNameArr[2].charAt(0)}.`
    : 'Преподаватель кафедры';
  const departmentName = lesson.department?.name;
  return {
    lessonLocation,
    lessonDuration,
    lessonName,
    teacherName,
    departmentName,
  };
}
