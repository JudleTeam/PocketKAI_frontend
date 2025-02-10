import { Lesson } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import { lessonStateIcons } from '@/shared/constants';
import { getLessonState } from '../../lib/getLessonState';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '@/shared/constants';
import styles from './FadedLessonCard.module.scss';
import { Drawer, DrawerTrigger, DrawerContent } from '@/shared/ui/drawer';
import { useColor, useDisclosure } from '@/shared/lib';
import { useSettings } from '@/entities';
import { HideLesson } from '@/features';
import { LessonDrawer } from '../LessonDrawer/LessonDrawer';
import { useMetaThemeColor } from '@/shared';

export function FadedLessonCard({
  lesson,
  dayDate,
}: {
  lesson: Lesson;
  dayDate: string;
}) {
  const { isOpen, setIsOpen } = useDisclosure();
  const { primaryColor, themeColor, mainColor } = useColor();
  const { showFadedLessons } = useSettings();
  const fadedLesson = true;

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <HideLesson lesson={lesson} dayDate={dayDate}>
        <DrawerTrigger asChild>
          <HStack
            display={showFadedLessons ? 'flex' : 'none'}
            onClick={() => setIsOpen(true)}
            className={styles['lesson-card']}
            alignItems="flex-start"
            transition="0.2s"
            _active={{ opacity: 0.2, transition: '0.2s' }}
          >
            <div className={styles['lesson-card__time']}>
              <Text
                className={styles['lesson-card__time--start']}
                color={primaryColor}
              >
                00:00
              </Text>
            </div>
            <div className={styles['lesson-card__timeline']}>
              {
                lessonStateIcons[
                  getLessonState(lesson, dayDate, fadedLesson).state
                ]
              }
              {lessonStateLine(getLessonState(lesson, dayDate).color)}
            </div>
            <div className={styles['lesson-card__info']}>
              <Text
                color={primaryColor}
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
      </HideLesson>
      <DrawerContent>
        <LessonDrawer lesson={lesson} dayDate={dayDate} />
      </DrawerContent>
    </Drawer>
  );
}
