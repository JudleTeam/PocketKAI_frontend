import { Lesson } from '@/shared';
import { lessonTypesEmojis, WEEK_DAYS } from '@/shared/constants';
import { DateTime } from 'luxon';

const weekParityTranslation = {
  odd: 'чет',
  even: 'неч',
  any: 'чет/неч',
};

export const getFormattedDayScheduleFull = (
  dayName: string,
  lessons: Lesson[],
  weekParity: 'even' | 'odd',
  groupName: string = '',
  forWeekSchedule: boolean = false
) => {
  const header = `${weekParity === 'even' ? 'Чётная' : 'Нечётная'} неделя\n${
    WEEK_DAYS[dayName as keyof typeof WEEK_DAYS]
  }, гр. ${groupName}\n————————————————\n`;
  const formattedLessons = lessons.map((lesson, index) => {
    const {
      lessonDuration,
      lessonDates,
      lessonLocation,
      lessonName,
      teacherName,
    } = getLessonInfo(lesson);

    return `${lessonDuration} | ${lessonLocation} | ${
      lessonDates ?? weekParityTranslation[lesson.parsed_parity]
    }\n${lessonName}\n${teacherName} \n${
      lessons.length === index + 1 ? '' : '\n'
    }`;
  });
  const footer = `————————————————\n\nОтправлено из Pocket KAI: ${window.location.origin}`;
  if (forWeekSchedule) return formattedLessons.join('');
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

  const lessonDates = lesson.parsed_dates
    ?.map((date) => DateTime.fromISO(date).toFormat('dd.MM'))
    .join(', ');

  const lessonName = `${
    lesson.parsed_lesson_type && lessonTypesEmojis[lesson.parsed_lesson_type]
  } ${lesson.discipline.name}`;

  const teacherNameArr = lesson.teacher?.name.split(' ');

  const teacherName = teacherNameArr?.length
    ? teacherNameArr.length === 3
      ? `${teacherNameArr[0]} ${teacherNameArr[1].charAt(
          0
        )}.${teacherNameArr[2].charAt(0)}.`
      : teacherNameArr.join(' ')
    : 'Преподаватель кафедры';

  const departmentName = lesson.department?.name;

  return {
    lessonLocation,
    lessonDates,
    lessonDuration,
    lessonName,
    teacherName,
    departmentName,
  };
}
