import { useSchedule, LessonCard } from '@/entities';
import styles from './Schedule.module.scss';
import { Text } from '@chakra-ui/react';
import { getFormattedDate } from './lib/getFormattedDate';
//import { useCurrentDay } from '@/widgets';
export function Schedule() {
  // const [currentDay, setCurrentDay] = useCurrentDay();
  const { schedule } = useSchedule();
  return (
    <div className={styles['schedule']}>
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <div className="day__timeline-part"></div>
          <Text color="blue.900" fontWeight="medium" fontSize="18px">
            {getFormattedDate(day.date)}
          </Text>
          {day.lessons.map((lesson) => (
            <LessonCard lesson={lesson} dayDate={day.date} key={lesson.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
