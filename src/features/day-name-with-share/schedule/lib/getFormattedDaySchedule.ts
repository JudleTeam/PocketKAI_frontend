import { Day, getFormattedDate, Lesson, Nullable, WeekParity } from '@/shared';
import { lessonTypesEmojis } from '@/shared/constants';
import { DateTime } from 'luxon';

const weekParityTranslation = {
  odd: 'чет',
  even: 'неч',
  any: 'чет/неч',
};

export const getFormattedDaySchedule = (
  day: Day,
  weekParity: Nullable<WeekParity>,
  groupName: string = '',
  forWeekSchedule: boolean = false
) => {
  const { date, lessons } = day;
  const { parity } = weekParity!;

  const header = `${
    parity === 'odd' ? 'Четная неделя' : 'Нечетная неделя'
  }\n${getFormattedDate(date)}, гр. ${groupName}\n————————————————\n`;
  const formattedLessons = lessons.map((lesson, index) => {
    const {
      lessonDuration,
      lessonDates,
      lessonLocation,
      lessonName,
      teacherName,
    } = getLessonInfo(lesson);

    return `${lessonDuration} | ${lessonLocation} | __${
      lessonDates ?? weekParityTranslation[lesson.parsed_parity]
    }__\n**${lessonName}**\n${teacherName} \n${
      lessons.length === index + 1 ? '' : '\n'
    }`;
  });
  const footer = `————————————————\n\nОтправлено из Pocket KAI: ${window.location.href}`;
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
