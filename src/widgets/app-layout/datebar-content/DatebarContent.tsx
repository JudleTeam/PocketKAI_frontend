import { useSchedule } from '@/entities';
import { Box, VStack } from '@chakra-ui/react';
import styles from './DatebarContent.module.scss';

function getDayOfWeek(date: string) {
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
}
function compareDay(date: string) {
  const day = new Date().toISOString().slice(0, 10);
  return day === date;
}
export function DatebarContent() {
  const { schedule } = useSchedule();
  const handleChangeDate = () => {};
  return (
    <>
      {schedule?.days.map((day, index) => {
        const dayOfWeek = getDayOfWeek(day.date);
        return (
          <Box w={'100%'} key={index}>
            {compareDay(day.date) ? (
              <VStack className={`${styles['date']} ${styles['current']}`}>
                <p>{day.date.slice(-2)}</p>
                <p>{dayOfWeek}</p>
              </VStack>
            ) : (
              <VStack
                onClick={handleChangeDate}
                className={`${styles['date']}`}
              >
                <p>{day.date.slice(-2)}</p>
                <p>{dayOfWeek}</p>
              </VStack>
            )}
          </Box>
        );
      })}
    </>
  );
}
