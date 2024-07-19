import { Lesson } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import styles from './LessonCard.module.scss';
import { DateTime } from 'luxon';
import { lessonStateIcons } from '../../constants/lessonStateIcons';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '../../constants/lessonTypes';
import { getLessonBuilding } from '../../lib/getLessonBuilding';

import { useRef } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'

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
    <DrawerExample lesson={lesson} isOpen={isOpen} onClose={onClose}/>
    </>
  );
}

function DrawerExample({lesson, isOpen, onClose}:{lesson: Lesson , isOpen: boolean, onClose: () => void}){

  const btnRef = useRef<HTMLButtonElement>(null)
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent borderRadius='16px 16px 0 0'>
          <DrawerCloseButton />
          <DrawerHeader>{lesson.discipline.name}</DrawerHeader>

          <DrawerBody>
          
          </DrawerBody>


        </DrawerContent>
      </Drawer>
    </>
  )
}
