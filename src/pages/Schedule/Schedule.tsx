import { useSchedule, LessonCard } from '@/entities';
import styles from './Schedule.module.scss';
import { Text, Box } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { getFormattedDate } from './lib/getFormattedDate';
import { RestCard } from '@/entities/Lesson/ui/RestCard/RestCard';
import { useEffect } from 'react';
//import { useCurrentDay } from '@/widgets';
export function Schedule() {
  //const [currentDay, setCurrentDay] = useCurrentDay();
  const currentDay = DateTime.now().toFormat('yyyy-LL-dd')
  const { schedule } = useSchedule();
  return (
    <div className={styles['schedule']}>
      {schedule?.days.map((day) => (
        <div key={day.date} className={styles['day']} id={day.date}>
          <Text color="blue.900" fontWeight="medium" fontSize="18px" padding='5px 0 0 0'>
            {getFormattedDate(day.date)}
          </Text>
          <div className={styles['day__timeline']}>
            <div className={styles['day__timeline-stub']}></div>
            <div className={styles["day__timeline-part"]}>
              <Box bgColor={currentDay === day.date ?  '#3182ce80' : '#3182CE'} className={styles['day__timeline-part-line']}></Box>
            </div>
          </div>
          {day.lessons.length > 0 ? 
            (day.lessons.map((lesson) => (
              <LessonCard lesson={lesson} dayDate={day.date} key={lesson.id} />
            )))
          :
            (<RestCard dayDate={day.date}/>)
          }
        </div>
      ))}
    </div>
  );
}
