import { Lesson } from '@/shared';
import { HStack, Text, useChakra } from '@chakra-ui/react';
import { lessonStateIcons } from '@/shared/constants';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '@/shared/constants'
import LessonDrawer from '../LessonDrawer/LessonDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './FadedLessonCard.module.scss';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useEffect } from 'react';

export function FadedLessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const themeColor = useColorModeValue( '#858585','#0E1117')
  const {theme} = useChakra()
  const mainColor = useColorModeValue(theme.colors.light.main, theme.colors.dark.main)
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
      console.log(metaThemeColor.getAttribute('content'));
    }
  }, [themeColor, mainColor, isOpen]);

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
            noOfLines={2}
          >
            {lesson.discipline.name}
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
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={
          <LessonDrawer dayDate={dayDate} lesson={lesson} />
        }
      />
    </>
  );
}
