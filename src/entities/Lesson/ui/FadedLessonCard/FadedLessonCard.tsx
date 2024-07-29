import { Lesson } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import { lessonStateIcons } from '../../constants/lessonStateIcons';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '../../constants/lessonTypes';
import { LessonDrawer } from '../LessonDrawer/LessonDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { sliceLessonName } from '../../lib/sliceLessonName';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './FadedLessonCard.module.scss';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';

export function FadedLessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <>
      <HStack
        onClick={onOpen}
        className={styles['lesson-card']}
        alignItems="flex-start"
      >
        <div className={styles['lesson-card__time']}>
          <Text
            className={styles['lesson-card__time--start']}
            color={mainTextColor}
          >
            00:00
          </Text>
        </div>
        <div className={styles['lesson-card__timeline']}>
          {lessonStateIcons[getLessonState(lesson, dayDate).state]}
          {lessonStateLine(getLessonState(lesson, dayDate).color)}
        </div>
        <div className={styles['lesson-card__info']}>
          <Text
            color={mainTextColor}
            fontWeight="bold"
            lineHeight={1.3}
            className={styles['lesson-card__name']}
          >
            {sliceLessonName(lesson.discipline.name)}
          </Text>
          {/* <Text color={mainTextColor} fontWeight={'medium'}>
            {getLessonBuilding(lesson.building_number, lesson.audience_number)}
          </Text> */}
          <Text fontWeight={'meduim'}>
            {lesson.parsed_lesson_type &&
              LessonTypes[lesson.parsed_lesson_type]}
          </Text>
        </div>
      </HStack>
      <UiDrawer isOpen={isOpen} onClose={onClose} drawerActions={() => LessonDrawer({dayDate, lesson})}/>
    </>
  );
}
