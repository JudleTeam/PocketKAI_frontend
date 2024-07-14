import { Select, Text, VStack } from '@chakra-ui/react';
import styles from './schedule-layout.module.scss';
import { DateTime } from 'luxon';
import { useSchedule } from '../../model/schedule.store';
import { useEffect } from 'react';
export function ScheduleLayout() {
  const todayDate = DateTime.now().setLocale('ru').toFormat('d MMMM');
  const { weekSchedule, getWeekScheduleByName } = useSchedule();
  console.log(weekSchedule);
  useEffect(() => {
    getWeekScheduleByName('6210');
  }, []);
  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule__header']}>
        <VStack
          alignItems={'flex-start'}
          gap={0.5}
          className={styles['schedule__current-date']}
        >
          <Text>{todayDate}</Text>
          <Text>Чётная неделя</Text>
        </VStack>
        <Select w="40%" placeholder="Опции"></Select>
      </div>
      <div className={styles['schedule__navigation']}></div>
      <div className={styles['schedule__content']}></div>
    </div>
  );
}
