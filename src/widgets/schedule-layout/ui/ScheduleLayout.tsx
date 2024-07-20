import { Box, Text } from '@chakra-ui/react';
import { LessonCard, RestCard } from '@/entities';
import { getFormattedDate, Nullable, Schedule } from '@/shared';
import { DateTime } from 'luxon';
import styles from './ScheduleLayout.module.scss';
import { useEffect } from 'react';

export function ScheduleLayout({ schedule }: { schedule: Nullable<Schedule> }) {
  const today = DateTime.now().toFormat('yyyy-LL-dd');
  useEffect(() => {
    const todayBlock = document.getElementById(today);
    if (todayBlock) {
      todayBlock.scrollIntoView({ behavior: 'smooth' });
    }
  }, [today, schedule]);
  return (
    <div className={styles['schedule']}>
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <Text color="blue.900" fontWeight="medium" fontSize="18px" pt="5px">
            {getFormattedDate(day.date)}
          </Text>
          <div className={styles['day__timeline']}>
            <div className={styles['day__timeline-stub']} />
            <div className={styles['day__timeline-part']}>
              <Box
                bgColor={today === day.date ? '#3182ce80' : 'blue.500'}
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
    </div>
  );
}
