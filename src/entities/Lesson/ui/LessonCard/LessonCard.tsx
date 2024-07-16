import { Lesson } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import styles from './LessonCard.module.scss';
import { DateTime } from 'luxon';
import { lessonStateIcons } from '../../constants/lessonStateIcons';
import { getLessonState } from '../../lib/getLessonState';

export function LessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  return (
    <HStack className={styles['lesson-card']} alignItems="flex-start">
      <div className={styles['lesson-card__time']}>
        <p className={styles['lesson-card__time--start']}>
          {lesson.start_time
            ? DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
            : 'Н/Д'}
        </p>
        <p className={styles['lesson-card__time--end']}>
          {lesson.end_time &&
            DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}
        </p>
      </div>
      <div className={styles['lesson-card__timeline']}>
        {lessonStateIcons[getLessonState(lesson, dayDate)]}
      </div>
      <div className={styles['lesson-card__info']}>
        <Text
          color="blue.900"
          fontWeight="bold"
          lineHeight={1.3}
          className={styles['lesson-card__name']}
        >
          {lesson.discipline.name}
        </Text>
        <Text color="blue.900" fontWeight={'medium'}>
          Здание: {lesson.building_number} Ауд: {lesson.audience_number}
        </Text>
        <Text color={'blue.600'} fontWeight={'light'}>
          {lesson.original_lesson_type}
        </Text>
      </div>
    </HStack>
  );
}
