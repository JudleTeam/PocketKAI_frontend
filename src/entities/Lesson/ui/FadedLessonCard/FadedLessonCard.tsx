import { Lesson } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import { lessonStateIcons } from '@/shared/constants';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '@/shared/constants';
import LessonDrawer from '../LessonDrawer/LessonDrawer';
import styles from './FadedLessonCard.module.scss';
import { useEffect } from 'react';
import { Drawer, DrawerTrigger, DrawerContent } from '@/shared/ui/drawer';
import { useColor, useDisclosure} from '@/shared/lib';

export function FadedLessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  const { isOpen, setIsOpen } = useDisclosure();
  const {mainTextColor, themeColor, mainColor} = useColor();
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <HStack
          onClick={() => setIsOpen(true)}
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
      </DrawerTrigger>
      <DrawerContent>
        <LessonDrawer lesson={lesson} dayDate={dayDate} />
      </DrawerContent>
    </Drawer>
  );
}
