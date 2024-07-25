import {
  Box,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { LessonCard, RestCard } from '@/entities';
import { getFormattedDate, Nullable, Schedule } from '@/shared';
import { useEffect } from 'react';
import { useInfiniteScroll } from '../lib/useInfiniteScroll';
import { useCurrentDay } from '@/widgets';
import styles from './ScheduleLayout.module.scss';
import { getTodayDate } from '@/shared';

export function ScheduleLayout({ schedule }: { schedule: Nullable<Schedule> }) {
  const today = getTodayDate();
  const [currentDay] = useCurrentDay();
  const { upperRef, lowerRef } = useInfiniteScroll(schedule, currentDay);
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  useEffect(() => {
    const todayBlock = document.getElementById(today);
    if (todayBlock) {
      todayBlock.scrollIntoView();
    }
  }, [today]);
  return (
    <div className={styles['schedule']}>
      <Stack ref={upperRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <Text color={main_text} fontWeight="medium" fontSize="18px" pt="5px">
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
          {day.lessons.length > 0 ? (
            day.lessons.map((lesson) => (
              <LessonCard lesson={lesson} dayDate={day.date} key={lesson.id} />
            ))
          ) : (
            <RestCard dayDate={day.date} />
          )}
        </div>
      ))}
      <Stack ref={lowerRef}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </div>
  );
}
