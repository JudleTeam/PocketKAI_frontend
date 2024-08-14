import { memo, useEffect } from 'react';
import {
  HStack,
  Text,
  useDisclosure,
  useColorModeValue,
  useChakra,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { Lesson } from '@/shared';
import { lessonStateIcons } from '@/shared/constants';
import { lessonStateLine } from '../../constants/lessonStateLine';
import { LessonTypes } from '@/shared/constants';
import { getLessonState } from '../../lib/getLessonState';
import { getLessonBuilding } from '@/shared/lib';
import styles from './LessonCard.module.scss';
import { Drawer } from 'vaul';
import LessonDrawer from '../LessonDrawer/LessonDrawer';

const LessonCard = memo(
  ({ lesson, dayDate }: { lesson: Lesson; dayDate: string }) => {
    const { isOpen, onOpen } = useDisclosure();
    const mainTextColor = useColorModeValue(
      'light.main_text',
      'dark.main_text'
    );
    const blueLightElementColor = useColorModeValue(
      'light.blue_light_element',
      'dark.blue_light_element'
    );
    const themeColor = useColorModeValue('#858585', '#0E1117');
    const { theme } = useChakra();
    const mainColor = useColorModeValue(
      theme.colors.light.main,
      theme.colors.dark.main
    );
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
      <Drawer.Root snapPoints={[0.6, 1]} fadeFromIndex={0}>
        <Drawer.Trigger asChild>
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
                {lesson.start_time
                  ? DateTime.fromISO(lesson.start_time).toFormat('HH:mm')
                  : 'Н/Д'}
              </Text>
              <Text
                className={styles['lesson-card__time--end']}
                color={blueLightElementColor}
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
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />
          <Drawer.Content
            className={
              'flex flex-col ' +
              'bg-white rounded-t-[25px] ' +
              'mt-24 z-20 ' +
              'h-[100%] max-h-[100%] ' +
              'fixed bottom-0 left-0 right-0 ' +
              'md:max-w-[550px] md:mx-auto lg:max-w-[50vw]'
            }
          >
            <Drawer.Handle className="mt-2 w-2 h-2 bg-black" />
            <LessonDrawer lesson={lesson} dayDate={dayDate} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }
);
export default LessonCard;
