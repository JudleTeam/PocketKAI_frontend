import {
  Box,
  Skeleton,
  Stack,
  Text,
  useChakra,
  useColorModeValue,
} from '@chakra-ui/react';
import { FadedLessonCard, LessonCard, RestCard, useSchedule } from '@/entities';
import { getFormattedDate } from '@/shared';
import { useInfiniteScroll } from '../lib/useInfiniteScroll';
import styles from './ScheduleLayout.module.scss';
import { getTodayDate } from '@/shared';
import { ArrowIcon } from '@/shared/assets';
import { useGoUpButton } from '../lib/useGoUpButton';
import { scrollToToday } from '@/shared/lib';
export function ScheduleLayout() {
  const today = getTodayDate();
  const { schedule } = useSchedule();
  const { upperRef, lowerRef, scheduleContainerRef } = useInfiniteScroll();
  const { showButton, position: todayBlockPosition } = useGoUpButton();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  return (
    <div
      id="schedule"
      className={styles['schedule']}
      ref={scheduleContainerRef}
    >
      <Stack ref={upperRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <Text
            color={mainTextColor}
            fontWeight="medium"
            fontSize="18px"
            pt="5px"
          >
            {getFormattedDate(day.date)}
          </Text>
          <div className={styles['day__timeline']}>
            <div className={styles['day__timeline-stub']} />
            <div className={styles['day__timeline-part']}>
              <Box
                bgColor={today >= day.date ? '#3182ce80' : '#3182ce'}
                className={styles['day__timeline-part-line']}
              ></Box>
            </div>
          </div>
          {day.lessons.length === 0 && <RestCard dayDate={day.date} />}
          {day.lessons.map((lesson) => {
            if (
              lesson.parsed_dates &&
              !lesson.parsed_dates.includes(day.date)
            ) {
              return (
                <FadedLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  dayDate={day.date}
                />
              );
            }

            return (
              <LessonCard lesson={lesson} dayDate={day.date} key={lesson.id} />
            );
          })}
        </div>
      ))}
      <Stack ref={lowerRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>

      {!!showButton && (
        <Box
          onClick={() => scrollToToday(true)}
          as="button"
          w="50px"
          h="50px"
          borderRadius="8px"
          position="fixed"
          bottom="80px"
          right="5%"
          bgColor={mainElementColor}
          zIndex={'10'}
        >
          {todayBlockPosition === 'above' ? (
            <ArrowIcon color="white" w={'20px'} h={'20px'} />
          ) : (
            <ArrowIcon
              color="white"
              w={'20px'}
              h={'20px'}
              transform="rotate(180deg)"
            />
          )}
        </Box>
      )}
    </div>
  );
}
