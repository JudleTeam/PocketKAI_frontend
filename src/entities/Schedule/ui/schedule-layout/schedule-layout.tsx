import { Select, Text, VStack } from '@chakra-ui/react';
import styles from './schedule-layout.module.scss';
import { DateTime } from 'luxon';
export function ScheduleLayout() {
  const todayDate = DateTime.now().setLocale('ru').toFormat('d MMMM');
  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule__header']}>
        <VStack>
          <Text>{todayDate}</Text>
          <Text>Чётная неделя</Text>
        </VStack>
        <Select placeholder="Опции"></Select>
      </div>
      <div className={styles['schedule__navigation']}></div>
      <div className={styles['schedule__content']}></div>
    </div>
  );
}
