import { Box, Skeleton, Text } from '@chakra-ui/react';
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

  useEffect(() => {
    const todayBlock = document.getElementById(today);
    if (todayBlock) {
      todayBlock.scrollIntoView();
    }
  }, []);
  return (
    <div className={styles['schedule']}>
      <Skeleton ref={upperRef} h={'100px'} />
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <Text color="blue.900" fontWeight="medium" fontSize="18px" pt="5px">
            {getFormattedDate(day.date)}
          </Text>
          <div className={styles['day__timeline']}>
            <div className={styles['day__timeline-stub']} />
            <div className={styles['day__timeline-part']}>
              <Box
                bgColor={today >= day.date ? '#3182ce80' : 'blue.500'}
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
      <Skeleton ref={lowerRef} h={'100px'} />
    </div>
  );
}
