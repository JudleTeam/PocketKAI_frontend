import { useSchedule } from '@/entities';
import { Box } from '@chakra-ui/react';
import styles from './DatebarContent.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
  return (
    <Swiper
      slidesPerView={7}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      className={`${styles['date-wrapper']}`}
    >
      {schedule?.days.map((day) => {
        const dayOfWeek = getDayOfWeek(day.date);
        return (
          <SwiperSlide className={`${styles['date-slide']}`} key={day.date}>
            <Box w={'100%'}>
              <a
                href={`#${day.date}`}
                className={`${styles['date']} ${
                  compareDay(day.date) ? styles['current'] : ''
                }`}
              >
                <p>{day.date.slice(-2)}</p>
                <p>{dayOfWeek}</p>
              </a>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
