import { Group, GroupShort, Lesson, Nullable } from '@/shared';
import { lessonTypesEmojis } from '../constants/lessonTypesEmojis';
import { DateTime } from 'luxon';

const weekParityTranslation = {
  odd: 'неч',
  even: 'чет',
  any: 'чет/неч',
};

const daysOfWeek: { [key: string]: string } = {
  monday: 'Понедельник',
  tuesday: 'Вторник',
  wednesday: 'Среда',
  thursday: 'Четверг',
  friday: 'Пятница',
  saturday: 'Суббота',
  sunday: 'Воскресенье',
};

export const getFormattedWeekSchedule = (
  weekDay: [string, Lesson[]],
  weekParity: 'even' | 'odd',
  group: Nullable<Group | GroupShort>
) => {
  const date = weekDay[0];
  const lessons = weekDay[1];
  if (!group) return '';
  const header = `${weekParity === 'odd' ? 'Четная неделя' : 'Нечетная неделя'
    }\n${daysOfWeek[date]}, гр. ${group.group_name}\n————————————————\n`;
  const formattedLessons = lessons.map((lesson, index) => {
    const { lessonDuration, lessonLocation, lessonName, teacherName } =
      getLessonInfo(lesson);

    return `${lessonDuration} | ${lessonLocation} | ${weekParityTranslation[lesson.parsed_parity]
      }\n${lessonName}\n${teacherName} \n${lessons.length === index + 1 ? '' : '\n'
      }`;
  });
  const footer = `————————————————\n\nОтправлено из PocketKAI: https://pocket-kai.ru`;
  return header + formattedLessons.join('') + footer;
};

function getLessonInfo(lesson: Lesson) {
  const lessonLocation =
    lesson.audience_number === lesson.building_number
      ? lesson.building_number
      : `${lesson.building_number} зд. ${lesson.audience_number} ауд.`;
  const lessonDuration = `${lesson.start_time && DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
    }${lesson.end_time
      ? ` - ${DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}`
      : ''
    }`;
  const lessonName = `${lesson.original_lesson_type &&
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
