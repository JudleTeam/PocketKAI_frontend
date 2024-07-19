import { Lesson } from '@/shared';
import { HStack, Text, VStack } from '@chakra-ui/react';
import styles from './LessonCard.module.scss';
import { DateTime } from 'luxon';
import { lessonStateIcons } from '../../constants/lessonStateIcons';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '../../constants/lessonTypes';
import { getLessonBuilding } from '../../lib/getLessonBuilding';
import { LessonDrawer } from '../LessonDrawer/LessonDrawer';
import {useDisclosure} from '@chakra-ui/react'

export function LessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <HStack onClick={onOpen} className={styles['lesson-card']} alignItems="flex-start">
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
        {lessonStateIcons[getLessonState(lesson, dayDate).state]}
        {lessonStateLine(getLessonState(lesson, dayDate).color)}
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
          {getLessonBuilding(lesson.building_number, lesson.audience_number)}
        </Text>
        <Text fontWeight={'meduim'}>
          {lesson.parsed_lesson_type && LessonTypes[lesson.parsed_lesson_type]}
        </Text>
      </div>
    </HStack>
    <LessonDrawer dayDate={dayDate} lesson={lesson} isOpen={isOpen} onClose={onClose}/>
    </>
  );
}


