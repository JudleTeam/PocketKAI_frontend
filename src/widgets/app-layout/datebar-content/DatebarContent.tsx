import { useSchedule } from '@/entities';
import { Box } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './DatebarContent.module.scss';
import { MutableRefObject } from 'react';

function getDayOfWeek(date: string) {
  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
}
function isToday(date: string) {
  const day = new Date().toISOString().slice(0, 10);
  return day === date;
}

export function DatebarContent({
  currentDay,
  setCurrentDay,
  swiperRef,
}: {
  currentDay: string;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  swiperRef: MutableRefObject<any>;
}) {
  const { schedule } = useSchedule();
  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={7}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      slidesPerGroup={7}
      className={`${styles['date-wrapper']}`}
    >
      {schedule?.days.map((day) => {
        return (
          <SwiperSlide key={day.date}>
            <Box w={'100%'}>
              <a
                href={`#${day.date}`}
                className={`${styles['date']} ${
                  isToday(day.date) ? styles['current'] : ''
                } ${currentDay === day.date ? styles['today'] : ''}`}
                onClick={() => setCurrentDay(day.date)}
              >
                <p>{day.date.slice(-2)}</p>
                <p>{getDayOfWeek(day.date)}</p>
              </a>
            </Box>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
