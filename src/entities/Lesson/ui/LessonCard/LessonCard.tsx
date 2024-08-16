import { memo, useEffect } from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Lesson } from '@/shared';
import { lessonStateIcons } from '@/shared/constants';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '@/shared/constants';
import { getLessonState } from '../../lib/getLessonState';
import { getLessonBuilding, useColor, useDisclosure } from '@/shared/lib';
import styles from './LessonCard.module.scss';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import LessonDrawer from '../LessonDrawer/LessonDrawer';

const LessonCard = memo(
  ({ lesson, dayDate }: { lesson: Lesson; dayDate: string }) => {
    const { isOpen, setIsOpen } = useDisclosure();
    const {themeColor, mainTextColor, mainColor} = useColor();
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
          <HStack className={styles['lesson-card']} alignItems="flex-start">
            <div className={styles['lesson-card__time']}>
              <Text
                className={styles['lesson-card__time--start']}
                color={mainTextColor}
              >
                {lesson.start_time
                  ? DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
                  : 'Н/Д'}
              </Text>
              <Text
                className={`${styles['lesson-card__time--end']} text-l-blue-light-element dark:text-d-blue-light-element`}
              >
                {lesson.end_time &&
                  DateTime.fromISO(lesson.end_time).toFormat('HH:mm')}
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
                {/* {sliceLessonName(lesson.discipline.name)} */}
                {lesson.discipline.name}
              </Text>
              <Text color={mainTextColor} fontWeight={'medium'}>
                {getLessonBuilding(
                  lesson.building_number,
                  lesson.audience_number
                )}
              </Text>
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
);
export default LessonCard;
